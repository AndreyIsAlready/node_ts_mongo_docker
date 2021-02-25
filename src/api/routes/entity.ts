import {Router, Request, Response} from "express";
import Entity from "../../bussinesLayer/models/Entity";
import Logger from "../../core/logger";

const route = Router();

export default (app: Router): void => {
	app.use("/api", route);

	route.get("/entity", async (req: Request, res: Response): Promise<void> => {
		try {
			const entity = await Entity.find({});
			res.status(200).json(entity);
		} catch (e) {
			Logger.error(e);
			res.status(500).json(e.message)
		}
	});
};