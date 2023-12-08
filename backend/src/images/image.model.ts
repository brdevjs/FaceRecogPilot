/* eslint-disable prettier/prettier */
import { Schema, Document, Date } from 'mongoose';

export interface Image extends Document {
    name: string;
    size: string;
    type: string;
    createdDate: Date;
    url: string;
}

export const ImageSchema = new Schema({
    name: String,
    size: String,
    type: String,
    createdDate: Date,
    url: String
});
