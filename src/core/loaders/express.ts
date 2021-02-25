import express from "express";
import bodyParser from "body-parser";
import routers from "../../api";
import cors from "cors";

export default async ({app}: {app: express.Application}): Promise<express.Application> => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors());

    app.use("/", await routers());

    return app;
};
