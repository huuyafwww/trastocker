import fastifyHttpProxy from '@fastify/http-proxy';
import fastify from 'fastify';

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

app.listen({ port: 80 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Reverse proxy is running on ${address}`);
});
