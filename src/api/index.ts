/* istanbul ignore file */
import getServerAddress from 'get-server-address';
import * as Koa from 'koa';
import reload from 'koa-reload-middleware';

const PORT = 8090;

const app = new Koa()
  .use(reload(() => import('./routes')));

const server = app
  .listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.info(`Listening on ${getServerAddress(server)}`);
  })
  // eslint-disable-next-line no-console
  .on('error', console.info);
