import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import retry from 'async-retry';
import routes from './routes';

async function getConnection() {
  try {
    return await createConnection();
  } catch (e) {
    throw e;
  }
}

(async () => {
  try {
    await retry(getConnection);
  } catch (e) {
    console.error(e);
  }

  const app = express();
  app.use(bodyParser.json());

  app.use(routes);

  app.listen(3000);
})();
