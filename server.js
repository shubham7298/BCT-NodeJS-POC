const express = require('express')
const sequelize = require('./config/db');
require('dotenv').config();
require('colors');
const app = express();

//Initate Models and relations
require('./models/initiate_relations')

//Set headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//Routes Initalizations
require('./api/routes')

//errorhandler
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//db connect and start server
sequelize.sync()
  .then(cart => {
    console.log(`Connect to ${process.env.database} DB`.yellow.bold);
    app.listen(process.env.port, console.log(`App is running on port ${process.env.port}`.green.bold));
  })
  .catch(err => {
    console.log(err);
  });
