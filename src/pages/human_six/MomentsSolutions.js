import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import './MomentsSolutions.css';

const EMPTY_MOMENT = { moment: '', solution: '' };

export default function MomentsSolutions() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [newMoment, setNewMoment] = useState(EMPTY_MOMENT);
    const [editingId, setEditingId] = useState(null);
    const [editData, setEditData] = useState(EMPTY_MOMENT);

    // Load full history on mount
    useEffect(() => {
        fetchHistory();
    }, []);

    async function fetchHistory() {
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/moments');
            if (!res.ok) throw new Error('Failed to fetch history');
            const data = await res.json();
            setHistory(data);
            setResults([]); // Clear any previous search results
            setQuery(''); // Ensure query is empty when showing full history
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    // AI-powered search
    async function searchMoments() {
        if (!query.trim()) {
            // If query is empty, clear results and show full history
            setResults([]);
            fetchHistory(); // Re-fetch history to ensure it's up-to-date and displayed
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/search-moments?query=${encodeURIComponent(query)}`);
            if (!res.ok) throw new Error('Failed to search');
            const data = await res.json();
            setResults(data); // Set results, could be empty if no matches
        } catch (e) {
            console.error(e);
            setResults([]); // On error, ensure results are empty
        }
        setLoading(false);
    }

    // Add new moment
    async function addMoment() {
        if (!newMoment.moment.trim() || !newMoment.solution.trim()) return;
        setLoading(true);
        try {
            const res = await fetch('http://localhost:8000/api/moments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMoment),
            });
            if (!res.ok) throw new Error('Failed to add');
            const added = await res.json();
            setHistory([added, ...history]); // Add to history immediately
            // If a search was active and the new item is relevant, it won't show in results automatically
            // For simplicity here, just clear new moment form. Re-search if desired.
            setNewMoment(EMPTY_MOMENT);
            setAdding(false);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    // Start editing a moment
    function startEdit(id, moment, solution) {
        setEditingId(id);
        setEditData({ moment, solution });
    }

    // Cancel edit
    function cancelEdit() {
        setEditingId(null);
        setEditData(EMPTY_MOMENT);
    }

    // Save edited moment
    async function saveEdit(id) {
        if (!editData.moment.trim() || !editData.solution.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/moments/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });
            if (!res.ok) throw new Error('Failed to update');
            const updated = await res.json();
            setHistory(history.map(item => (item.id === id ? updated : item)));
            // If currently showing search results, update them too
            setResults(results.map(item => (item.id === id ? updated : item)));
            cancelEdit();
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    // Delete moment
    async function deleteMoment(id) {
        if (!window.confirm('Are you sure you want to delete this entry?')) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/moments/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
            setHistory(history.filter(item => item.id !== id));
            setResults(results.filter(item => item.id !== id)); // Also filter from current search results
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    }

    // --- CRUCIAL CHANGE HERE ---
    // Decide which list to show: search results or history.
    // If there's an active query, we ONLY show the search results (which could be empty).
    // If the query is empty, we show the full history.
    const displayList = query.trim() !== '' ? results : history;

    // Determine the message to show when no items are displayed
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
                            setResults([]); // Clear search results
                            setQuery('');   // Clear search query
                            fetchHistory(); // Re-fetch and show all history
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

                {/* Results or history list */}
                <div className="ms-results">
                    {loading && <p className="ms-loading">Loading...</p>}
                    {!loading && displayList.length === 0 && (
                        <p className="ms-no-results">{noItemsMessage}</p>
                    )}
                    {displayList.map(({ id, moment, solution }) => (
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
                                    </p>
                                    <div className="ms-card-buttons">
                                        <button
                                            className="ms-button ms-small"
                                            onClick={() => startEdit(id, moment, solution)}
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