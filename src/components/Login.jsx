import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "./security/AuthContext";
import HeaderComponent from "./HeaderComponent";



export default function Login() {
     const [username, setUsername] = useState('')
     const [password, setPassword] = useState('')
     const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()

    const authContext = useAuth()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    async function handleSubmit() {
         if(await authContext.login(username, password)) {
             console.log("success")
             navigate(`/welcome/${username}`)
        } else {
            setShowErrorMessage(true)
        }
    }


    return(
        <div className="Login">
            <HeaderComponent />
            <h1>Login to continue planning!</h1>
            {showErrorMessage && <div className="errorMessage">Authenticated Failed. Please check your credentials</div>}

            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="Login" onClick={handleSubmit}>Login</button>
                </div>
                <div>New user? <Link to="/signup">Sign up!</Link></div>
            </div>
        </div>
    )
}