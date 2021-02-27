import mongoose from "mongoose";
import IResult from "../interfaces/IResult";

const results = new mongoose.Schema(
    {
        entity_id: String,
        allDiffs: Array,
        count: Number,
        longitude: Number,
        latitude: Number,
    },
);

export default mongoose.model<IResult>("results", results);
