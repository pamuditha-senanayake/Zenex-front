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
import Sen from './pages/test/SentimentAnalyzer';
import CryptoSentiment from './pages/test/CryptoSentiment';
import MomentsSolutions from './pages/human_six/MomentsSolutions';
import ProblemLogPage from './pages/human_six/ProblemLogPage';
import BusinessWisdomPage from './pages/BusinessWisdomPage/BusinessWisdomPage';
import BusinessWisdomPage2 from './pages/BusinessWisdomPage/BusinessWisdomPage2';


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
                <Route path="/Sen" element={<Sen />} />
                <Route path="/crypto-sentiment" element={<CryptoSentiment />} />
                <Route path="/MomentsSolutions" element={<MomentsSolutions />} />
                <Route path="/log-problem/:momentId" element={<ProblemLogPage />} />
                <Route path="/log-problem" element={<ProblemLogPage />} />
                <Route path="/business-wisdom" element={<BusinessWisdomPage />} />
                <Route path="/business-wisdom2" element={<BusinessWisdomPage2 />} />
            </Routes>
        </Router>
    );
}

export default App;
