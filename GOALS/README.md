# Smart Goal Planner

Smart Goal Planner is a modern web application built with React and Vite that helps users set, track, and manage their financial goals. It allows users to create goals, make deposits, update progress, and filter goals based on deadlines. The backend is powered by [json-server](https://github.com/typicode/json-server), which provides a simple REST API for storing and retrieving goals from a local `db.json` file.

---

## Features

- **Add New Goals:**  
  Users can create new financial goals by specifying the name, target amount, saved amount, category, deadline, and creation date.

- **View & Filter Goals:**  
  All goals are displayed in a list. Users can filter goals to show only those with deadlines 24 days or more away.

- **Update & Delete Goals:**  
  Users can update goal details, make deposits to increase the saved amount, or delete goals they no longer need.

- **Overview Dashboard:**  
  A summary dashboard provides insights into your goals and progress.

- **Persistent Storage:**  
  All goals are stored in `db.json` and managed via RESTful API calls using `json-server`.

---

## Project Structure

```
vite-project/
├── db.json                # Local database for storing goals
├── package.json           # Project dependencies and scripts
├── src/
│   ├── App.jsx            # Main React component (handles state, API calls)
│   ├── main.jsx           # Entry point for React app
│   └── components/
│       ├── GoalList.jsx   # Renders the list of goals
│       ├── GoalForm.jsx   # Form for adding new goals
│       └── Overview.jsx   # Dashboard overview component
├── public/
│   └── index.html         # Main HTML file
├── vercel.json            # Vercel deployment configuration
└── README.md              # Project documentation
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [json-server](https://github.com/typicode/json-server)

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/your-username/smart-goal-planner.git
   cd smart-goal-planner/vite-project
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Start the backend (json-server):**
   ```
   json-server --watch db.json --port 3001
   ```
   This will serve your goals at `http://localhost:3001/goals`.

4. **Start the frontend (Vite dev server):**
   ```
   npm run dev
   ```
   Visit `http://localhost:5173` in your browser.

---

## Usage

- **Add a Goal:**  
  Use the form to create a new goal. The goal will be saved to `db.json` via the API.

- **Edit or Delete a Goal:**  
  Use the controls in the goal list to update or remove goals.

- **Deposit to a Goal:**  
  Make deposits to increase the saved amount for any goal.

- **Filter Goals:**  
  Toggle the filter to show only goals with deadlines 24+ days away.

---

## API Reference

All API requests are handled by `json-server`:

- `GET /goals` - Fetch all goals
- `POST /goals` - Add a new goal
- `PUT /goals/:id` - Update a goal
- `DELETE /goals/:id` - Delete a goal

---

## Author

**Martins Fidel**

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for details.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Deployment

The project includes a `vercel.json` file for easy deployment to [Vercel](https://vercel.com/).  
To deploy, push your repository to GitHub and import it into Vercel.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [json-server](https://github.com/typicode/json-server)

---

Happy goal