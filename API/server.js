const express = require('express');
const app = express();
const cors = require("cors");
const http = require("http");
const db = require('./dbConnect');
require('dotenv').config();

const HTTP_PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRouter = require('./routes/authRoutes');
app.use('/api/auth', authRouter);
const userRouter = require('./routes/userRoutes');
app.use('/api/user', userRouter);

// Start server and connect to database
db.connect()
.then(() => {
    http.createServer(app).listen(HTTP_PORT, () => console.log("Server listening on: " + HTTP_PORT) );
})
.catch((err) => {
    console.log("Error: " + err);
    process.exit();
});