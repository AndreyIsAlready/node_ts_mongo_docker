import {Router, Request, Response} from "express";
import Result from "../../bussinesLayer/models/Result";
import Logger from "../../core/logger";

const route = Router();

export default (app: Router): void => {
	app.use("/api", route);

	route.get("/result", async (req: Request, res: Response): Promise<void> => {
		try {
			const results = await Result.find({});
			res.status(200).send(results);
		} catch (e) {
			Logger.error(e);
			res.status(500).json(e.message)
		}
	});
};