import mongoose from "mongoose";
import { Db } from "mongodb";

export default async (mongodbUri: string): Promise<Db> => {
    try{
        const connection = await mongoose.connect(mongodbUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        return connection.connection.db;
    } catch (e) {
        console.error(e);
    }
};
