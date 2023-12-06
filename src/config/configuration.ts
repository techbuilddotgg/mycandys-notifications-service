import * as env from 'env-var';
import { Deployment, Env } from '../constants/env.constants';

export default () => ({
  environment: env
    .get('NODE_ENV')
    .required(true)
    .default(Env.PRODUCTION)
    .asEnum(Object.values(Env)),
  deployment: env
    .get('DEPLOYMENT')
    .default(Deployment.DOCKER)
    .asEnum(Object.values(Deployment)),
  app: {
    port: env.get('PORT').default(8000).asPortNumber(),
    swaggerPath: env.get('SWAGGER_PATH').default('').asString(),
  },
  database: {
    uri: env.get('MONGO_URI').required(true).asString(),
  },
  common: {
    urlPrefix: env.get('URL_PREFIX').required(true).default('api').asString(),
  },
});
