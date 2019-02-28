import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import routes from './routes';

(async () => {
  const connection = await createConnection();

  const app = express();
  app.use(bodyParser.json());

  app.use(routes);

  app.listen(3000);
})();
