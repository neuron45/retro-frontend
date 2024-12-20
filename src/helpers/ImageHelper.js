import { API_IMAGES_BASE_URL, FRONTEND_DOMAIN } from "../config/config";

export function getImageURL(path) {
    if (FRONTEND_DOMAIN.includes('localhost')) {
        return API_IMAGES_BASE_URL + path;
    }
    return path;
}