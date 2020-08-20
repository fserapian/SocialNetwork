const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');

const app = express();

connectDB();

app.get('/', (req, res) => res.send('It works'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
