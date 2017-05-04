const express = require('express');
const fs = require('fs');
let mongo = require('mongod'),
    mongoose = require('mongoose'),
    options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } },
    db = mongoose.connect("mongodb://simzam:7bitsfacebook7@ds131151.mlab.com:31151/products", options),
    Product = require('./models/Product.Model.js');
mongoose.Promise = global.Promise;
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Sucessfully connectected to database");
});
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
      console.log("Sucessfully reached the backend. The query is: " + param);
      Product.find({
        category: param
      }, (error, category)  => {
          if (error) {
            console.log("DB ERROR: " + error);
          }
          else if(category) {
            console.log("Product name is: " + category.productName);
          }
      });
    }
});
app.listen(app.get('port'), () => {
    console.log(`The server is running at http://localhost:${app.get('port')}`)
});
