import React, { useState } from 'react';
import './EisenhowerMatrix.css';

const initialTasks = [];

const EisenhowerMatrix = () => {
    const [tasks, setTasks] = useState(initialTasks);
    const [form, setForm] = useState({
        name: '',
        impact: 3,
        effort: 3,
        urgent: false,
        important: false,
        id: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name.trim()) return alert("Task name required");
        if (form.effort === 0) return alert("Effort must be at least 1 to avoid division by zero");

        if (form.id === null) {
            // Add new task
            setTasks([...tasks, { ...form, id: Date.now() }]);
        } else {
            // Update existing task
            setTasks(
                tasks.map((t) => (t.id === form.id ? { ...form } : t))
            );
        }

        // Reset form after add/update
        setForm({
            name: '',
            impact: 3,
            effort: 3,
            urgent: false,
            important: false,
            id: null,
        });
    };

    // Safely fill form for editing, with defaults
    const startEdit = (task) => {
        setForm({
            id: task.id,
            name: task.name || '',
            impact: task.impact || 3,
            effort: task.effort || 3,
            urgent: task.urgent || false,
            important: task.important || false,
        });
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
        if (form.id === id) {
            setForm({
                name: '',
                impact: 3,
                effort: 3,
                urgent: false,
                important: false,
                id: null,
            });
        }
    };

    const quadrants = {
        urgent_important: [],
        urgent_notimportant: [],
        noturgent_important: [],
        noturgent_notimportant: [],
    };

    tasks.forEach((task) => {
        if (task.urgent && task.important) quadrants.urgent_important.push(task);
        else if (task.urgent && !task.important) quadrants.urgent_notimportant.push(task);
        else if (!task.urgent && task.important) quadrants.noturgent_important.push(task);
        else quadrants.noturgent_notimportant.push(task);
    });

    const sortTasks = (arr) =>
        arr.slice().sort((a, b) => (b.impact / b.effort) - (a.impact / a.effort));

    return (
        <div className="matrix-container">
            <h1 className="matrix-title">Eisenhower Matrix</h1>

            <form onSubmit={handleSubmit} className="matrix-form">
                <label className="matrix-label full-width">
                    Task Name:
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="matrix-input"
                        placeholder="Enter task name"
                    />
                </label>

                <label className="matrix-label">
                    Impact (1-5):
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={form.impact}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setForm({ ...form, impact: val >= 1 && val <= 5 ? val : form.impact });
                        }}
                        className="matrix-input"
                    />
                </label>

                <label className="matrix-label">
                    Effort (1-5):
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={form.effort}
                        onChange={(e) => {
                            const val = Number(e.target.value);
                            setForm({ ...form, effort: val >= 1 && val <= 5 ? val : form.effort });
                        }}
                        className="matrix-input"
                    />
                </label>

                <label className="matrix-label">
                    Urgent:
                    <select
                        value={form.urgent ? 'yes' : 'no'}
                        onChange={(e) => setForm({ ...form, urgent: e.target.value === 'yes' })}
                        className="matrix-select"
                    >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </label>

                <label className="matrix-label">
                    Important:
                    <select
                        value={form.important ? 'yes' : 'no'}
                        onChange={(e) => setForm({ ...form, important: e.target.value === 'yes' })}
                        className="matrix-select"
                    >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </label>

                <button type="submit" className="matrix-button">
                    {form.id === null ? 'Add Task' : 'Update Task'}
                </button>
            </form>

            <div className="matrix-grid">
                {[
                    { key: 'urgent_important', title: 'Urgent & Important' },
                    { key: 'urgent_notimportant', title: 'Urgent & Not Important' },
                    { key: 'noturgent_important', title: 'Not Urgent & Important' },
                    { key: 'noturgent_notimportant', title: 'Not Urgent & Not Important' },
                ].map(({ key, title }) => {
                    const sorted = sortTasks(quadrants[key]);
                    return (
                        <div key={key} className="matrix-quadrant">
                            <h2 className="quadrant-title">{title}</h2>
                            {sorted.length === 0 ? (
                                <p className="quadrant-empty">No tasks here.</p>
                            ) : (
                                <ol className="task-list">
                                    {sorted.map((task) => (
                                        <li
                                            key={task.id}
                                            className="task-item"
                                            title={`Impact: ${task.impact} | Effort: ${task.effort} | Ratio: ${(task.impact / task.effort).toFixed(2)}`}
                                        >
                      <span
                          className="task-name"
                          onClick={() => startEdit(task)}
                          style={{ cursor: 'pointer' }}
                      >
                        {task.name}
                      </span> — Impact: {task.impact}, Effort: {task.effort}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(task.id);
                                                }}
                                                className="delete-button"
                                                style={{
                                                    marginLeft: '10px',
                                                    padding: '2px 6px',
                                                    cursor: 'pointer',
                                                    backgroundColor: '#ff4d4d',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '3px',
                                                    fontSize: '0.8rem',
                                                }}
                                                aria-label={`Delete task ${task.name}`}
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EisenhowerMatrix;
