import mongoose from "mongoose";

export default interface IEntity extends mongoose.Document {
	country: string;
	city: string;
	name: string;
	longitude: number;
	allDiffs: any[];
	latitude: number;
	location: any[];
	students: any[];
}
