import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import Router from 'koa-router';

import { setupRoutes } from './routes';

const api = new Koa();
const router = new Router();

setupRoutes(router);

api
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(koaLogger());

export default api;
