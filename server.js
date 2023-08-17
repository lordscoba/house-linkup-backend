// importing express framework
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const normalizeCase = require('./utils/nomaliseCase');
const userRoutes = require('./routes/users.routes');
// importing .env parser
const dotenv = require('dotenv');
dotenv.config();

// importing monogodb database
const connectDB = require('./config/db');
connectDB();

// importing middlewares
const cors = require('cors');
const bodyParser = require('body-parser');
// const { protectUser } = require("./middleware/userMiddleware"); // Auth Middlewares

// Routes
const healthRoutes = require('./routes/health.routes');

// Running routes
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
// app.use('/api/v1/', healthRoutes);

// routes
// Apply the middleware globally for login and sign-up routes
app.use(['/api/user/login', '/api/user/signup'], normalizeCase);
app.use('/api/user', userRoutes);
// // protected routes

// Error Middlewares
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

//Not found URL middleware
app.use(notFound);

//Error handler for the whole app
app.use(errorHandler);

//initializing server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
