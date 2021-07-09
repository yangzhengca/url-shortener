const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Use json for api test
app.use(express.json());

// Set view engine
app.set('view engine','ejs')

// Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
