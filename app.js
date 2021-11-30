require('dotenv').config();
const express = require('express');
const config = require('./configs/config');
const connectDB = require('./database/Database');
const expressSession = require('express-session');
const logger = require('./configs/logger');
const cors = require('cors');

connectDB();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(expressSession({ secret: 'max', saveUninitialized: false, resave: false }));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (request, response) => {
  response.send("WELCOME");
})

//Route Middleware
require('./helpers/routes')(app);

const PORT = config.serverPort || 5000;

// Run the server!
app.listen(PORT, () => logger.log('error', `Server running on port ${PORT}`));
