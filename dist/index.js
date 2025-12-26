import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { lineBotMiddleware } from './line-bot-middleware.ts';
import { replyAction } from './replyAction/action.ts';
import { serveStatic } from '@hono/node-server/serve-static';
const app = new Hono();
app.get('/', (c) => c.text('Hello Hono!'));
app.use('/static/*', serveStatic({ root: './src' }));
app.post('/webhook', lineBotMiddleware, replyAction);
serve({
    fetch: app.fetch,
    port: 3000,
}, (info) => {
    console.log(`listening on http://localhost:${info.port}`);
});
