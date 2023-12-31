import _ from 'lodash';
import path from 'path';
import envalid from 'envalid';
const { str, num, bool } = envalid;

require('dotenv').config({ silent: true });

export const env = envalid.cleanEnv(
  process.env,
  Object.assign(
    {},
    {
      APP_PORT: num({ default: 3000 }),
      NODE_ENV: str({ default: 'development' }),
      SERVER_RENDERED: bool({ default: true }),
      APP_HOST: str({ default: 'http://localhost:' }),
    }
  )
);

export const clientEnv = _.pick(env, ['APP_PORT', 'NODE_ENV']);

export {path}

export default {
  path,
  env,
  clientEnv,
};
