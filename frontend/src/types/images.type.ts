export interface Image {
    "image": File;
}

export type Images = Pick<Image, "image">[]