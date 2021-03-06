const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());

app.use(express.json({ extended: false }));

app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.get('/', (req, res) => res.send('It works'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
