import { Schema, Document, Date } from 'mongoose';

export interface Image extends Document {
    name: string;
    size: string;
    type: string;
    createdDate: Date;
    concept: string;
}

export const ImageSchema = new Schema({
    name: String,
    size: String,
    type: String,
    createdDate: Date,
    concept: String,
});
