import React from "react";
import {Link} from "react-router-dom";
import {useAuth} from "./security/AuthContext";

export default function HeaderComponent(props) {
    //const [username] = useParams()
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated

    function logout() {
        authContext.logout()
        authContext.setAuthenticated(false)
    }

    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="navbar-brand ms-2 fs-2 fw-bold text-black">Power Planner</div>
                        <div className="collapse navbar-collapse">
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                { isAuthenticated && <Link className="nav-link" to="#">{props.data}</Link>
                                }
                            </li>
                            <li className="nav-item fs-5">
                                { !isAuthenticated && <Link className="nav-link" to="/login">Login</Link> }
                            </li>
                            <li className="nav-item fs-5">
                                { isAuthenticated && <Link className="nav-link" to="/" onClick={ logout }>Logout</Link> }
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}