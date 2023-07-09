import {apiClient} from "./apiClient";

export const addNewProjectApi = (projectdetails) =>
    apiClient.post('/api/photovoltaic-systems', {projectdetails})
export const getAllProjectsApi = () =>
    apiClient.get(`/api/photovoltaic-systems`)
