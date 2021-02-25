import {Router, Request, Response} from "express";
import CountryStudents from "../../bussinesLayer/models/CountryStudents";
import Logger from "../../core/logger";

const route = Router();

export default (app: Router): void => {
	app.use("/api", route);

	route.get("/country-students", async (req: Request, res: Response): Promise<void> => {
		try {
			const countryStudents = await CountryStudents.find({});
			res.status(200).json(countryStudents);
		} catch (e) {
			Logger.error(e);
			res.status(500).json(e.message)
		}
	});
};