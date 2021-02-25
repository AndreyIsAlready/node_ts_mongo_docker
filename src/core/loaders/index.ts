import expressLoader from "./express";
import express from "express";
import Logger from "../logger";
import mongooseLoader from "./mongoose";
import WriteJsonInDb from "./writeJsonInDb";

const writeJsonInDb = new WriteJsonInDb();
export default async (expressApp: express.Application): Promise<void> => {
    try{
        await expressLoader({app: expressApp});
        await mongooseLoader(process.env.MONGODB_URI);
        await writeJsonInDb.writeJsonInDb();
    } catch (e) {
        Logger.error(e);
    }
};
