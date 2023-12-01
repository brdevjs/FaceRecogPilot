import { Images } from "@/types/images.type"
import http from "@/utils/http"
import FormData from 'form-data'

export const getImages = (searchParam: string) => {
    console.log('searchParam getImages', searchParam)
    return http.get<Images>(`images?${searchParam}`)
}

export const uploadImages = (image: File) => {
    const data = new FormData();
    data.append('image', image);
    return http.post<Images>('images/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data;' }
    })
}