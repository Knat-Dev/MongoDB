var mongoose = require('mongoose');
const nconf = require('nconf');

nconf.argv().env().file('./../server/db/keys.json');
const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const dbPort = nconf.get('mongoPort');


let uri = `mongodb://${user}:${pass}@${host}:${dbPort}`;
if (nconf.get('mongoDatabase')) {
    uri = `${uri}/${nconf.get('mongoDatabase')}`;
}

mongoose.Promise = global.Promise;
mongoose.connect( 'mongodb://knat_ow:dor951753@ds245532.mlab.com:45532/rest-api-test'
    || uri || 'mongodb://' +
    'localhost:27017/TodosApp'  );

module.exports.mongoose = {
    mongoose
};