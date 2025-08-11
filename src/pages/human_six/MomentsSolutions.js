import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import NavBar from '../NavBar';
import './MomentsSolutions.css'; // You'll need to add styles here

const EMPTY_MOMENT = { moment: '', solution: '' };

export default function MomentsSolutions() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [history, setHistory] = useState([]); // This stores the full history
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [newMoment, setNewMoment] = useState(EMPTY_MOMENT);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState(EMPTY_MOMENT);
    const [editHasSolution, setEditHasSolution] = useState(true); // New state for 'has_solution' during edit
    const [predictions, setPredictions] = useState([]); // State to store ML predictions

    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        fetchHistory();
        fetchPredictions(); // Fetch predictions when component mounts
    }, []);

    async function fetchHistory() {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/moments');
            if (!res.ok) throw new Error('Failed to fetch history');
            const data = await res.json();
            setHistory(data);
            setResults([]); // Clear search results when showing full history
            setQuery('');   // Clear search query
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    async function fetchPredictions() {
        try {
            const res = await fetch('http://localhost:8000/api/predictions/risk-alerts');
            if (!res.ok) throw new Error('Failed to fetch predictions');
            const data = await res.json();
            setPredictions(data);
        } catch (e) {
            console.error("Error fetching predictions:", e);
        }
    }

    async function searchMoments() {
        if (!query.trim()) {
            fetchHistory(); // If query is empty, show full history
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/search-moments?query=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error('Failed to search');
            const data = await res.json();
            setResults(data);
        } catch (e) {
            console.error(e);
            setResults([]);
        }
        setLoading(false);
    }

    async function addMoment() {
        if (!newMoment.moment.trim() || !newMoment.solution.trim()) return;
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/moments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMoment), // `has_solution` defaults to TRUE on backend
            });
            if (!res.ok) throw new Error('Failed to add');
            const added = await res.json();
            setHistory([added, ...history]);
            setNewMoment(EMPTY_MOMENT);
            setAdding(false);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    // Pass has_solution when starting edit
    function startEdit(id, moment, solution, has_solution) {
        setEditingId(id);
        setEditData({ moment, solution });
        setEditHasSolution(has_solution); // Initialize checkbox state
    }

    function cancelEdit() {
        setEditingId(null);
        setEditData(EMPTY_MOMENT);
        setEditHasSolution(true); // Reset checkbox state
    }

    async function saveEdit(id) {
        if (!editData.moment.trim() || !editData.solution.trim()) return;
        setLoading(true);
        try {
            // 1. Update moment text and re-generate embedding
            const updateMomentTextRes = await fetch(`http://localhost:8000/api/moments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });
            if (!updateMomentTextRes.ok) throw new Error('Failed to update moment text');

            // 2. Update has_solution status
            const updateSolutionStatusRes = await fetch(`http://localhost:8000/api/moments/${id}/solution-status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ has_solution: editHasSolution }),
            });
            if (!updateSolutionStatusRes.ok) throw new Error('Failed to update solution status');

            // Fetch the updated moment to ensure all fields (including has_solution) are current
            const fetchUpdatedRes = await fetch(`http://localhost:8000/api/moments/${id}`);
            if (!fetchUpdatedRes.ok) throw new Error('Failed to fetch updated moment');
            const updated = await fetchUpdatedRes.json();

            setHistory(history.map(item => (item.id === id ? updated : item)));
            setResults(results.map(item => (item.id === id ? updated : item)));
            cancelEdit();
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    async function deleteMoment(id) {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/moments/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            setHistory(history.filter(item => item.id !== id));
            setResults(results.filter(item => item.id !== id));
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    // Handler for the "Log Occurrence" button
    const handleLogOccurrence = (momentId, momentText) => {
        // Navigate to the new ProblemLogPage, passing momentId and text
        navigate(`/log-problem/${momentId}`, { state: { momentText } });
    };

    const displayList = query.trim() !== '' ? results : history;

    let noItemsMessage = '';
    if (!loading && displayList.length === 0) {
        if (query.trim() !== '') {
            noItemsMessage = "No relevant moments found for your query. Try rephrasing or adding more data!";
        } else {
            noItemsMessage = "No moments to display. Add some above!";
        }
    }

    return (
        <div className="ms-page">
            <NavBar />
            <div className="ms-container">
                <h1 className="ms-title">Moment & Solution Manager</h1>

                {/* Search */}
                <div className="ms-search-group">
                    <input
                        type="text"
                        placeholder="Describe your moment..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') searchMoments();
                        }}
                        className="ms-input"
                        aria-label="Search moments"
                    />
                    <button onClick={searchMoments} className="ms-button" disabled={loading}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                    <button
                        onClick={() => {
                            setResults([]);
                            setQuery('');
                            fetchHistory();
                        }}
                        className="ms-clear-button"
                    >
                        Clear Search
                    </button>
                </div>

                {/* Add new */}
                {adding ? (
                    <div className="ms-add-form">
                        <textarea
                            className="ms-textarea"
                            placeholder="Moment description"
                            value={newMoment.moment}
                            onChange={e => setNewMoment({ ...newMoment, moment: e.target.value })}
                        />
                        <textarea
                            className="ms-textarea"
                            placeholder="Solution"
                            value={newMoment.solution}
                            onChange={e => setNewMoment({ ...newMoment, solution: e.target.value })}
                        />
                        <div className="ms-add-buttons">
                            <button className="ms-button" onClick={addMoment} disabled={loading}>
                                Add
                            </button>
                            <button className="ms-clear-button" onClick={() => setAdding(false)} disabled={loading}>
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <button className="ms-button ms-add-toggle" onClick={() => setAdding(true)}>
                        + Add New Moment
                    </button>
                )}

                {/* Predictions/Risk Alerts Display */}
                {predictions.length > 0 && (
                    <div className="ms-predictions-section">
                        <h2>Predicted Recurring Problems <span role="img" aria-label="alert">⚠️</span></h2>
                        {predictions.map((p, index) => (
                            <div key={index} className="ms-prediction-alert">
                                <p><strong>High Risk:</strong> {p.moment_text}</p>
                                <p>Likely to occur: {p.prediction_time} (Risk: {(p.predicted_risk * 100).toFixed(0)}%)</p>
                                <button
                                    className="ms-button ms-small"
                                    onClick={() => handleLogOccurrence(p.moment_id, p.moment_text)}
                                >
                                    Log Now
                                </button>
                            </div>
                        ))}
                    </div>
                )}


                {/* Results or history list */}
                <div className="ms-results">
                    {loading && <p className="ms-loading">Loading...</p>}
                    {!loading && displayList.length === 0 && (
                        <p className="ms-no-results">{noItemsMessage}</p>
                    )}
                    {displayList.map(({ id, moment, solution, has_solution }) => ( // Destructure has_solution
                        <div key={id} className="ms-card">
                            {editingId === id ? (
                                <>
                                    <textarea
                                        className="ms-textarea"
                                        value={editData.moment}
                                        onChange={e => setEditData({ ...editData, moment: e.target.value })}
                                    />
                                    <textarea
                                        className="ms-textarea"
                                        value={editData.solution}
                                        onChange={e => setEditData({ ...editData, solution: e.target.value })}
                                    />
                                    <label className="ms-checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={editHasSolution}
                                            onChange={e => setEditHasSolution(e.target.checked)}
                                        />
                                        Has Solution
                                    </label>
                                    <div className="ms-edit-buttons">
                                        <button className="ms-button" onClick={() => saveEdit(id)} disabled={loading}>
                                            Save
                                        </button>
                                        <button className="ms-clear-button" onClick={cancelEdit} disabled={loading}>
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="ms-moment">
                                        <strong>Moment:</strong> {moment}
                                    </p>
                                    <p className="ms-solution">
                                        <strong>Solution:</strong> {solution}
                                        {/* Display 'No Solution Yet' tag if has_solution is false */}
                                        {!has_solution && <span className="ms-no-solution-tag"> (No Solution Yet)</span>}
                                    </p>
                                    <div className="ms-card-buttons">
                                        <button
                                            className="ms-button ms-small"
                                            onClick={() => startEdit(id, moment, solution, has_solution)} // Pass has_solution
                                            disabled={loading}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="ms-clear-button ms-small"
                                            onClick={() => deleteMoment(id)}
                                            disabled={loading}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="ms-button ms-small ms-log-button"
                                            onClick={() => handleLogOccurrence(id, moment)} // Pass ID and text to log handler
                                            disabled={loading}
                                        >
                                            Log Occurrence
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}