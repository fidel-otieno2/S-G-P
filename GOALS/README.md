# Smart Goal Planner

A React application that directly saves to and reads from `db.json` file.

## Features

✅ **Direct db.json Integration** - All changes automatically save to db.json  
✅ **Add Goals** - Creates new goals and saves to db.json  
✅ **Edit Goals** - Updates existing goals in db.json  
✅ **Delete Goals** - Removes goals from db.json  
✅ **Make Deposits** - Updates saved amounts in db.json  
✅ **Real-time Persistence** - Every action immediately updates the file  

## How to Run

### Option 1: Run both server and app together
```bash
npm run start-all
```

### Option 2: Run separately
```bash
# Terminal 1 - Start the server
npm run server

# Terminal 2 - Start the React app
npm run dev
```

## How it Works

1. **Server** (port 3001) - Handles reading/writing to db.json
2. **React App** (port 5173) - Your goal management interface
3. **Automatic Sync** - Every add/edit/delete/deposit saves to db.json instantly

## File Structure

- `db.json` - Your goals database (automatically updated)
- `server.js` - Express server for file operations
- `src/App.jsx` - Main React component
- `src/components/` - Goal management components

No backend setup needed - just run and your changes save directly to db.json!