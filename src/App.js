import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/home';
import Prompts from './pages/Prompts';
import Matrix from './pages/matrix';
import NavBar from './pages/NavBar';
import MQ from './pages/PhotoMarquee';
import NavBarEisenhowerMatrix from './pages/EisenhowerMatrix';
import Human6 from './pages/human_six/human6';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/prompts" element={<Prompts />} />
                <Route path="/Matrix" element={<Matrix />} />
                <Route path="/EisenhowerMatrix" element={<NavBarEisenhowerMatrix />} />
                <Route path="/NavBar" element={<NavBar />} />
                <Route path="/MQ" element={<MQ />} />
                <Route path="/Human6" element={<Human6 />} />
            </Routes>
        </Router>
    );
}

export default App;
