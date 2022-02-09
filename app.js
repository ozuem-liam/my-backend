require('dotenv').config();
const express = require('express');
const config = require('./configs/config');
const connectDB = require('./database/Database');
const logger = require('./configs/logger/index');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

connectDB();

const app = express();

app.use(express.json({ limit: '50mb' }));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Protranslating API',
      description: 'Protranslating API documentation of all routes and information',
      contact: {
        name: 'Williams',
      },
      servers: ['http://localhost:5000'],
    },
  },
  apis: ['./apis/clientModule/client*.js', './apis/providerModule/client*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

const option = {
  explorer: true
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, option));

app.get('/', (request, response) => {
  response.send('WELCOME');
});

//Route Middleware
require('./helpers/routes')(app);

const PORT = config.serverPort || 5000;

// Run the server!
app.listen(PORT, () => logger.log('error', `Server running on port ${PORT}`));
