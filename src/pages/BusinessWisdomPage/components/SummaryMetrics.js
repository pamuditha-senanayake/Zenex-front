// src/pages/BusinessWisdomPage/components/SummaryMetrics.jsx
import React from 'react';

const SummaryMetrics = ({ kpis }) => {
    return (
        <div className="summary-metrics-grid">
            <div className="kpi-card">
                <div className="kpi-label">Final Capital</div>
                <div className={`kpi-value ${kpis.failed ? 'negative' : 'highlight'}`}>
                    ${parseFloat(kpis.finalCapital).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
            </div>
            <div className="kpi-card">
                <div className="kpi-label">Total Profit/Loss</div>
                <div className={`kpi-value ${kpis.totalProfit >= 0 ? 'positive' : 'negative'}`}>
                    ${parseFloat(kpis.totalProfit).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
            </div>
            <div className="kpi-card">
                <div className="kpi-label">Annual Growth Rate (CAGR)</div>
                <div className="kpi-value">
                    {kpis.annualGrowthRate !== 'N/A' ? `${kpis.annualGrowthRate}%` : 'N/A'}
                </div>
            </div>
            <div className="kpi-card">
                <div className="kpi-label">Max Drawdown</div>
                <div className="kpi-value">
                    {kpis.maxDrawdown}%
                </div>
            </div>
        </div>
    );
};

export default SummaryMetrics;