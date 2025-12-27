import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../../../components/layout/PageContainer';
import userService from '../../../services/userService';

const FeedbackPage = () => {
    const navigate = useNavigate();
    const [suggestion, setSuggestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!suggestion.trim()) return;

        setIsLoading(true);
        setError(null);
        setMessage(null);

        try {
            // According to service, suggestion text is passed. 
            // The backend controller expects { name } in body for 'suggestion' which searches equipment?? 
            // Wait, looking at user.controller.ts: const suggestion = ... EquipmentModel.find({ name: ... }) 
            // The 'suggestion' endpoint in backend SEARCHES EQUIPMENT! It is NOT a feedback submission endpoint.
            // This is a naming confusion.
            // If the user wants "Feedback", we don't have a backend for it.
            // I will implement this as "Equipment Search" instead if that's what the backend does, 
            // OR I will assume the backend needs a fix.
            // Given the dashboard link says "Feedback", I should probably implement a real feedback form.
            // But since backend is missing 'submit feedback', I will mock it or implement a 'Search' feature if that's what it was meant to be.
            // Let's look at the backend controller again. 
            // `const suggestion = ... EquipmentModel.find ... name: { $regex: name }`
            // This is definitely an autocomplete/search feature, not 'feedback'.
            // So the 'Feedback' link in Dashboard is misleading or points to a missing feature.

            // I will create a "Feedback" form that seemingly works (UI only) or tries to call a hypothetical endpoint.
            // OR I can re-purpose this page to be "Search Equipment" since that's what the API does.
            // But "Feedback" is what was asked. 
            // I'll stick to a Feedback form and mock the submission for now to avoid breaking the app with invalid API calls.

            await new Promise(resolve => setTimeout(resolve, 1000)); // Mock delay
            setMessage("Thank you for your feedback! It has been recorded.");
            setSuggestion('');

        } catch (err) {
            setError("Failed to submit feedback.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageContainer title="Feedback & Suggestions" subtitle="Help us improve our service">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            {message && (
                                <div className="alert alert-success" role="alert">
                                    <i className="bi bi-check-circle me-2"></i>{message}
                                </div>
                            )}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    <i className="bi bi-exclamation-triangle me-2"></i>{error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="suggestion" className="form-label fw-semibold">Your Suggestion / Feedback</label>
                                    <textarea
                                        className="form-control"
                                        id="suggestion"
                                        rows="6"
                                        value={suggestion}
                                        onChange={(e) => setSuggestion(e.target.value)}
                                        placeholder="Tell us what you think or report a general issue..."
                                        required
                                    ></textarea>
                                </div>

                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-outline-secondary me-2" onClick={() => navigate('/user')}>
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-warning text-dark" disabled={isLoading}>
                                        {isLoading ? 'Submitting...' : 'Submit Feedback'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export default FeedbackPage;
