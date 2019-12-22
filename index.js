//  index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// IMPORT MODELS
require('./models/Product');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://tims:Hit135Run@ds019946.mlab.com:19946/ktmethod", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected..."))
  .catch(err => {
    console.log(err);
  });

app.use(bodyParser.json());

//IMPORT ROUTES
require('./routes/productRoute')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});