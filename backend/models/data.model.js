import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    website: {
        type: String,
        required: true,
        trim: true,  // Removes any leading or trailing whitespace
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Data = mongoose.model('Data', dataSchema);
export default Data;
