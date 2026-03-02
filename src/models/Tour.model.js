import mongoose, { Schema } from "mongoose";

const tourSchema = new Schema({
    id: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    title: { type: String, required: true },
    city: { type: String, required: true },
    venue: { type: String, required: true },
    startTime: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    description: { type: String, default: "" },
    quantity: { type: Number, default: 0 }, // -1 - canceled
}, { timestamps: true });

export const Tour = mongoose.model('Tour', tourSchema);