require('dotenv').config();
const express = require('express'),
  connectDB = require('./database/Database'),
  expressSession = require('express-session'),
  accountRoutes = require('./routes/account'),
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
app.use('/account', accountRoutes);

const PORT = process.env.PORT || 5000;

// Run the server!
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
