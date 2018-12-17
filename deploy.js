//Install express server
const express = require('express');
var mainRouter = express.Router();
const apiRouter = require('./backend/routes/routers/mainRouter');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/frontend/dist'));


mainRouter.use('/api', apiRouter);

mainRouter.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/frontend/dist/index.html'));
});

app.use(mainRouter);

// Start the app by listening on the default Heroku port
console.log("Server & Client is served on 8080");
app.listen(process.env.PORT || 8080);

