import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		// console.log("mongo_uri: ", process.env.MONGO_URL);
		const conn = await mongoose.connect(process.env.MONGO_URL);
		console.log("MongoDB Connected");
	} catch (error) {
		console.log("Error connection to MongoDB: ", error.message);
		process.exit(1); // 1 is failure, 0 status code is success
	}
};