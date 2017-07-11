let bodyParser = require('body-parser');

let app = require('express')()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true})),
    config = require('./config/constants.json'),
    Product = require('./models/Product.Model.js'),
    mongo = require('mongod'),
    mongoose = require('mongoose'),
    storeList = [],
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    firebase = require('firebase'),
    firebaseMiddleware = require('express-firebase-middleware');
    app.use('/api', firebaseMiddleware.auth);
      require('firebase/auth');
      // Initialize Firebase for the application
      var baseConfig = {
        apiKey: "AIzaSyCOCVzBz1ixPxBmXDJTziQ_vRB62pEQsmw",
        authDomain: "foodspy-a3640.firebaseapp.com",
        databaseURL: "https://foodspy-a3640.firebaseio.com",
        projectId: "foodspy-a3640",
        storageBucket: "foodspy-a3640.appspot.com",
        messagingSenderId: "509953319531"
      };
      firebase.initializeApp(baseConfig);
      var admin = require("firebase-admin");

      // Fetch the service account key JSON file contents
      var serviceAccount = require("./config/foodspy-fa40e85ea7b6.json");

      // Initialize the app with a service account, granting admin privileges
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://foodspy-a3640.firebaseio.com"
      });

      // As an admin, the app has access to read and write all data, regardless of Security Rules
      var db = admin.database();
      var ref = db.ref("/");
      ref.once("value", function(snapshot) {
        console.log(snapshot.val());
      });
      ref.orderByChild("productCheckoutRate").on("child_changed", function(snapshot) {
        console.log("The snapshot changed dude: " + JSON.stringify(snapshot.val().productCheckoutRate));
      });
mongoose.Promise = global.Promise;

app.set('port', (process.env.PORT || config.SERVER.PORT));

if (process.env.NODE_ENV === config.ENV.PROD) {
  app.use(express.static('src/build'));
}

app.get('/api/find-store', (req, res) => {
  const store = req.query.q.toLowerCase();
  storeList = [];
  storeList.push(store);
  //reconnectToDB(store)
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
        watcher = mongoWatch(config.DB.CONNECTION_STRING + config.DB.USAVE_DB, config.DB.CONNECTION_OPTS);
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

app.use('/api/food', (req, res) => {

  /*const param = req.query.q;
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
    }*/
});


/*app.listen(app.get('port'), () => {
});*/
server.listen(config.SERVER.PORT, () => {
  console.log(`The server is running at http://localhost:${config.SERVER.PORT}`)
});
io.sockets.on('connection', function(client){
  console.log("Successfully connected to the server via socket transport :)");
  client.emit('news', {hello: 'yo yo yo'});
  client.on('disconnect', function(){
    console.log("Disconnecting socket from the server");
  });
});
