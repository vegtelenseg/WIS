let feathers = require('feathers'),
    socketio = require('feathers-socketio'),
    rest = require('feathers-rest'),
    service = require('feathers-mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config/constants.json'),
    Product = require('./models/Product.Model.js'),
    mongo = require('mongod'),
    mongoose = require('mongoose'),
    storeList = [],
    db = mongoose.connect(config.DB.CONNECTION_STRING + config.DB.DEFAULT_DB, config.DB.CONNECTION_OPTS);

mongoose.Promise = global.Promise;
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("Sucessfully connectected to database");
});

const app = feathers()
  .configure(rest())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}));

app.set('port', (process.env.PORT || config.SERVER.PORT));

if (process.env.NODE_ENV === config.ENV.PROD) {
  app.use(express.static('src/build'));
}

exist = (store) => {
  if (store !== undefined && store !== null) {
    if (storeList.includes(store)) {
      return true;
    }
  }
  return false;
}

app.get('/api/find-store', (req, res) => {
  const store = req.query.q.toLowerCase();
  if (!exist(store)) {
    storeList.push(store);
  }
  console.log("Stores pushed: " + storeList);
  db = mongoose.disconnect().then(function() {
    switch (store) {
      case 'truworths':
        db = mongoose.connect(config.DB.CONNECTION_STRING + config.DB.TRUWORTHS_DB, config.DB.CONNECTION_OPTS);
        console.log("Trying to connect at: " + config.DB.CONNECTION_STRING + config.DB.TRUWORTHS_DB);
        break;
      case 'usave':
        db = mongoose.connect(config.DB.CONNECTION_STRING + config.DB.USAVE_DB, config.DB.CONNECTION_OPTS);
        console.log("Trying to connect at: " + config.DB.CONNECTION_STRING + config.DB.USAVE_DB);
        break;
      default: break;
    }
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log("Sucessfully connectected to database");
    });
  });
  return res.json(req.query.q);
});

app.get('/api/food', (req, res) => {
  const param = req.query.q;
  if (!param) {
    res.json({
      error: "Missing the parameter to search for"
    });
    return;
  }
  else {
    storeList.map(store => {
        switch (store) {
          case 'truworths':
              console.log('To use the Truworths Model');
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
          case 'usave' :
            //Use another model here to query
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
    });

    }
});
app.listen(app.get('port'), () => {
    console.log(`The server is running at http://localhost:${app.get('port')}`)
});
