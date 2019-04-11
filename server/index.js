const restify = require('restify');
const mongoose = require('mongoose');
const corsMiddleware = require('restify-cors-middleware');
const config = require('./config');

const cors = corsMiddleware({
    preflightMaxAge: 5,
    origins: ['*'],
    allowHeaders:['X-App-Version'],
    exposeHeaders:[]
  });

const server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser());

server.listen(config.PORT, ()=>{
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true});
});

const db = mongoose.connection;

db.on('error', err=> console.log(err));

db.once('open', ()=>{
    require('./routes/users')(server);
    require('./routes/socketPlay')(server);
    console.log(`Server started on port ${config.PORT}`);
});