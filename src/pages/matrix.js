import React from 'react';
import NavBar from './NavBar';
import EisenhowerMatrix from './EisenhowerMatrix';


const DashboardPage = () => {
    return (
        <div style={{
            backgroundColor: '#000',
            minHeight: '100vh',
            color: '#FFD700',   // optional, for text color default
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <NavBar />
            <div style={{ width: '100%', flexGrow: 1, display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
                <EisenhowerMatrix />
            </div>
        </div>
    );
};

export default DashboardPage;
