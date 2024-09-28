import mongoose from "mongoose";

export class MongoDatabase {
    static async connect({ mongoUrl, dbName }) {
        try {
            await mongoose.connect(mongoUrl, {
                dbName,
            });
            console.log("Connected to MongoDB");

        } catch (error) {
            console.error("Error connecting to MongoDB: ", error);
            throw error;
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
            console.log("Disconnected from MongoDB");
        } catch (error) {
            console.error("Error disconnecting from MongoDB", error);
            throw error;
        }
    }

}
