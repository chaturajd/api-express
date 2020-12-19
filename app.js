require('dotenv').config();
const express = require('express');

const organicnomRouter = require('./routes/organicnom.js');

const app = express();

//Routes
app.use('/organicnom',organicnomRouter);

app.listen(3000, () => console.log("Server Started"));