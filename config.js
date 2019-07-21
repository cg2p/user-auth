// config.js
require('dotenv').config(); // this loads the defined variables from .env

const env = process.env.NODE_ENV; // 'dev' or 'test'

const dev = {
 app: {
   port: parseInt(process.env.DEV_APP_PORT) || 3001,
   host: parseInt(process.env.DEV_APP_HOST) || 'localhost'
 },
 db: {
   host: process.env.DEV_DB_HOST || 'localhost',
   port: parseInt(process.env.DEV_DB_PORT) || 27017,
   name: process.env.DEV_DB_NAME || 'dev'
 },
 keys: {
  secretKey: process.env.SECRET_API_KEY_DEV || 'hello'
 }
};
const test = {
 app: {
   port: parseInt(process.env.TEST_APP_PORT) || 3001,
   host: parseInt(process.env.TEST_APP_HOST) || 'localhost'
 },
 db: {
   host: process.env.TEST_DB_HOST || 'localhost',
   port: parseInt(process.env.TEST_DB_PORT) || 27017,
   name: process.env.TEST_DB_NAME || 'test'
 },
 keys: {
  secretKey: process.env.SECRET_API_KEY_TEST
 }
};

 
const config = {
 dev,
 test
};

module.exports = config[env];