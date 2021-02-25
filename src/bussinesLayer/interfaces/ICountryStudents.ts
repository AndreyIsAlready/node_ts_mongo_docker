import mongoose from "mongoose";

export default interface ICountryStudents extends mongoose.Document {
	country: string;
	overallStudents: number;
}
