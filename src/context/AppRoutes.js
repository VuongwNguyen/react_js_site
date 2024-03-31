import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Drawer from '../app/ui/Drawer';
import LoginForm from '../app/ui/LoginForm';
function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/Home" element={<Drawer />} />

            </Routes>
        </Router>
    )
}

export default AppRoutes
