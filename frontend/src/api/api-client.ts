import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://api.clarifai.com/v2/users/havtse06109/apps/my-first-app/',
    headers: { 'Authorization': 'Key ef57dc2a886c4823bdfe2c1a0550b116' }
});

export const API_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
} as const;
