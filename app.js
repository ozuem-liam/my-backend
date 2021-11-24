require('dotenv').config();
const express = require('express'),
  cors = require('cors');

const app = express();

app.use(express.json({ limit: '50mb' }));

app.get('/', (request, response) => {
  response.send('WELCOME');
});

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

// Run the server!
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
