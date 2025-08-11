// src/pages/BusinessWisdomPage/utils/simulationEngine.js

/**
 * Runs a business growth simulation based on provided parameters.
 * @param {object} params - Simulation parameters.
 * @param {number} params.initialCapital - Starting capital.
 * @param {number} params.winRate - Probability of a winning "trade/investment" (0-1).
 * @param {number} params.riskPerTrade - Percentage of current capital risked per "trade" (0-1).
 * @param {number} params.tradesPerMonth - Number of "trade/investment opportunities" per month.
 * @param {number} params.profitMultiplier - Multiplier for capital gain on a win (e.g., 1.5 means 50% profit on risk).
 * @param {number} params.lossMultiplier - Multiplier for capital loss on a loss (e.g., 1.0 means 100% loss on risk).
 * @param {number} params.initialFixedMonthlyCosts - Starting fixed costs per month.
 * @param {number} params.fixedCostGrowthPerYear - Annual growth rate of fixed costs (0-1).
 * @param {number} params.reinvestmentRate - Percentage of net monthly profit reinvested (0-1).
 * @param {number} params.years - Number of years to simulate.
 * @returns {object} - An object containing simulation history and calculated KPIs.
 */
export const runSimulation = (params) => {
    let {
        initialCapital,
        winRate,
        riskPerTrade,
        tradesPerMonth,
        profitMultiplier,
        lossMultiplier,
        initialFixedMonthlyCosts,
        fixedCostGrowthPerYear,
        reinvestmentRate,
        years
    } = params;

    let currentCapital = initialCapital;
    let currentFixedMonthlyCosts = initialFixedMonthlyCosts;
    let maxCapitalEverReached = initialCapital;
    let simulationHistory = [{
        month: 0,
        year: 0,
        capital: initialCapital,
        drawdown: 0,
        profitThisMonth: 0,
        failed: false
    }];

    let totalMonths = years * 12;
    let failed = false;

    for (let m = 1; m <= totalMonths; m++) {
        let currentYear = Math.floor((m - 1) / 12) + 1;
        let capitalAtStartOfMonth = currentCapital;

        // If capital drops to zero or below, business has failed.
        if (currentCapital <= 0) {
            failed = true;
            currentCapital = 0; // Ensure it doesn't go negative on display if it fails
            break;
        }

        let monthlyOperatingResult = 0; // Sum of gains/losses from trades/investments

        for (let t = 0; t < tradesPerMonth; t++) {
            // Calculate amount to risk based on current capital.
            // Ensure we don't risk more than current capital.
            let amountToRisk = Math.min(currentCapital, currentCapital * riskPerTrade);
            if (amountToRisk <= 0) { // If no capital left to risk, break the "trading" loop for the month
                break;
            }

            if (Math.random() < winRate) {
                // Win
                monthlyOperatingResult += amountToRisk * profitMultiplier;
            } else {
                // Loss
                monthlyOperatingResult -= amountToRisk * lossMultiplier;
            }
            // A simple way to apply immediate capital changes for subsequent trades within the month:
            currentCapital += (amountToRisk * profitMultiplier * (Math.random() < winRate ? 1 : 0)) - (amountToRisk * lossMultiplier * (Math.random() < winRate ? 0 : 1));
            // Revert this for the end-of-month calculation based on `monthlyOperatingResult`
            // The simulation currently aggregates monthlyOperatingResult and applies it at the end for simplicity
        }

        // Revert capital to start-of-month for net profit calculation before costs
        currentCapital = capitalAtStartOfMonth + monthlyOperatingResult;

        // Subtract fixed monthly costs
        currentCapital -= currentFixedMonthlyCosts;

        // Calculate net profit for the month (after operations and fixed costs)
        let netProfitThisMonth = currentCapital - capitalAtStartOfMonth;

        // Apply reinvestment logic: only a portion of positive net profit is retained/compounded
        if (netProfitThisMonth > 0) {
            currentCapital = capitalAtStartOfMonth + (netProfitThisMonth * reinvestmentRate);
        }
        // If netProfitThisMonth <= 0, the full loss applies, no "withdrawal" happens from a loss.
        // currentCapital is already updated with the loss.

        // Check for business failure after all calculations for the month
        if (currentCapital <= 0) {
            failed = true;
            currentCapital = 0;
            break;
        }

        // Update max capital reached for drawdown calculation
        maxCapitalEverReached = Math.max(maxCapitalEverReached, currentCapital);
        let drawdown = (maxCapitalEverReached - currentCapital) / maxCapitalEverReached * 100;
        if (maxCapitalEverReached <= 0) drawdown = 0; // Handle initial zero capital or total loss case gracefully

        simulationHistory.push({
            month: m,
            year: currentYear,
            capital: currentCapital,
            drawdown: drawdown,
            profitThisMonth: netProfitThisMonth,
            failed: false
        });

        // Increase fixed costs at the start of each new year
        if (m % 12 === 0) {
            currentFixedMonthlyCosts *= (1 + fixedCostGrowthPerYear);
        }
    }

    // If simulation failed, add a final failed state and ensure capital is 0
    if (failed && (simulationHistory.length === 0 || simulationHistory[simulationHistory.length - 1].capital > 0)) {
        simulationHistory.push({
            month: totalMonths,
            year: years,
            capital: 0,
            drawdown: 100,
            profitThisMonth: 0,
            failed: true
        });
    } else if (failed) {
        // If it failed mid-loop, ensure the last point reflects failure
        simulationHistory[simulationHistory.length - 1].failed = true;
        simulationHistory[simulationHistory.length - 1].capital = 0;
        simulationHistory[simulationHistory.length - 1].drawdown = 100;
    }


    // Calculate KPIs
    const finalCapital = simulationHistory[simulationHistory.length - 1]?.capital || 0;
    const totalProfit = finalCapital - initialCapital;
    const annualGrowthRate = (finalCapital > 0 && initialCapital > 0 && years > 0)
        ? ((Math.pow(finalCapital / initialCapital, 1 / years) - 1) * 100).toFixed(2)
        : 'N/A';

    const maxDrawdownOverall = simulationHistory.reduce((max, point) => Math.max(max, point.drawdown), 0).toFixed(2);


    return {
        history: simulationHistory,
        kpis: {
            finalCapital: finalCapital.toFixed(2),
            totalProfit: totalProfit.toFixed(2),
            annualGrowthRate: annualGrowthRate,
            maxDrawdown: maxDrawdownOverall,
            failed: failed
        }
    };
};