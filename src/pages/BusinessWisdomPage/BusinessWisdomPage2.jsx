// src/pages/BusinessWisdomPage/BusinessWisdomPage.jsx
import React, { useState } from 'react';
import TabNav from './components/TabNav';
import BusinessSimulationTab from './components/BusinessSimulationTab';
import BusinessInsightsTab from './components/BusinessInsightsTab';
import NavBar from '../NavBar'; // Adjust path based on your NavBar location
import './BusinessWisdomPage2.css'; // Import the dedicated CSS

function BusinessWisdomPage() {
    const [activeTab, setActiveTab] = useState('businessSim'); // Default to business simulation

    const renderContent = () => {
        switch (activeTab) {
            case 'businessSim':
                return <BusinessSimulationTab />;
            case 'insights':
                return <BusinessInsightsTab />;
            default:
                return <BusinessSimulationTab />;
        }
    };

    return (
        <> {/* Use a fragment if NavBar is outside the main page container */}
            <NavBar /> {/* Ensure your NavBar component aligns with the black/white/yellow theme */}

            <div className="business-wisdom-page-container">
                <header className="bw-header">
                    <h1>Business Growth & Wisdom Lab</h1>
                    <p>
                        A deep dive into the financial and strategic levers that drive real-world business success.
                    </p>
                </header>

                <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

                <main className="bw-main-content">
                    {renderContent()}
                </main>

                <footer className="bw-footer">
                    <p>Built to empower business understanding. Data is illustrative and simplified.</p>
                </footer>
            </div>
        </>
    );
}

export default BusinessWisdomPage;