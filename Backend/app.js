const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/books');
const borrowRoutes = require('./routes/borrow');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => console.log('Error syncing database:', err));

module.exports = app;