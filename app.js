require('dotenv').config();
const express = require('express'),
 config = require('./configs/config'),
  connectDB = require('./database/Database'),
  expressSession = require('express-session'),
  logger = require('./configs/logger'),
  cors = require('cors');

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

app.get('/', (request, response) => {
  response.send('WELCOME');
});

//Route Middleware
require('./routes/routes')(app);

const PORT = config.serverPort || 5000;

// Run the server!
app.listen(PORT, () => logger.log('error', `Server running on port ${PORT}`));
