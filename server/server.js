import path from 'path';
import express from 'express';
import helmet from 'helmet';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import { handleSSR } from './handleSSR.js';
// import { handleCSR } from './handleCSR.js';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');
const wpClient = config[0];

const isDevelopment = process.env.NODE_ENV !== "production";


const { env } = require('../config');

require('./setup').setup();

const app = express();

const router = express.Router();

router.use(helmet());
router.use(responseTime());
router.use(cors());
router.use(cookieParser());


if(isDevelopment){

  wpClient.mode = "development";

  const compiler = webpack(wpClient);
  
  //Enable "webpack-dev-middleware"
  app.use(webpackDevMiddleware(compiler, {
    publicPath: wpClient.output.publicPath,
    serverSideRender: true,
  }));
  
  //Enable "webpack-hot-middleware"
  app.use(webpackHotMiddleware(compiler, {
    'heartbeat' : 10 * 1000
  }));
}

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(
  bodyParser.json({
    limit: '5mb',
  })
);

app.engine(
  'html',
  handlebars({
    helpers: {
      toJson: object => JSON.stringify(object),
    },
  })
);
app.set('view engine', 'html');

router.use(
  express.static(path.join(__dirname, '../', 'dist/build'), {
    redirect: false,
  })
);
router.use(
  express.static(path.join(__dirname, '../', 'assets'), {
    redirect: false,
  })
);


require('./routes')(router);

console.log(env.SERVER_RENDERED, "env.SERVER_RENDERED nih cuy")
router.use('/', handleSSR);

app.use(router);

app.shutdown = () => {
  require('./setup').teardown(); // eslint-disable-line global-require
};

module.exports = {
  app,
};
