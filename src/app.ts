import express from "express";
import loaders from "./core/loaders";
import Logger from "./core/logger";

async function startServer(): Promise<void> {
    const app = express();
    try {
        await loaders(app);
    } catch (e) {
        Logger.error(e);
    }

    app.listen(process.env.PORT, () => {
        Logger.info(`Server start on port: ${process.env.PORT}`,);
    });
}

startServer();
