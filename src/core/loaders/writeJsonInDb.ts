// @ts-ignore
import entitiesJson from "../../../first.json";
// @ts-ignore
import countryStudentsJson from  "../../../second.json";
import CountryStudents from "../../bussinesLayer/models/CountryStudents";
import ICountryStudents from "../../bussinesLayer/interfaces/ICountryStudents";
import IEntity from "../../bussinesLayer/interfaces/IEntity";
import Entity from "../../bussinesLayer/models/Entity";
import Logger from "../logger";
import Result from "../../bussinesLayer/models/Result";
import {Model} from "mongoose";
import IResult from "../../bussinesLayer/interfaces/IResult";

export default class WriteJsonInDbService {

    async writeJsonInDb(): Promise<void> {
        try {
            await this.removeAndWriteInDb(Result, entitiesJson);
            await this.removeAndWriteInDb(CountryStudents, countryStudentsJson);
            await this.removeAndWriteInDb(Entity, entitiesJson);

            // @ts-ignore
            await Entity.aggregate([
                {
                    $lookup: {
                        from: "country_students",
                        localField: "country",
                        foreignField: "country",
                        as: "country_students"
                    }
                },
                {
                    $addFields: {
                        "longitude": {$first: "$location.ll"},
                        "latitude": {$last: "$location.ll"},
                        "allDiffs": {
                            $map: {
                                input: "$students",
                                as: "value",
                                in: {year: "$$value.year", number: {$subtract : [ "$$value.number", {$first: "$country_students.overallStudents"} ]} }
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: "$country",
                        allDiffs: {$push: "$allDiffs"},
                        longitude: {$push: "$longitude"},
                        latitude: {$push: "$latitude"},
                        count: {$sum: 1}
                    }
                },
                {
                    $merge: {into: "results"}
                }
            ]);
            await Result.deleteMany({allDiffs: []});
        } catch (e) {
            Logger.error(e);
        }
    };

    private async removeAndWriteInDb(
        document: Model<IEntity> | Model<ICountryStudents> | Model<IResult>,
        data: any,
    ): Promise<IEntity[] | ICountryStudents[] | IResult> {
        await document.deleteMany({});
        // @ts-ignore
        return await document.insertMany(data);
    }
}
