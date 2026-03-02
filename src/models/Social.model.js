import mongoose, { Schema } from "mongoose";

const socialSchema = new Schema(
    {
        title: String,
        URL: String,
        description: String,
        creat_at: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    }
)

export const Social = mongoose.model('Social', socialSchema)