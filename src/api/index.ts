import {Router} from "express";
import fs from "fs/promises";

export default async (): Promise<Router> => {
    const app = Router();
    const fileNames = await fs.readdir(`${__dirname}/routes/`);
    fileNames
        .filter((filename: string) => filename.endsWith("ts") || filename.endsWith("js"))
        .forEach((filename: string) => {
            const controller = require(`./routes/${filename}`).default;
            controller(app);
        });

    return app;
};
