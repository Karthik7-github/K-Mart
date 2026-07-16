const express = require('express');
const app = express();
const cors = require('cors');
const UserRoutes = require('./routes/user.routes');
require('dotenv').config();

app.use(express.json());   
app.use(cors());

app.use("/api/user", UserRoutes);  

module.exports = app;