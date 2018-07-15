import * as Express          from 'express';
import { Request, Response } from 'express';
import * as favicon          from 'serve-favicon';
import * as path             from 'path';
import * as fs               from 'fs';
import { serve }             from '../utils/Utils';
import { Logger }            from '../utils/Logger';
import { randomInt }         from '../../app/shared/utils/misc';

const uploadPath: string = path.resolve(__dirname, '../upload');
const ensureDirectoryExistence = (filePath: string) => {
  const dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) {
    return true;
  }

  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

export const StaticRoutes = (app: Express.Application) => {
  app.use('/sw.js', serve('../client/sw.js'));
  app.use('/', serve('../static'));
  app.use('/i18n', serve('../../i18n'));
  app.use('/client', serve('../client'));
  app.use(favicon(path.resolve(__dirname, '../static/logo.png')));
  app.post('/log/error', (req: Request, res: Response) => {
    const err: any = req.body.error;

    Logger.error('error during rendering: %s; error: %s', req.url, JSON.stringify(err, Object.getOwnPropertyNames(err)));

    res.status(200).json({});
  });
  app.post('/upload', (req: Request, res: Response) => {
    let filePath: string = null;
    let code: string = null;

    while (filePath === null) {
      code = `${randomInt(0, 999999)}`;

      if (fs.existsSync(path.join(uploadPath, `${code}.json`)) === false) {
        filePath = path.join(uploadPath, `${code}.json`);
      }
    }
    ensureDirectoryExistence(filePath);
    fs.writeFileSync(filePath, JSON.stringify(req.body), 'utf-8');

    res.status(200).json({ code });
  });
  app.get('/share/:code', (req: Request, res: Response) => {
    const filePath: string = path.join(uploadPath, `${req.params.code}.json`);
    const content: string = JSON.parse(fs.readFileSync(filePath).toString());

    fs.unlinkSync(filePath);

    res.status(200).json({ content });
  });
};
