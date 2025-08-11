// src/pages/BusinessWisdomPage/components/BusinessSummary.jsx
import React from 'react';

const BusinessSummary = ({ kpis }) => {
    const formatCurrency = (value) => `$${parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

    return (
        <div className="kpi-grid">
            <div className="kpi-card">
                <div className="kpi-label">Final Cash Balance</div>
                <div className={`kpi-value ${kpis.businessFailed ? 'negative' : 'highlight'}`}>
                    {formatCurrency(kpis.finalCash)}
                </div>
            </div>
            <div className="kpi-card">
                <div className="kpi-label">Total Revenue Generated</div>
                <div className="kpi-value highlight">
                    {formatCurrency(kpis.totalRevenue)}
                </div>
            </div>
            <div className="kpi-card">
                <div className="kpi-label">Total Operating Profit</div>
                <div className={`kpi-value ${kpis.totalProfit >= 0 ? 'positive' : 'negative'}`}>
                    {formatCurrency(kpis.totalProfit)}
                </div>
            </div>
            <div className="kpi-card">
                <div className="kpi-label">Max Cash Drawdown</div>
                <div className="kpi-value">
                    {kpis.maxCashDrawdown}%
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;