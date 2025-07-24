import React, { useState, useEffect } from 'react';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import Overview from './components/Overview';
import './App.css';

const API_URL = 'http://localhost:3000/goals';

function App() {
  const [goals, setGoals] = useState([]);
  const [showFarGoals, setShowFarGoals] = useState(false);

  // Fetch goals from json-server on mount
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setGoals(data))
      .catch(() => setGoals([]));
  }, []);

  // Add a new goal and save to db.json via json-server
  const handleAddGoal = async (newGoal) => {
    const newGoalWithId = {
      ...newGoal,
      id: Date.now().toString(),
    };
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newGoalWithId),
    });
    const savedGoal = await res.json();
    setGoals([...goals, savedGoal]);
  };

  // Update an existing goal in db.json
  const handleUpdateGoal = async (updatedGoal) => {
    await fetch(`${API_URL}/${updatedGoal.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGoal),
    });
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
  };

  // Delete a goal from db.json
  const handleDeleteGoal = async (goalId) => {
    await fetch(`${API_URL}/${goalId}`, { method: 'DELETE' });
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  // Make a deposit to a goal and update db.json
  const handleDeposit = async (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + amount
    };
    await fetch(`${API_URL}/${goalId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedGoal),
    });
    setGoals(goals.map(g => g.id === goalId ? updatedGoal : g));
  };

  // Filter goals that are 24 days or more from deadline
  const filterFarGoals = () => {
    setShowFarGoals(!showFarGoals);
  };

  // Get filtered goals based on current filter state
  const getFilteredGoals = () => {
    if (!showFarGoals) return goals;
    return goals.filter(goal => {
      const daysLeft = Math.floor(
        (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
      );
      return daysLeft >= 24;
    });
  };

  const filteredGoals = getFilteredGoals();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Smart Goal Planner</h1>
        <button onClick={filterFarGoals} className="filter-button">
          {showFarGoals ? "Show All Goals" : "Show Goals 24+ Days Away"}
        </button>
      </header>
      <main>
        <div className="dashboard-container">
          <div className="dashboard-left">
            <Overview goals={filteredGoals} />
            <GoalForm onAddGoal={handleAddGoal} />
          </div>
          <div className="dashboard-right">
            <h2>Your Goals</h2>
            {filteredGoals.length === 0 ? (
              <div className="no-goals-message">
                <p>No goals found. Create your first goal to get started!</p>
              </div>
            ) : (
              <GoalList 
                goals={filteredGoals} 
                onUpdateGoal={handleUpdateGoal} 
                onDeleteGoal={handleDeleteGoal} 
                onDeposit={handleDeposit} 
              />
            )}
          </div>
        </div>
      </main>
      <footer className="App-footer">
        <p>© 2025 Smart Goal Planner - Track your financial goals with ease</p>
      </footer>
    </div>
  );
}

export default App;