#!/bin/bash

echo "Starting Smart Goal Planner..."
echo "Starting server on port 3001..."

# Start the server in background
npm run server &
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

echo "Starting React app on port 5173..."
# Start the React app
npm run dev

# Kill server when React app stops
kill $SERVER_PID