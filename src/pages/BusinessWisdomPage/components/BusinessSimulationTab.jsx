// src/pages/BusinessWisdomPage/components/BusinessSimulationTab.jsx
import React, { useState, useEffect, useMemo } from 'react';
import BusinessParams from './BusinessParams';
import BusinessSummary from './BusinessSummary';
import BusinessCharts from './BusinessCharts';
import { runBusinessSimulation } from '../utils/businessSimulationEngine';

const BusinessSimulationTab = () => {
    const [params, setParams] = useState({
        initialInvestment: 5000,
        initialCustomers: 10,
        monthlyCustomerGrowthRate: 0.05, // 5% organic growth
        pricePerCustomer: 50,
        cogsPerCustomer: 10,
        initialFixedCosts: 1000,
        fixedCostGrowthPerYear: 0.03, // 3% increase in fixed costs annually
        marketingSpendPerMonth: 500,
        marketingCustomerBoost: 5, // 5 extra customers per $1k marketing
        reinvestmentRate: 0.9, // 90% of profit reinvested
        years: 5
    });

    const [simulationResult, setSimulationResult] = useState({
        history: [],
        kpis: {
            finalCash: '0.00',
            totalRevenue: '0.00',
            totalProfit: '0.00',
            maxCashDrawdown: '0.00',
            businessFailed: false
        }
    });

    const memoizedSimulation = useMemo(() => {
        return runBusinessSimulation(params);
    }, [params]);

    useEffect(() => {
        setSimulationResult(memoizedSimulation);
    }, [memoizedSimulation]);

    return (
        <>
            <section className="bw-section">
                <h2>Tuning Business Variables</h2>
                <BusinessParams params={params} setParams={setParams} />
            </section>

            <section className="bw-section">
                <h2>Business Performance Indicators</h2>
                <BusinessSummary kpis={simulationResult.kpis} />
            </section>

            <section className="bw-section">
                <h2>Business Performance Visualization</h2>
                <BusinessCharts data={simulationResult.history} kpis={simulationResult.kpis} />
            </section>
        </>
    );
};

export default BusinessSimulationTab;