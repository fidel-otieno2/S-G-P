import React, { useState, useEffect } from 'react';
import GoalList from './components/GoalList';
import GoalForm from './components/GoalForm';
import Overview from './components/Overview';
import './App.css';

const LOCAL_STORAGE_KEY = 'smart-goal-planner-goals';

function App() {
  const [goals, setGoals] = useState([]);
  const [showFarGoals, setShowFarGoals] = useState(false);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const storedGoals = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedGoals) {
      setGoals(JSON.parse(storedGoals));
    }
  }, []);

  // ✅ Save to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  // ✅ Add new goal
  const handleAddGoal = (newGoal) => {
    const newGoalWithId = {
      ...newGoal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setGoals([...goals, newGoalWithId]);
  };

  // ✅ Update existing goal
  const handleUpdateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
  };

  // ✅ Delete a goal
  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  // ✅ Deposit logic
  const handleDeposit = (goalId, amount) => {
    const updatedGoals = goals.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, savedAmount: goal.savedAmount + amount };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };

  // ✅ Toggle filtering
  const filterFarGoals = () => {
    setShowFarGoals(!showFarGoals);
  };

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
