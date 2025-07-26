import React, { useState, useEffect } from 'react';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import Overview from './components/Overview';
import { initialGoals } from './data/initialGoals';
import './App.css';

function App() {
  const [goals, setGoals] = useState([]);
  const [showFarGoals, setShowFarGoals] = useState(false);

  // Load goals from localStorage or use initial data
  useEffect(() => {
    const savedGoals = localStorage.getItem('goals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    } else {
      setGoals(initialGoals);
      localStorage.setItem('goals', JSON.stringify(initialGoals));
    }
  }, []);

  // Save goals to localStorage
  const saveGoals = (updatedGoals) => {
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  // Add a new goal
  const handleAddGoal = (newGoal) => {
    const newGoalWithId = {
      ...newGoal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updatedGoals = [...goals, newGoalWithId];
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  // Update an existing goal
  const handleUpdateGoal = (updatedGoal) => {
    const updatedGoals = goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal);
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  // Delete a goal
  const handleDeleteGoal = (goalId) => {
    const updatedGoals = goals.filter(goal => goal.id !== goalId);
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
  };

  // Make a deposit to a goal
  const handleDeposit = (goalId, amount) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    const updatedGoal = {
      ...goal,
      savedAmount: goal.savedAmount + amount
    };
    const updatedGoals = goals.map(g => g.id === goalId ? updatedGoal : g);
    setGoals(updatedGoals);
    saveGoals(updatedGoals);
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
        <div className="header-buttons">
          <button onClick={filterFarGoals} className="filter-button">
            {showFarGoals ? "Show All Goals" : "Show Goals 24+ Days Away"}
          </button>
        </div>
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
