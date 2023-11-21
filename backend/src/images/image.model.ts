import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export type ImageDocument = Image & Document;

@Schema()
@ApiTags('images')
export class Image {
    @Prop()
    @ApiProperty()
    name: string;

    @Prop()
    @ApiProperty()
    size: string;

    @Prop()
    @ApiProperty()
    type: string;

    @Prop({ default: Date.now() })
    @ApiProperty()
    createdDate: Date;

    @Prop()
    @ApiProperty()
    concept: string;

    @Prop()
    @ApiProperty()
    url: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
