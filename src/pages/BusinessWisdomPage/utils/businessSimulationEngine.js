// src/pages/BusinessWisdomPage/utils/businessSimulationEngine.js

/**
 * Runs a real business growth simulation.
 * @param {object} params - Simulation parameters.
 * @param {number} params.initialInvestment - Starting capital injection.
 * @param {number} params.initialCustomers - Starting number of customers/clients.
 * @param {number} params.monthlyCustomerGrowthRate - Base organic monthly growth rate (0-1).
 * @param {number} params.pricePerCustomer - Average revenue per customer per month.
 * @param {number} params.cogsPerCustomer - Cost of Goods Sold (variable cost) per customer per month.
 * @param {number} params.initialFixedCosts - Starting fixed monthly operating costs (rent, salaries etc.).
 * @param {number} params.fixedCostGrowthPerYear - Annual growth rate of fixed costs (0-1).
 * @param {number} params.marketingSpendPerMonth - Monthly budget for marketing.
 * @param {number} params.marketingCustomerBoost - Number of *additional* customers gained per $1000 marketing spend.
 * @param {number} params.reinvestmentRate - Percentage of net profit reinvested into the business cash balance (0-1).
 * @param {number} params.years - Number of years to simulate.
 * @returns {object} - An object containing simulation history and calculated KPIs.
 */
export const runBusinessSimulation = (params) => {
    // --- Input Sanitization and Defaults ---
    let initialInvestment = parseFloat(params.initialInvestment) || 0;
    let initialCustomers = parseFloat(params.initialCustomers) || 0;
    let monthlyCustomerGrowthRate = parseFloat(params.monthlyCustomerGrowthRate) || 0;
    let pricePerCustomer = parseFloat(params.pricePerCustomer) || 0;
    let cogsPerCustomer = parseFloat(params.cogsPerCustomer) || 0;
    let initialFixedCosts = parseFloat(params.initialFixedCosts) || 0;
    let fixedCostGrowthPerYear = parseFloat(params.fixedCostGrowthPerYear) || 0;
    let marketingSpendPerMonth = parseFloat(params.marketingSpendPerMonth) || 0;
    let marketingCustomerBoost = parseFloat(params.marketingCustomerBoost) || 0;
    let reinvestmentRate = parseFloat(params.reinvestmentRate) || 0;
    let years = parseFloat(params.years) || 1; // Years should default to at least 1

    // Additional clamping/validation for rates
    reinvestmentRate = Math.max(0, Math.min(1, reinvestmentRate));
    monthlyCustomerGrowthRate = Math.max(0, monthlyCustomerGrowthRate);
    fixedCostGrowthPerYear = Math.max(0, fixedCostGrowthPerYear);
    pricePerCustomer = Math.max(0, pricePerCustomer); // Price cannot be negative
    cogsPerCustomer = Math.max(0, cogsPerCustomer); // COGS cannot be negative


    let currentCash = initialInvestment;
    let currentCustomers = initialCustomers;
    let currentFixedCosts = initialFixedCosts;
    let maxCashEverReached = initialInvestment;
    let businessFailed = false;

    const simulationHistory = [{
        month: 0,
        year: 0,
        cash: initialInvestment,
        customers: initialCustomers,
        revenue: 0,
        totalCosts: 0,
        profit: 0,
        cashDrawdown: 0,
        fixedCosts: initialFixedCosts,
        failed: false
    }];

    const totalMonths = years * 12;

    for (let m = 1; m <= totalMonths; m++) {
        let currentYear = Math.floor((m - 1) / 12) + 1;

        if (businessFailed) {
            // If business already failed, continue history as failed
            simulationHistory.push({
                month: m,
                year: currentYear,
                cash: 0,
                customers: 0, // Customers might start churning rapidly after failure
                revenue: 0,
                totalCosts: 0,
                profit: 0,
                cashDrawdown: 100,
                fixedCosts: currentFixedCosts,
                failed: true
            });
            continue;
        }

        // 1. Customer Growth
        // Organic growth
        currentCustomers *= (1 + monthlyCustomerGrowthRate);
        // Marketing boost
        const marketingCustomers = (marketingSpendPerMonth / 1000) * marketingCustomerBoost;
        currentCustomers += marketingCustomers;
        currentCustomers = Math.max(0, currentCustomers); // Ensure customers don't go negative

        // 2. Revenue Calculation
        const monthlyRevenue = currentCustomers * pricePerCustomer;

        // 3. Variable Costs (COGS)
        const monthlyVariableCosts = currentCustomers * cogsPerCustomer;

        // 4. Fixed Costs (adjust annually)
        if (m > 1 && (m - 1) % 12 === 0) { // Apply growth at the start of each new year
            currentFixedCosts *= (1 + fixedCostGrowthPerYear);
        }

        // 5. Total Costs
        const monthlyTotalCosts = monthlyVariableCosts + currentFixedCosts + marketingSpendPerMonth;

        // 6. Monthly Profit/Loss (before reinvestment/cash flow adjustment)
        const monthlyOperatingProfit = monthlyRevenue - monthlyTotalCosts;

        // 7. Cash Flow and Reinvestment
        let cashChange = monthlyOperatingProfit;

        if (monthlyOperatingProfit > 0) {
            cashChange = monthlyOperatingProfit * reinvestmentRate;
        }

        currentCash += cashChange;

        // Check for failure condition
        if (currentCash <= 0) {
            businessFailed = true;
            currentCash = 0;
        }

        // Update max cash for drawdown
        maxCashEverReached = Math.max(maxCashEverReached, currentCash);
        let cashDrawdown = 0;
        if (maxCashEverReached > 0) {
            cashDrawdown = (maxCashEverReached - currentCash) / maxCashEverReached * 100;
        }
        cashDrawdown = Math.max(0, Math.min(100, cashDrawdown)); // Clamp drawdown between 0 and 100
        if (isNaN(cashDrawdown)) cashDrawdown = 0; // Catch any remaining NaN from calculations

        simulationHistory.push({
            month: m,
            year: currentYear,
            cash: currentCash,
            customers: currentCustomers,
            revenue: monthlyRevenue,
            totalCosts: monthlyTotalCosts,
            profit: monthlyOperatingProfit,
            cashDrawdown: cashDrawdown,
            fixedCosts: currentFixedCosts,
            failed: businessFailed
        });
    }

    // Calculate KPIs
    // Ensure finalCash and other numeric values are always numbers, even if simulation was very short or failed
    const finalCash = simulationHistory[simulationHistory.length - 1]?.cash || 0;
    const totalRevenue = simulationHistory.reduce((sum, entry) => sum + (entry.revenue || 0), 0); // Handle potential NaN in entry.revenue
    const totalProfit = simulationHistory.reduce((sum, entry) => sum + (entry.profit || 0), 0); // Handle potential NaN in entry.profit

    const maxCashDrawdownOverall = simulationHistory.reduce((max, point) => Math.max(max, (point.cashDrawdown || 0)), 0).toFixed(2);


    return {
        history: simulationHistory,
        kpis: {
            // These are now guaranteed to be numbers due to sanitization and || 0 defaults
            finalCash: finalCash.toFixed(2),
            totalRevenue: totalRevenue.toFixed(2),
            totalProfit: totalProfit.toFixed(2),
            maxCashDrawdown: maxCashDrawdownOverall,
            businessFailed: businessFailed
        }
    };
};