// src/pages/BusinessWisdomPage/components/BusinessParams.jsx
import React from 'react';

const BusinessParams = ({ params, setParams }) => {
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setParams(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) : value
        }));
    };

    return (
        <div className="panel-grid">
            <div className="card">
                <label className="label-text">Initial Investment ($): {params.initialInvestment}</label>
                <div className="input-group">
                    <input type="range" name="initialInvestment" min="1000" max="100000" step="1000"
                           value={params.initialInvestment} onChange={handleChange} />
                    <input type="number" name="initialInvestment" min="1000" max="100000" step="1000"
                           value={params.initialInvestment} onChange={handleChange} />
                </div>
            </div>

            <div className="card">
                <label className="label-text">Initial Customers: {params.initialCustomers}</label>
                <div className="input-group">
                    <input type="range" name="initialCustomers" min="1" max="500" step="1"
                           value={params.initialCustomers} onChange={handleChange} />
                    <input type="number" name="initialCustomers" min="1" max="500" step="1"
                           value={params.initialCustomers} onChange={handleChange} />
                </div>
            </div>

            <div className="card">
                <label className="label-text">Monthly Customer Growth Rate (%): {(params.monthlyCustomerGrowthRate * 100).toFixed(1)}%</label>
                <div className="input-group">
                    <input type="range" name="monthlyCustomerGrowthRate" min="0.001" max="0.1" step="0.001"
                           value={params.monthlyCustomerGrowthRate} onChange={handleChange} />
                    <input type="number" name="monthlyCustomerGrowthRate" min="0.001" max="0.1" step="0.001"
                           value={params.monthlyCustomerGrowthRate} onChange={handleChange} />
                </div>
            </div>

            <div className="card">
                <label className="label-text">Price Per Customer ($/month): {params.pricePerCustomer.toFixed(0)}</label>
                <div className="input-group">
                    <input type="range" name="pricePerCustomer" min="10" max="500" step="10"
                           value={params.pricePerCustomer} onChange={handleChange} />
                    <input type="number" name="pricePerCustomer" min="10" max="500" step="10"
                           value={params.pricePerCustomer} onChange={handleChange} />
                </div>
            </div>

            <div className="card">
                <label className="label-text">COGS Per Customer ($/month): {params.cogsPerCustomer.toFixed(0)}</label>
                <div className="input-group">
                    <input type="range" name="cogsPerCustomer" min="1" max="100" step="1"
                           value={params.cogsPerCustomer} onChange={handleChange} />
                    <input type="number" name="cogsPerCustomer" min="1" max="100" step="1"
                           value={params.cogsPerCustomer} onChange={handleChange} />
                </div>
            </div>

            <div className="card">
                <label className="label-text">Initial Fixed Costs ($/month): {params.initialFixedCosts}</label>
                <div className="input-group">
                    <input type="range" name="initialFixedCosts" min="0" max="5000" step="100"
                           value={params.initialFixedCosts} onChange={handleChange} />
                    <input type="number" name="initialFixedCosts" min="0" max="5000" step="100"
                           value={params.initialFixedCosts} onChange={handleChange} />
                </div>
            </div>

            <div className="card">
                <label className="label-text">Fixed Cost Growth Per Year (%): {(params.fixedCostGrowthPerYear * 100).toFixed(0)}%</label>
                <div className="input-group">
                    <input type="range" name="fixedCostGrowthPerYear" min="0" max="0.2" step="0.01"
                           value={params.fixedCostGrowthPerYear} onChange={handleChange} />
                    <input type="number" name="fixedCostGrowthPerYear" min="0" max="0.2" step="0.01"
                           value={params.fixedCostGrowthPerYear} onChange={handleChange} />
                </div>
            </div>

            <div className="card">
                <label className="label-text">Marketing Spend ($/month): {params.marketingSpendPerMonth}</label>
                <div className="input-group">
                    <input type="range" name="marketingSpendPerMonth" min="0" max="2000" step="100"
                           value={params.marketingSpendPerMonth} onChange={handleChange} />
                    <input type="number" name="marketingSpendPerMonth" min="0" max="2000" step="100"
                           value={params.marketingSpendPerMonth} onChange={handleChange} />
                </div>
            </div>

            <div className="card">
                <label className="label-text">Marketing Customer Boost (per $1k spend): {params.marketingCustomerBoost.toFixed(0)}</label>
                <div className="input-group">
                    <input type="range" name="marketingCustomerBoost" min="0" max="50" step="1"
                           value={params.marketingCustomerBoost} onChange={handleChange} />
                    <input type="number" name="marketingCustomerBoost" min="0" max="50" step="1"
                           value={params.marketingCustomerBoost} onChange={handleChange} />
                </div>
            </div>

            <div className="card">
                <label className="label-text">Reinvestment Rate (% of Net Profit): {(params.reinvestmentRate * 100).toFixed(0)}%</label>
                <div className="input-group">
                    <input type="range" name="reinvestmentRate" min="0" max="1" step="0.05"
                           value={params.reinvestmentRate} onChange={handleChange} />
                    <input type="number" name="reinvestmentRate" min="0" max="1" step="0.05"
                           value={params.reinvestmentRate} onChange={handleChange} />
                </div>
            </div>

            <div className="card">
                <label className="label-text">Simulation Years: {params.years}</label>
                <div className="input-group">
                    <input type="range" name="years" min="1" max="10" step="1"
                           value={params.years} onChange={handleChange} />
                    <input type="number" name="years" min="1" max="10" step="1"
                           value={params.years} onChange={handleChange} />
                </div>
            </div>
        </div>
    );
};

export default BusinessParams;