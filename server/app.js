const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/DbConnection');
require('dotenv').config();
const empRoutes = require('./routes/EmployeeRoutes');

connectDB();
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on  http://localhost:${port}/`);
});

app.use('/', empRoutes);
