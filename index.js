require('dotenv').config({quiet: true});
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./configs/db');
const app = express();
const PORT = process.env.PORT || 8081;

// Connect to DB
db();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve public folder (CSS, JS, etc.)
app.use(express.static("public"));

// Serve uploads folder for images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: true }));

// Routers
app.use('/', require('./routers'));

// Start server
app.listen(PORT, (error) => {
    if(!error){
    console.log(`Server started on http://localhost:${PORT}`);
  }
  else{
    console.log("Error occurred, server can't start", error);
  }
});
