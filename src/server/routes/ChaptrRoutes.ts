import * as path from 'path';
import * as fs from 'fs';
import * as Express from 'express';
import { Request, Response } from 'express';
import { getIntInRange, ensureDirectoryExists } from '@vuesion/utils/dist';
import request from 'request';

const uploadPath: string = path.resolve(__dirname, '../upload');

export const ChaptrRoutes = (app: Express.Application) => {
  /**
   * http -> https redirect for heroku
   */
  app.get('*', (req: Request, res: Response, next: any) => {
    const host: string = req.headers.host || 'localhost:3000';
    const redirect: string = `https://${host}` + req.url;

    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(redirect);
    } else {
      next();
    }
  });

  app.post('/upload', (req: Request, res: Response) => {
    let filePath: string = null;
    let code: string = null;

    while (filePath === null) {
      code = `${getIntInRange(0, 999999)}`;

      if (fs.existsSync(path.join(uploadPath, `${code}.json`)) === false) {
        filePath = path.join(uploadPath, `${code}.json`);
      }
    }
    ensureDirectoryExists(filePath);
    fs.writeFileSync(filePath, JSON.stringify(req.body), 'utf-8');

    res.status(200).json({ code });
  });

  app.get('/share/:code', (req: Request, res: Response) => {
    const filePath: string = path.join(uploadPath, `${req.params.code}.json`);
    const content: string = JSON.parse(fs.readFileSync(filePath).toString());

    fs.unlinkSync(filePath);

    res.status(200).json({ content });
  });

  app.get('/image-proxy', (req: Request, res: Response) => {
    const url = req.query.url;

    request.get(url).pipe(res);
  });
};
