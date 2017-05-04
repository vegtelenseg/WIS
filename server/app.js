const express = require('express');
const fs = require('fs');
const constants = require('./config/constants.json');
const Product = require('./models/Product.Model.js');
let mongo = require('mongod'),
    mongoose = require('mongoose'),
    db = mongoose.connect(constants.DB.ORIGIN + "://" +
                          constants.DB.USER + ":" +
                          constants.DB.PASS + "@" +
                          constants.DB.DOMAIN + ":" +
                          constants.DB.PORT + "/" +
                          constants.DB.COLLECTION,
                          constants.DB.CONNECTION_OPTS);
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Sucessfully connectected to database");
});
const app = express();

app.set('port', (process.env.PORT || constants.SERVER.PORT));

//Only server static files in production
if (process.env.NODE_ENV === constants.ENV.PROD) {
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
