import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import DashboardComponent from "./DashboardComponent";
import './PowerPlanner.css'
import AuthProvider, {useAuth} from "./security/AuthContext";
import AccountSettings from "./AccountSettings";
import ProjectCreator from "./ProjectCreator";
import Mapper from "./Mapper";


function AuthenticatedRoute( {children} ) {
    const authContext = useAuth()

    if(authContext.isAuthenticated)
        return children
    return <Navigate to="/" />
}

export default function PowerPlanner() {
    return(
        <div className="PowerPlanner">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/signup' element={ <Signup /> } />
                        <Route path='/' element={ <Login /> } />
                        <Route path='/login' element={ <Login /> } />
                        {/*<Route path='/welcome/:username' element={ <DashboardComponent /> } />*/}
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <DashboardComponent />
                            </AuthenticatedRoute>
                            } />
                        <Route path='/accountsettings/:username' element={
                            <AuthenticatedRoute>
                                <AccountSettings />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/:username/newproject' element={
                            <AuthenticatedRoute>
                                <ProjectCreator />
                            </AuthenticatedRoute>
                        } />
                        <Route path='/welcome/:username' element={ <DashboardComponent /> } />
                        <Route path='/accountsettings/:username' element={ <AccountSettings /> } />
                        <Route path='/:username/newproject' element={ <ProjectCreator /> } />
                        <Route path='/maps' element={ <Mapper /> } />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}