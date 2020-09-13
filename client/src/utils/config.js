import common from '../config.common.json';
import production from '../config.production.json';
import development from '../config.development.json';

const envConfig = process.env.REACT_APP_ENV === 'production' ?
  production : development;

const config = {
  ...common,
  ...envConfig
};

export default config;
