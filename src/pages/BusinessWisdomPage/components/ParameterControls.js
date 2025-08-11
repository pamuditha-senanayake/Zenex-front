// src/pages/BusinessWisdomPage/components/ParameterControls.jsx
import React from 'react';

const ParameterControls = ({ params, setParams }) => {
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setParams(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    return (
        <div className="param-controls-grid">
            <div className="param-card">
                <label className="param-label">Initial Capital ($): {params.initialCapital}</label>
                <div className="param-input-group">
                    <input type="range" name="initialCapital" min="100" max="10000" step="100"
                           value={params.initialCapital} onChange={handleChange} />
                    <input type="number" name="initialCapital" min="100" max="10000" step="100"
                           value={params.initialCapital} onChange={handleChange} />
                </div>
            </div>

            <div className="param-card">
                <label className="param-label">Win Rate (%): {(params.winRate * 100).toFixed(0)}%</label>
                <div className="param-input-group">
                    <input type="range" name="winRate" min="0.4" max="0.7" step="0.01"
                           value={params.winRate} onChange={handleChange} />
                    <input type="number" name="winRate" min="0.4" max="0.7" step="0.01"
                           value={params.winRate} onChange={handleChange} />
                </div>
            </div>

            <div className="param-card">
                <label className="param-label">Risk Per Trade (% of Capital): {(params.riskPerTrade * 100).toFixed(1)}%</label>
                <div className="param-input-group">
                    <input type="range" name="riskPerTrade" min="0.005" max="0.1" step="0.005"
                           value={params.riskPerTrade} onChange={handleChange} />
                    <input type="number" name="riskPerTrade" min="0.005" max="0.1" step="0.005"
                           value={params.riskPerTrade} onChange={handleChange} />
                </div>
            </div>

            <div className="param-card">
                <label className="param-label">Trades/Investments Per Month: {params.tradesPerMonth}</label>
                <div className="param-input-group">
                    <input type="range" name="tradesPerMonth" min="1" max="50" step="1"
                           value={params.tradesPerMonth} onChange={handleChange} />
                    <input type="number" name="tradesPerMonth" min="1" max="50" step="1"
                           value={params.tradesPerMonth} onChange={handleChange} />
                </div>
            </div>

            <div className="param-card">
                <label className="param-label">Profit Multiplier (on Risk): {params.profitMultiplier.toFixed(1)}x</label>
                <div className="param-input-group">
                    <input type="range" name="profitMultiplier" min="1.0" max="3.0" step="0.1"
                           value={params.profitMultiplier} onChange={handleChange} />
                    <input type="number" name="profitMultiplier" min="1.0" max="3.0" step="0.1"
                           value={params.profitMultiplier} onChange={handleChange} />
                </div>
            </div>

            <div className="param-card">
                <label className="param-label">Loss Multiplier (on Risk): {params.lossMultiplier.toFixed(1)}x</label>
                <div className="param-input-group">
                    <input type="range" name="lossMultiplier" min="0.5" max="1.0" step="0.05"
                           value={params.lossMultiplier} onChange={handleChange} />
                    <input type="number" name="lossMultiplier" min="0.5" max="1.0" step="0.05"
                           value={params.lossMultiplier} onChange={handleChange} />
                </div>
            </div>

            <div className="param-card">
                <label className="param-label">Initial Fixed Monthly Costs ($): {params.initialFixedMonthlyCosts}</label>
                <div className="param-input-group">
                    <input type="range" name="initialFixedMonthlyCosts" min="0" max="1000" step="50"
                           value={params.initialFixedMonthlyCosts} onChange={handleChange} />
                    <input type="number" name="initialFixedMonthlyCosts" min="0" max="1000" step="50"
                           value={params.initialFixedMonthlyCosts} onChange={handleChange} />
                </div>
            </div>

            <div className="param-card">
                <label className="param-label">Fixed Cost Growth Per Year (%): {(params.fixedCostGrowthPerYear * 100).toFixed(0)}%</label>
                <div className="param-input-group">
                    <input type="range" name="fixedCostGrowthPerYear" min="0" max="0.2" step="0.01"
                           value={params.fixedCostGrowthPerYear} onChange={handleChange} />
                    <input type="number" name="fixedCostGrowthPerYear" min="0" max="0.2" step="0.01"
                           value={params.fixedCostGrowthPerYear} onChange={handleChange} />
                </div>
            </div>

            <div className="param-card">
                <label className="param-label">Reinvestment Rate (% of Net Profit): {(params.reinvestmentRate * 100).toFixed(0)}%</label>
                <div className="param-input-group">
                    <input type="range" name="reinvestmentRate" min="0" max="1" step="0.05"
                           value={params.reinvestmentRate} onChange={handleChange} />
                    <input type="number" name="reinvestmentRate" min="0" max="1" step="0.05"
                           value={params.reinvestmentRate} onChange={handleChange} />
                </div>
            </div>

            <div className="param-card">
                <label className="param-label">Simulation Years: {params.years}</label>
                <div className="param-input-group">
                    <input type="range" name="years" min="1" max="10" step="1"
                           value={params.years} onChange={handleChange} />
                    <input type="number" name="years" min="1" max="10" step="1"
                           value={params.years} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default ParameterControls;