const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

app.use(bodyParser.json());
// Db config
let db;

mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log("Error: ", err);
  });

app.use('/api/items', items);

// Serve static asset s if in production

if(process.env.NODE_ENV === 'production') {
  db = process.env.mongoURI;
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
} else {
  db = require('./config/keys').mongoURI;
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));