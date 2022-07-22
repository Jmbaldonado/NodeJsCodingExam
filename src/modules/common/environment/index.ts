import * as dotenv from 'dotenv';
dotenv.config();

const APP_PORT = +process.env.APP_PORT || 3000;
const APP_ENV = process.env.APP_ENV || '';
const APP_VERSION = process.env.APP_VERSION || '0.0.1';

const CORS_ALLOWED_HEADERS =
  process.env.CORS_ALLOWED_HEADERS ||
  'Access-Control-Allow-Headers,Origin,X-Requested-With,Content-Type,Accept,Authorization';
const CORS_EXPOSED_HEADERS = process.env.CORS_EXPOSED_HEADERS || '';
const CORS_WHITELIST = process.env.CORS_WHITELIST || '';

const GRAPHQL_DEPTH_LIMIT: number = +process.env.GRAPHQL_DEPTH_LIMIT || 6;

const ENABLE_GRAPHQL_TRACING = process.env.ENABLE_GRAPHQL_TRACING === 'true';
const ENABLE_MONITORING = process.env.ENABLE_MONITORING === 'true';
export {
  APP_PORT,
  APP_ENV,
  APP_VERSION,
  CORS_ALLOWED_HEADERS,
  CORS_EXPOSED_HEADERS,
  CORS_WHITELIST,
  GRAPHQL_DEPTH_LIMIT,
  ENABLE_GRAPHQL_TRACING,
  ENABLE_MONITORING,
};
