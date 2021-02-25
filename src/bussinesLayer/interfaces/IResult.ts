import mongoose from "mongoose";

export default interface IEntity extends mongoose.Document {
	entity_id: string,
	allDiffs: any[],
	count: number,
	longitude: number,
	latitude: number,
}
