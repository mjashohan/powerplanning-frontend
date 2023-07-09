import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import {useAuth} from "./security/AuthContext";
import {addNewProjectApi, getAllProjectsApi} from "./api/ProjectApiService";
import Mapper from "./Mapper";

export default function DashboardComponent() {
    const [isCollapsed, setIsCollapsed] = useState(true)
    const {username} = useParams()
    const [projectname, setProjectName] = useState('')
    const [projects, setProjects] = useState([])
    const [user] = useState(username)
    const [latitude, setLatitude] = useState(0.0)
    const [longitude, setLongitude] = useState(0.0)
    const authContext = useAuth()
    const navigation = useNavigate()
    const planner = authContext.username
    useEffect(() => refreshProjects(), [])
    function refreshProjects() {
        getAllProjectsApi()
            .then(response => {
                setProjects(response.data)
                setLatitude(response.data.location.latitude)
                setLongitude(response.data.locations.longitude)
            })
            .catch(error => console.log(error))
    }

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    // function handleProjectName(event) {
    //     const projectName = event.target.value
    //     setProjectName(projectName)
    //     console.log(projectName)
    // }
    async function handleSubmit() {
            navigation(`/${username}/newproject`)
    }

    const handleEditReport = () => {
        console.log('Editing report...');
    };

    const handleEmail = () => {
        console.log('Editing report...');
    };
    return(
        <div className="DashboardComponent">
            <HeaderComponent data={user} />
            <h1>Welcome { username }</h1>

            <div className="LoginForm">

                <div>
                    <button type="submit" className="btn btn-info text-white m-5" onClick={handleSubmit}>
                        Click here to add a project</button>
                </div>
            </div>
            <div className="availableProjects">
                <div>
                    <button onClick={toggleCollapse}>{isCollapsed ? 'Expand' : 'Collapse'}</button>
                    {!isCollapsed && (
                        <table>
                            <thead>
                            <tr>
                                <th>Power Peak</th>
                                <th>Orientation</th>
                                <th>Tilt</th>
                                <th>Area</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                projects.map(
                                    project => (
                                        <tr key={project.id}>
                                            <td>{project.peakValue}</td>
                                            <td>{project.orientation}</td>
                                            <td>{project.tilt}</td>
                                            <td>{project.area}</td>
                                            <td>{project.location.latitude}</td>
                                            <td>{project.location.longitude}</td>
                                        </tr>
                                    )
                                )
                            }
                            </tbody>
                            <div> <button onClick={handleEditReport}>Edit Report</button> </div>
                        </table>
                    )}
                </div>
                <div> <button onClick={handleEmail}>Send Email</button> </div>
                <Mapper latitude={latitude} longitude={longitude} />
            </div>
            <FooterComponent />
        </div>
    )
}