import { Schema } from 'mongoose';

export const ImageSchema = new Schema({
    name: String,
    type: String,
    size: String,
    createdDate: Date,
    concept: String,
});
