const express = require('express');
const app = express();
const bodyParser = require('body-parser');

module.exports = function (table) {
  var router = require('./routers/drinks')(table);

  app.use( bodyParser.json() )
  app.use( '/drinks', router );
  app.use(function(req, res) {
    res.send('No such path exists');
  });

return app;
}
