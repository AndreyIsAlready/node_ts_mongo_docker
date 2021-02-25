import {Router, Request, Response} from "express";

const route = Router();

export default (app: Router): void => {
    app.use("/api", route);

    route.get("/health-check", async (req: Request, res: Response): Promise<void> => {
        res.status(200).send({
            node: true,
        });
    });
};
