var express = require('express'),
    app = express(),
    http = require('http'),
    cfg = require('./config');

var server = http.createServer(app);

var DefaultRoutes = require('./routes/Default.js')();

app.configure(function() {
  /* views */
  app.set('view engine', 'jade');
  app.use(express.static(cfg.PUBLIC_PATH));

  /* limit data handled by server */
  app.use(express.limit('1mb'));

  /* parse post parameters */
  app.use(express.bodyParser());
});

app.get('/', DefaultRoutes.index);

server.listen(cfg.PORT.HTTP);
console.log('Listening on port: ', cfg.PORT.HTTP);
