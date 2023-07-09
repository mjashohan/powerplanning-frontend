import {apiClient} from "./apiClient";

export const getSpecificUser = (username) =>
    apiClient.get(`/planner/${username}`)

export const deleteUserApi = (id) =>
    apiClient.delete(`/planner/${id}`)