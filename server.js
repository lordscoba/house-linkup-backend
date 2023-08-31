// importing express framework
const express = require('express');
const app = express();

// importing .env parser
const dotenv = require('dotenv');
dotenv.config();

// importing monogodb database
const connectDB = require('./config/db');
connectDB();

// importing middlewares
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const normalizeCase = require('./utils/nomaliseCase');
// const { protectUser } = require("./middleware/userMiddleware"); // Auth Middlewares

// importing Routes
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const profileRoutes = require('./routes/profile.routes');

// Running Global middlewares

const developmentOrigin = ['http://localhost:3000', 'http://localhost:3001'];
const productionOrigin = [
  'https://www.houselinkup.com',
  'www.houselinkup.com',
  'houselinkup.com',
];

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? productionOrigin
        : developmentOrigin,
  })
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// Running Routers
app.use('/api/v1/', healthRoutes);

// middleware to reduce to lowercase
app.use(['/api/v1/login', '/api/v1/signup'], normalizeCase);
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);

// protected routes
// app.use(protectUser);
app.use('/api/v1', profileRoutes);

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
