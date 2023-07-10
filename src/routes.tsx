import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"
import Manager from "./pages/Manager";
import Pay from "./pages/Pay";
import Perfil from "./pages/Perfil";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";


const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/pay' element={<Pay />} />
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/manager' element={<Manager />} />
        </Routes>
    )
}

export default MainRoutes;