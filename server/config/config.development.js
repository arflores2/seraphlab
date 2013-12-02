var config = require('./config.global');

config.HOST = 'localhost/';

config.PORT.HTTP = '8080'

// paths
config.PUBLIC_PATH = __dirname + '/../../client';

module.exports = config;