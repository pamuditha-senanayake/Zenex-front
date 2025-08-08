import React from 'react';
import NavBar from './NavBar';
import EisenhowerMatrix from './EisenhowerMatrix';
import './matrix.css';


const DashboardPage = () => {
    return (
        <div className="mainbox">
            <NavBar />
                <EisenhowerMatrix />
        </div>
    );
};

export default DashboardPage;
