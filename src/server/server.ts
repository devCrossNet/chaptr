import * as Express         from 'express';
import { applyMiddlewares } from './middlewares';
import { ChaptrRoutes }     from './routes/ChaptrRoutes';
import { StaticRoutes }     from './routes/StaticRoutes';
import { SSRRoutes }        from './routes/SSRRoutes';

export const app: Express.Application = Express();

app.disable('x-powered-by');

applyMiddlewares(app);

/**
 * routes to demonstrate the possibilities of vuesion
 * can be removed if you don't need them in your application
 */
ChaptrRoutes(app);

/**
 * core routes, don't delete these
 */
StaticRoutes(app);
SSRRoutes(app);
