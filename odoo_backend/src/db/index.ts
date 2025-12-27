import mongoose from "mongoose";



async function connectDB() {
    try {
        const rp = await mongoose.connect(process.env.MONGO_URL as string);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
}

export { connectDB }