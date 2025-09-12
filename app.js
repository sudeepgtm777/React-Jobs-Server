const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const jobRouter = require('./routes/jobRoute');
const userRouter = require('./routes/userRoute');
const errorController = require('./controllers/errorController');

const app = express();

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true, // ✅ allow cookies
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/jobs', jobRouter);
app.use('/api/v1/users', userRouter);

// Handle unknown routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.use(errorController);

module.exports = app;
