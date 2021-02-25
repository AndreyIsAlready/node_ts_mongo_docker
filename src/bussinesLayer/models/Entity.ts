import mongoose from "mongoose";
import IEntity from "../interfaces/IEntity";

const entity = new mongoose.Schema(
    {
        country: String,
        city: String,
        name: String,
        longitude: Number,
        allDiffs: Array,
        latitude: Number,
        location: Object,
        students: Array
    },
    {timestamps: true},
);

export default mongoose.model<IEntity>("entity", entity);
