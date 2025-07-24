import React, { useMemo } from "react";

// Currency formatter for KSh
const currencyFormatter = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  minimumFractionDigits: 2
});

// Reusable goal status logic
const getGoalStatus = (goal) => {
  const daysLeft = Math.floor(
    (new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24)
  );
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isOverdue = !isCompleted && daysLeft < 0;
  const isNearDeadline = !isCompleted && daysLeft <= 30 && daysLeft >= 0;

  return { daysLeft, isCompleted, isOverdue, isNearDeadline };
};

// Display for individual goal
const GoalStatusDisplay = React.memo(({ goal }) => {
  const { daysLeft, isCompleted, isOverdue, isNearDeadline } = getGoalStatus(goal);

  const status = isCompleted
    ? "✅ Completed"
    : isOverdue
    ? `❌ Overdue`
    : isNearDeadline
    ? `⚠️ Near Deadline (${daysLeft} days left)`
    : `⏳ On Track (${daysLeft} days left)`;

  return (
    <li key={goal.id} className="goal-status-item">
      <strong>{goal.name}</strong> - {status}
      <div className="goal-overview-details">
        <span>Progress: {goal.targetAmount > 0 ? ((goal.savedAmount / goal.targetAmount) * 100).toFixed(1) : '0.0'}%</span>
        <span>Target: {currencyFormatter.format(goal.targetAmount || 0)}</span>
        <span>Saved: {currencyFormatter.format(goal.savedAmount || 0)}</span>
      </div>
    </li>
  );
});

// Overview component for all goals
function Overview({ goals = [] }) {
  const { totalGoals, totalSaved, completedGoals } = useMemo(() => {
    return {
      totalGoals: goals.length,
      totalSaved: goals.reduce((sum, goal) => sum + (goal.savedAmount || 0), 0),
      completedGoals: goals.filter((g) => g.savedAmount >= g.targetAmount).length
    };
  }, [goals]);

  return (
    <div className="overview">
      <h2>Overview</h2>
      <p>Total Goals: {totalGoals}</p>
      <p>Total Saved: {currencyFormatter.format(totalSaved)}</p>
      <p>Goals Completed: {completedGoals}</p>

      {goals.length === 0 ? (
        <p className="no-data-message">
          No goals available. Add your first goal to see statistics.
        </p>
      ) : (
        <ul aria-label="List of financial goals">
          {goals.map((goal) => (
            <GoalStatusDisplay key={goal.id} goal={goal} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default React.memo(Overview);
