import React, {createContext, useContext, useState} from "react";
import {executeLogin, executeSignup} from "../api/AuthenticationApiService";


export const AuthContext = createContext()

export const useAuth= () => useContext(AuthContext)

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState('')

    async function login(username, password) {
        console.log("Success")
        try {
            const response = await executeLogin(username, password);
            console.log(response.data); // handle success response

            if(response.status === 200) {
                setAuthenticated(true)
                setUsername(username)
                return true
            }
            else {
                logout()
                return false
            }
        } catch (error) {
            logout()
            return false
        }
    }
    function logout() {
        setAuthenticated(false)
        setUsername(null)
    }

    async function signup(username, email, password) {
        try{
            const response = await executeSignup(username, email, password)
            if(response.status === 200) {
                setAuthenticated(true)
                setUsername(username)
                return true
            } else {
                setAuthenticated(false)
                setUsername(null)
                return false
            }
        } catch (error) {
            setAuthenticated(false)
            setUsername(null)
            return false
        }
    }

    return (
        <AuthContext.Provider value={ { isAuthenticated, login, logout, username, signup } }>
            {children}
        </AuthContext.Provider>
    )
}