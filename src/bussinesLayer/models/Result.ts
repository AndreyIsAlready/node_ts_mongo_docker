import mongoose from "mongoose";
import IResult from "../interfaces/IResult";

const results = new mongoose.Schema(
    {
        _id: String,
        allDiffs: Array,
        count: Number,
        longitude: Array,
        latitude: Array,
    },
);

export default mongoose.model<IResult>("results", results);
