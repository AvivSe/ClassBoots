//Install express server
const express = require('express');
const mainRouter = express.Router();
const apiRouter = require('./backend/routes/routers/mainRouter');
const path = require('path');
const mongoController = require('./backend/controllers/mongoController');
const app = express();
bodyParser = require('body-parser');
/**
 * connect to db
 */
mongoController.connect();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/frontend/dist'));
app.use(bodyParser.json());

mainRouter.use('/api', apiRouter);

mainRouter.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/frontend/dist/index.html'));
});

app.use(mainRouter);

// Start the app by listening on the default Heroku port
var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
    console.log("Listening on Port 3000");
});

