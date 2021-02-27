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
            const countryStudentsDocuments = await this.removeAndWriteInDb(CountryStudents, countryStudentsJson);
            const entityDocuments = await this.removeAndWriteInDb(Entity, entitiesJson);

            // @ts-ignore
            const result = await Entity.aggregate()
                .lookup({from: "country_students", localField: "country", foreignField: "country", as: "country_students"})
                .addFields(
                    {
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
                )
                .project(
                    {
                            entity_id: "$country",
                            allDiffs: "$allDiffs",
                            longitude: "$longitude",
                            latitude: "$latitude"
                    }
                );
            await Result.insertMany(result);
            await Result.deleteMany({allDiffs: []});
            // this.setLongitudeAndLatitude(entityDocuments as IEntity[]);
            // this.setAllDiffs(countryStudentsDocuments as ICountryStudents[]);
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

    private async setLongitudeAndLatitude(entityDocuments: IEntity[]) {
        entityDocuments.forEach((entityDocument: any) => {
            entityDocument.longitude = entityDocument.location.ll[0];
            entityDocument.latitude = entityDocument.location.ll[1];
            entityDocument.save();
        });
    }

    private async setAllDiffs(countryStudentsDocuments: ICountryStudents[]) {
        for (let countryStudentDocument of countryStudentsDocuments) {
            const entities = await Entity.find({country: countryStudentDocument.country});
            this.diffStudents(entities, countryStudentDocument);
        }
    }

    private async diffStudents(entities: IEntity[], countryStudentDocument: ICountryStudents) {
        for (let entity of entities) {
            const result = new Result();
            const allDiffs: any[] = [];
            result.entity_id = countryStudentDocument.country;

            entity.students.forEach(students => {
                allDiffs.push({year: students.year, number: students.number - countryStudentDocument.overallStudents});
            });
            entity.allDiffs = allDiffs;
            result.allDiffs = allDiffs;
            result.count = await Entity.count({country: countryStudentDocument.country});
            result.latitude = entity.latitude;
            result.longitude = entity.longitude;

            result.save();
            entity.save();
        }
    }
}
