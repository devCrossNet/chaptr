import * as Express         from 'express';
import { applyMiddlewares } from './middlewares';
import { DemoRoutes }       from './routes/DemoRoutes';
import { StaticRoutes }     from './routes/StaticRoutes';
import { SSRRoutes }        from './routes/SSRRoutes';

export const app: Express.Application = Express();

app.disable('x-powered-by');

applyMiddlewares(app);

/**
 * core routes, don't delete these
 */
DemoRoutes(app);
StaticRoutes(app);
SSRRoutes(app);
