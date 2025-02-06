import fastifyHttpProxy from '@fastify/http-proxy';
import { sleep } from '@trastocker/nodejs-utility-helper';
import fastify from 'fastify';
import ms from 'ms';
import open, { apps } from 'open';

const app = fastify({
  ignoreDuplicateSlashes: true,
  ignoreTrailingSlash: true,
});

// to app-backend-server
app.register(fastifyHttpProxy, {
  upstream: 'http://localhost:8787',
  prefix: '/graphql',
  rewritePrefix: '/graphql',
});

// to app-frontend-server
app.register(fastifyHttpProxy, {
  upstream: 'http://localhost:3000',
  prefix: '/',
  rewritePrefix: '/',
  websocket: true, // for Next.js dev server
});

app.listen({ port: 8080 }, (err) => {
  if (!err) return;

  console.error(err);
  process.exit(1);
});

await (async () => {
  await sleep(ms('5s'));
  await open('http://localhost:8080', {
    app: {
      name: apps.chrome,
    },
  });
})();
