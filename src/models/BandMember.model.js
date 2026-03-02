import mongoose, { Schema } from "mongoose";

const bandMemberSchema = new Schema(
    {
        id: { 
            type: String, 
            required: true, 
            unique: true
        },
        name: { 
            type: String, 
            required: true
        },
        position: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: true 
        },
        imagePattern: String,
        imageURL: { 
            type: String, 
            required: true 
        },
        created_at: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    }
);

export const BandMember = mongoose.model('BandMember', bandMemberSchema);