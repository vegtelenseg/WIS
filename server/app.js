const express = require('express');
const fs = require('fs');
// Set up mongodb here
let mongo = require('mongod'),
    mongoose = require('mongoose'),
    db = mongoose.connect("mongodb://simzam:7bitsfacebook7@ds145299.mlab.com:45299/museinvest");
mongoose.Promise = global.Promise;
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to the database");
})


const app = express();
app.set('port', (process.env.PORT || 4300));

//Only server static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('src/build'));
}

app.get('/api/food', (req, res) => {
  const param = req.query.q;
  if (!param) {
    res.json({
      error: "Missing the parameter to search for"
    });
    return;
  }
  else {
      alert("Sucessfully reached the backend, now bug the server");
  }
});
app.listen(app.get('port'), () => {
    console.log(`The server is running at http://localhost:${app.get('port')}`)
});
