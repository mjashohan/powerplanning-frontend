import {apiClient} from "./apiClient";

export const executeLogin =
    (username, password) => apiClient.post('/login', {username, password})

export const executeSignup =
    (username, email, password) => apiClient.post('/signup', {username, email, password})
