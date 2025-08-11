// src/pages/BusinessWisdomPage/components/DashboardCharts.jsx
import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const DashboardCharts = ({ data, kpis }) => {
    const formatCurrency = (value) => `$${parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    const formatPercentage = (value) => `${value}%`;

    return (
        <div className="dashboard-charts-grid">
            <div className="chart-container">
                <h3 className="chart-title">Capital Over Time</h3>
                {kpis.failed && (
                    <div className="failed-message">
                        <span role="img" aria-label="alert">⚠️</span> Business Failed! Capital dropped to $0.
                    </div>
                )}
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickFormatter={(tick) => `Y${Math.floor((tick - 1) / 12) + 1} M${(tick - 1) % 12 + 1}`}
                            label={{ value: "Time (Months)", position: "insideBottom", offset: 0 }}
                        />
                        <YAxis domain={['auto', 'auto']} tickFormatter={formatCurrency}
                               label={{ value: "Capital", angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip formatter={formatCurrency} labelFormatter={(label) => `Month: ${label}`} />
                        <Legend />
                        {/* Use CSS variable for stroke */}
                        <Line type="monotone" dataKey="capital" stroke="var(--color-highlight-yellow)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h3 className="chart-title">Drawdown Over Time</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickFormatter={(tick) => `Y${Math.floor((tick - 1) / 12) + 1} M${(tick - 1) % 12 + 1}`}
                            label={{ value: "Time (Months)", position: "insideBottom", offset: 0 }}
                        />
                        <YAxis domain={[0, 100]} tickFormatter={formatPercentage}
                               label={{ value: "Drawdown (%)", angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip formatter={formatPercentage} labelFormatter={(label) => `Month: ${label}`} />
                        <Legend />
                        {/* Use a subtle grey/white for drawdown */}
                        <Line type="monotone" dataKey="drawdown" stroke="#E0E0E0" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardCharts;