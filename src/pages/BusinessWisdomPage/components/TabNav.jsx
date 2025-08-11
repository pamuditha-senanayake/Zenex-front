// src/pages/BusinessWisdomPage/components/TabNav.jsx
import React from 'react';

const TabNav = ({ activeTab, onTabChange }) => {
    return (
        <div className="tab-nav">
            <button
                className={`tab-nav-button ${activeTab === 'businessSim' ? 'active' : ''}`}
                onClick={() => onTabChange('businessSim')}
            >
                Business Growth Simulator
            </button>
            <button
                className={`tab-nav-button ${activeTab === 'insights' ? 'active' : ''}`}
                onClick={() => onTabChange('insights')}
            >
                Business Wisdom & Insights
            </button>
        </div>
    );
};

export default TabNav;