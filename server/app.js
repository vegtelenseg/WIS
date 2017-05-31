let feathers = require('feathers'),
    socketio = require('feathers-socketio'),
    rest = require('feathers-rest'),
    service = require('feathers-mongoose'),
    bodyParser = require('body-parser'),
    config = require('./config/constants.json'),
    Product = require('./models/Product.Model.js'),
    mongo = require('mongod'),
    mongoose = require('mongoose'),
    db = mongoose.connect(config.DB.CONNECTION_STRING, config.DB.CONNECTION_OPTS);

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

app.use('/api/food', service({Model: Product}));
app.get('/api/find-store', (req, res) => {
  console.log("In the server. Searching for store: " + req.query.q);
  return res.json(req.query.q);
})
/*app.get('/api/food', (req, res) => {
  const param = req.query.q;
  if (!param) {
    res.json({
      error: "Missing the parameter to search for"
    });
    return;
  }
  else {
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
    }
});*/
app.listen(app.get('port'), () => {
    console.log(`The server is running at http://localhost:${app.get('port')}`)
});
