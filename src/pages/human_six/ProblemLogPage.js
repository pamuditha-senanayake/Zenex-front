import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // For momentId and momentText
import NavBar from '../NavBar';
import './ProblemLogPage.css'; // Create this CSS file for styling

const DEFAULT_LOG_DATA = {
    mood: '',
    context: '',
    triggers: '',
    extra_details: '',
};

export default function ProblemLogPage() {
    const { momentId } = useParams(); // Get momentId from the URL (e.g., /log-problem/123)
    const location = useLocation();
    const { momentText } = location.state || {}; // Get momentText passed via navigation state

    const [logData, setLogData] = useState(DEFAULT_LOG_DATA);
    const [problemLogs, setProblemLogs] = useState([]);
    const [noSolutionSummary, setNoSolutionSummary] = useState([]);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        fetchProblemLogs();
        fetchNoSolutionSummary();
    }, [momentId]); // Re-fetch logs if the momentId in the URL changes

    const fetchProblemLogs = async () => {
        setLoading(true);
        try {
            // If momentId is present, fetch logs for that specific moment, otherwise fetch recent general logs
            const url = momentId
                ? `http://localhost:8000/api/problem-logs?moment_id=${momentId}`
                : 'http://localhost:8000/api/problem-logs';
            const res = await fetch(url);
            if (!res.ok) throw new Error('Failed to fetch problem logs');
            const data = await res.json();
            setProblemLogs(data);
        } catch (e) {
            console.error("Error fetching problem logs:", e);
        } finally {
            setLoading(false);
        }
    };

    const fetchNoSolutionSummary = async () => {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/summary/no-solution-moments');
            if (!res.ok) throw new Error('Failed to fetch no solution summary');
            const data = await res.json();
            setNoSolutionSummary(data);
        } catch (e) {
            console.error("Error fetching no solution summary:", e);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitLog = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(''); // Clear previous success message

        if (!momentId) {
            alert("Please select a moment from the 'Moment & Solution Manager' page to log an occurrence.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:8000/api/problem-logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    moment_id: parseInt(momentId),
                    ...logData,

                }),
            });
            if (!res.ok) {
                const errorDetail = await res.text();
                throw new Error(`Failed to log: ${errorDetail}`);
            }
            const newLog = await res.json();
            setProblemLogs([newLog, ...problemLogs]); // Add new log to the list
            setLogData(DEFAULT_LOG_DATA); // Reset form
            setSuccessMessage('Log recorded successfully!');
        } catch (e) {
            console.error("Error submitting log:", e);
            alert(`Error logging moment: ${e.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pl-page">
            <NavBar />
            <div className="pl-container">
                <h1 className="pl-title">Log Problem Occurrence</h1>

                {/* Section indicating which moment is being logged */}
                {momentId && momentText ? (
                    <div className="pl-selected-moment">
                        <h3>Logging for: <span>{momentText}</span></h3>
                        <p>Moment ID: {momentId}</p>
                    </div>
                ) : (
                    <p className="pl-warning">
                        To log a specific problem, please navigate here using the "Log Occurrence" button
                        on the "Moment & Solution Manager" page.
                        You can still view logs and summaries below.
                    </p>
                )}

                {/* Form to log details */}
                <form className="pl-log-form" onSubmit={handleSubmitLog}>
                    <label>
                        Mood:
                        <input
                            type="text"
                            value={logData.mood}
                            onChange={(e) => setLogData({ ...logData, mood: e.target.value })}
                            placeholder="e.g., Anxious, Calm, Frustrated"
                        />
                    </label>
                    <label>
                        Context:
                        <input
                            type="text"
                            value={logData.context}
                            onChange={(e) => setLogData({ ...logData, context: e.target.value })}
                            placeholder="e.g., At work, Before bed, After exercise"
                        />
                    </label>
                    <label>
                        Triggers:
                        <input
                            type="text"
                            value={logData.triggers}
                            onChange={(e) => setLogData({ ...logData, triggers: e.target.value })}
                            placeholder="e.g., Lack of sleep, Argument, Bad news"
                        />
                    </label>
                    <label>
                        Extra Details:
                        <textarea
                            value={logData.extra_details}
                            onChange={(e) => setLogData({ ...logData, extra_details: e.target.value })}
                            placeholder="Any other notes..."
                        />
                    </label>
                    <button type="submit" className="pl-button" disabled={loading || !momentId}>
                        {loading ? 'Logging...' : 'Record Log'}
                    </button>
                    {successMessage && <p className="pl-success-message">{successMessage}</p>}
                </form>

                {/* Summary Section */}
                <div className="pl-summary-section">
                    <h2>Summary Insights</h2>
                    <p><strong>Total Problem Logs (all moments):</strong> {problemLogs.length}</p>
                    {noSolutionSummary.length > 0 ? (
                        <>
                            <h3>Moments with No Solution Yet ({noSolutionSummary.length}):</h3>
                            <ul className="pl-no-solution-list">
                                {noSolutionSummary.map(item => (
                                    <li key={item.id}>
                                        <strong>Moment:</strong> {item.moment}
                                        {item.log_count > 0 && ` (Logged ${item.log_count} times, Last: ${new Date(item.last_logged).toLocaleString()})`}
                                    </li>
                                ))}
                            </ul>
                        </>
                    ) : (
                        <p>All recorded moments currently have a solution, or no moments are marked as 'no solution'.</p>
                    )}
                </div>

                {/* Past Problem Occurrences List */}
                <div className="pl-past-logs">
                    <h2>Recent Problem Occurrences</h2>
                    {loading && <p>Loading logs...</p>}
                    {!loading && problemLogs.length === 0 && <p>No logs recorded yet.</p>}
                    {!loading && problemLogs.length > 0 && (
                        <div className="pl-log-list">
                            {problemLogs.map(log => (
                                <div key={log.id} className="pl-log-item">
                                    <p><strong>Moment ID:</strong> {log.moment_id}</p>
                                    <p><strong>Logged At:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                                    {log.mood && <p><strong>Mood:</strong> {log.mood}</p>}
                                    {log.context && <p><strong>Context:</strong> {log.context}</p>}
                                    {log.triggers && <p><strong>Triggers:</strong> {log.triggers}</p>}
                                    {log.extra_details && <p><strong>Details:</strong> {log.extra_details}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}