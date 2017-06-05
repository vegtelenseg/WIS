let feathers = require('feathers'),
    socketio = require('feathers-socketio'),
    rest = require('feathers-rest'),
    service = require('feathers-mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config/constants.json'),
    Product = require('./models/Product.Model.js'),
    mongo = require('mongod'),
    mongoose = require('mongoose'),
    storeList = [];

mongoose.Promise = global.Promise;
const app = feathers()
  .configure(rest())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}));

app.set('port', (process.env.PORT || config.SERVER.PORT));

if (process.env.NODE_ENV === config.ENV.PROD) {
  app.use(express.static('src/build'));
}

app.get('/api/find-store', (req, res) => {
  const store = req.query.q.toLowerCase();
  storeList = [];
  storeList.push(store);
  console.log("Stores pushed: " + storeList);
  reconnectToDB(store)
  return res.json(req.query.q);
});

reconnectToDB = (store) => {
  let message = '';
  db = mongoose.disconnect().then(function() {
    switch (store) {
      case 'truworths':
        db = mongoose.connect(config.DB.CONNECTION_STRING + config.DB.TRUWORTHS_DB, config.DB.CONNECTION_OPTS);
        console.log("Trying to connect at: " + config.DB.CONNECTION_STRING + config.DB.TRUWORTHS_DB);
        message = "Successfully connected to the " + store + " database";
        break;
      case 'usave':
        db = mongoose.connect(config.DB.CONNECTION_STRING + config.DB.USAVE_DB, config.DB.CONNECTION_OPTS);
        console.log("Trying to connect at: " + config.DB.CONNECTION_STRING + config.DB.USAVE_DB);
        message = "Successfully connected to the " + store + " database";
        break;
      case 'undefined':
        break;
      default:
        db = mongoose.connect(config.DB.CONNECTION_STRING + config.DB.DEFAULT_DB, config.DB.CONNECTION_OPTS);
        message = "Successfully connected to the default database"
      break;
    }
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log(message);
    });
  });
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
    switch (storeList[0]) {
      case 'truworths':
        console.log('To use the Truworths Model');
          Product.find({
            $text: { $search: param }
          }, (error, product)  => {
            if (error) {
              console.log(`DB ERROR => ${error}`);
              reconnectToDB(storeList[0]);
            }
            else if(product !== null && typeof product !== undefined ) {
              return res.json(product);
            }
          });
          break;
      case 'usave' :
        //Use another model here to query
        Product.find({
          $text: { $search: param }
        }, (error, product)  => {
          if (error) {
            console.log(`DB ERROR => ${error}`);
            reconnectToDB(storeList[0]);
          }
          else if(product !== null && typeof product !== undefined ) {
            return res.json(product);
          }
        });
        console.log('To use the Usave Model');
        break;
      default:
        Product.find({
          $text: { $search: param }
          }, (error, product)  => {
            if (error) {
              console.log(`DB ERROR => ${error}`);
            }
            else if(product !== null && typeof product !== undefined ) {
              return res.json(product);
            }
        });
        break;
      }
    }
});
app.listen(app.get('port'), () => {
    console.log(`The server is running at http://localhost:${app.get('port')}`)
});
