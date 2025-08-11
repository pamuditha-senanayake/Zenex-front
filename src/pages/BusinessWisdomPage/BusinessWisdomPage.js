// src/pages/BusinessWisdomPage/BusinessWisdomPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import ParameterControls from './components/ParameterControls';
import DashboardCharts from './components/DashboardCharts';
import SummaryMetrics from './components/SummaryMetrics';
import { runSimulation } from './utils/simulationEngine';
import NavBar from '../NavBar'; // Adjust path based on your NavBar location
import './BusinessWisdomPage.css'; // <--- NEW IMPORT

function BusinessWisdomPage() {
    // Default parameters (no change needed here)
    const [params, setParams] = useState({
        initialCapital: 300,
        winRate: 0.55,
        riskPerTrade: 0.02,
        tradesPerMonth: 20,
        profitMultiplier: 1.5,
        lossMultiplier: 1.0,
        initialFixedMonthlyCosts: 50,
        fixedCostGrowthPerYear: 0.05,
        reinvestmentRate: 0.8,
        years: 5
    });

    const [simulationResult, setSimulationResult] = useState({
        history: [],
        kpis: {
            finalCapital: '0.00',
            totalProfit: '0.00',
            annualGrowthRate: 'N/A',
            maxDrawdown: '0.00',
            failed: false
        }
    });

    const memoizedSimulation = useMemo(() => {
        return runSimulation(params);
    }, [params]);

    useEffect(() => {
        setSimulationResult(memoizedSimulation);
    }, [memoizedSimulation]);

    return (
        <> {/* Use a fragment if NavBar is outside the main page container */}
            <NavBar /> {/* Ensure NavBar fits your new dark theme */}

            {/* Apply the main page container class */}
            <div className="business-wisdom-page-container">
                <header className="bw-header">
                    <h1>Business Growth Simulator</h1>
                    <p>
                        Visualize how disciplined strategies, risk control, and reinvestment affect your business over years.
                    </p>
                </header>

                <section className="bw-section">
                    <h2>Tuning Parameters</h2>
                    <ParameterControls params={params} setParams={setParams} />
                </section>

                <section className="bw-section">
                    <h2>Key Performance Indicators</h2>
                    <SummaryMetrics kpis={simulationResult.kpis} />
                </section>

                <section className="bw-section">
                    <h2>Visualization Over Time</h2>
                    <DashboardCharts data={simulationResult.history} kpis={simulationResult.kpis} />
                </section>

                <footer className="bw-footer">
                    <p>Built for visualizing business growth principles as described in the prompt.</p>
                    <p>Simulation is probabilistic and simplified for demonstration.</p>
                </footer>
            </div>
        </>
    );
}

export default BusinessWisdomPage;