import mongoose from "mongoose";
import ICountryStudents from "../interfaces/ICountryStudents";

const countryStudents = new mongoose.Schema(
    {
        country: String,
        overallStudents: Number,
    },
    {timestamps: true},
);

export default mongoose.model<ICountryStudents>("country_students", countryStudents);
