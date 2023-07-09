import React, {useState} from "react";
import {useAuth} from "./security/AuthContext";
import {useNavigate} from "react-router-dom";
import HeaderComponent from "./HeaderComponent";
export default function Signup() {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()

    function handleUsernameChange(event) {
        setUsername(event.target.value)
    }

    function handleEmailChange(event) {
        setEmail(event.target.value)
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }

    async function handleSubmit() {
        if(await authContext.signup(username, email, password)) {
            alert("Thank you for registering!")
            navigate(`/welcome/${username}`)
        } else {
            alert("You are already registered! Just log in!")
            navigate(`/`)
        }
    }

    return(
        <div className="Signup">
            <HeaderComponent />
            <h1>Welcome! Signup to get started</h1>

            <div className="LoginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="Login" onClick={handleSubmit}>Signup</button>
                </div>
            </div>
        </div>
    )
}