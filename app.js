
const express = require('express'); // Import express
const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(express.static('./public')); // Serve static files

require('dotenv').config(); // Import dotenv

const taskRoutes = require('./routes/tasks'); // Import tasks.js
const connectDB = require('./db/connect'); // Import connect.js

const PORT = 5000;
app.get('/', (req, res) => {
    res.send('Hello, Here is the root page');
});

// ルーティング設計
app.use("/api/v1/tasks", taskRoutes); // Use /api/v1/tasks as a prefix for all routes in tasks.js

// データベース接続
const start = async () => { // 非同期処理を行う関数を定義
    try {
        await connectDB(process.env.MONGO_HEROKU_URL || process.env.MONGO_URL); // Connect to the database
        app.listen(process.env.PORT || PORT , console.log("Server is running")); // If connected, start the server
    } catch (error) {
        console.log(error);
    }
}

start(); // Start the server
