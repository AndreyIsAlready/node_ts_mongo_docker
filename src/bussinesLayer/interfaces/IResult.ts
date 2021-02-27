import mongoose from "mongoose";

export default interface IEntity extends mongoose.Document {
	_id: string,
	allDiffs: any[],
	count: number,
	longitude: [],
	latitude: [],
}
