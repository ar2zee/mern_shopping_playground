const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
// Db conggig
const db = require('./config/keys').mongoURI;

mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log("Error: ", err);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));