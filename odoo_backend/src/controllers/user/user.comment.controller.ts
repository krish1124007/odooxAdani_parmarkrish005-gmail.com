import type { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { returnResponse } from "../../utils/returnResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { CommentModel } from "../../models/comment.models.js";
import { MaintenanceRequestModel } from "../../models/request.models.js";

// Add a comment to a request
const addComment = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user || typeof req.user === 'string') {
        throw new ApiError(401, "Unauthorized - Invalid user data");
    }

    const { requestId } = req.params;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
        throw new ApiError(400, "Comment content is required");
    }

    if (!requestId) {
        throw new ApiError(400, "Request ID is required");
    }

    // Verify the request exists
    const request = await MaintenanceRequestModel.findById(requestId);
    if (!request) {
        throw new ApiError(404, "Maintenance request not found");
    }

    // Verify the user is the one who requested it
    if (request.requestedBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only comment on your own requests");
    }

    // Create the comment
    const comment = await CommentModel.create({
        request: requestId,
        author: req.user._id,
        authorModel: "User" as const,
        content: content.trim(),
    });

    // Populate author details
    const populatedComment = await CommentModel.findById(comment._id)
        .populate("author", "name email");

    return returnResponse(res, 201, "Comment added successfully", populatedComment);
});

// Get all comments for a request
const getRequestComments = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user || typeof req.user === 'string') {
        throw new ApiError(401, "Unauthorized - Invalid user data");
    }

    const { requestId } = req.params;

    if (!requestId) {
        throw new ApiError(400, "Request ID is required");
    }

    // Verify the request exists
    const request = await MaintenanceRequestModel.findById(requestId);
    if (!request) {
        throw new ApiError(404, "Maintenance request not found");
    }

    // Verify the user is the one who requested it
    if (request.requestedBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only view comments on your own requests");
    }

    // Get all comments for this request, sorted by creation time (oldest first)
    const comments = await CommentModel.find({ request: requestId })
        .populate("author", "name email")
        .sort({ createdAt: 1 });

    return returnResponse(res, 200, "Comments retrieved successfully", {
        count: comments.length,
        comments,
    });
});

// Update a comment (user can only edit their own comments)
const updateComment = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user || typeof req.user === 'string') {
        throw new ApiError(401, "Unauthorized - Invalid user data");
    }

    const { commentId } = req.params;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
        throw new ApiError(400, "Comment content is required");
    }

    // Find the comment
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Verify the user is the author
    if (comment.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only edit your own comments");
    }

    // Update the comment
    comment.content = content.trim();
    comment.isEdited = true;
    comment.editedAt = new Date();
    await comment.save();

    // Populate author details
    const populatedComment = await CommentModel.findById(comment._id)
        .populate("author", "name email");

    return returnResponse(res, 200, "Comment updated successfully", populatedComment);
});

// Delete a comment (user can only delete their own comments)
const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user || typeof req.user === 'string') {
        throw new ApiError(401, "Unauthorized - Invalid user data");
    }

    const { commentId } = req.params;

    // Find the comment
    const comment = await CommentModel.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Verify the user is the author
    if (comment.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You can only delete your own comments");
    }

    // Delete the comment
    await CommentModel.findByIdAndDelete(commentId);

    return returnResponse(res, 200, "Comment deleted successfully", null);
});

export { addComment, getRequestComments, updateComment, deleteComment };
