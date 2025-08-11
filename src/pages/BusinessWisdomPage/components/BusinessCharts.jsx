// src/pages/BusinessWisdomPage/components/BusinessCharts.jsx
import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const BusinessCharts = ({ data, kpis }) => {
    const formatCurrency = (value) => `$${parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    const formatPercentage = (value) => `${value}%`;

    return (
        <div className="chart-panel-grid">
            <div className="chart-container">
                <h3 className="chart-title">Cash Balance Over Time</h3>
                {kpis.businessFailed && (
                    <div className="failed-message">
                        <span role="img" aria-label="alert">⚠️</span> Business Ran Out of Cash!
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
                               label={{ value: "Cash ($)", angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip formatter={formatCurrency} labelFormatter={(label) => `Month: ${label}`} />
                        <Legend />
                        <Line type="monotone" dataKey="cash" stroke="var(--color-highlight-yellow)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h3 className="chart-title">Revenue & Profit Over Time</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickFormatter={(tick) => `Y${Math.floor((tick - 1) / 12) + 1} M${(tick - 1) % 12 + 1}`}
                            label={{ value: "Time (Months)", position: "insideBottom", offset: 0 }}
                        />
                        <YAxis domain={['auto', 'auto']} tickFormatter={formatCurrency}
                               label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip formatter={formatCurrency} labelFormatter={(label) => `Month: ${label}`} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="var(--color-success-green)" strokeWidth={2} dot={false} name="Revenue" />
                        <Line type="monotone" dataKey="profit" stroke="#8884d8" strokeWidth={2} dot={false} name="Profit" /> {/* Using a neutral purple for profit */}
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="chart-container">
                <h3 className="chart-title">Cash Drawdown Over Time</h3>
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
                        <Line type="monotone" dataKey="cashDrawdown" stroke="#E0E0E0" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="chart-container">
                <h3 className="chart-title">Customers Over Time</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickFormatter={(tick) => `Y${Math.floor((tick - 1) / 12) + 1} M${(tick - 1) % 12 + 1}`}
                            label={{ value: "Time (Months)", position: "insideBottom", offset: 0 }}
                        />
                        <YAxis tickFormatter={(value) => value.toLocaleString()}
                               label={{ value: "Customers", angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip formatter={(value) => value.toLocaleString()} labelFormatter={(label) => `Month: ${label}`} />
                        <Legend />
                        <Line type="monotone" dataKey="customers" stroke="#00C49F" strokeWidth={2} dot={false} /> {/* Green for growth */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BusinessCharts;