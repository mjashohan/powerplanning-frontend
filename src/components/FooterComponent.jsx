import React, {useEffect, useState} from "react";
import './PowerPlanner.css'
import {useAuth} from "./security/AuthContext";
import {deleteUserApi, getSpecificUser} from "./api/PlannerApiService";
import {useNavigate} from "react-router-dom";

export default function FooterComponent(props) {
    const [user, setUser] = useState([])

    const authContext = useAuth()

    const username = authContext.username

    const navigate = useNavigate()

    useEffect(() => getCurrentUser())
    function getCurrentUser() {
        getSpecificUser(username)
            .then(response => {
                setUser(response.data)
            })
            .catch(error => console.log(error))
    }

    function updateUser(id) {
        console.log('function is working '+id)
    }
    function deleteUser(id) {
        deleteUserApi(id)
            .then(
                () => {
                    alert("Your account is deleted")
                    navigate('/')
                }
            )
    }
    return(
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    <button className="nav-link" onClick={() => updateUser(user.userID)}>Edit Account</button>
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                <button className="nav-link text-danger" onClick={() => deleteUser(user.userID)}>Delete Account</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </footer>
    )
}