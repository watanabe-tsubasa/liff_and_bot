import { messagingApi, middleware } from '@line/bot-sdk';
import { StatusCode } from 'hono/utils/http-status';
import { MiddlewareHandler } from 'hono';
export const lineBotMiddleware = async (c, next) => {
    const config = {
        channelSecret: process.env.CHANNEL_SECRET,
        channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    };
    const client = new messagingApi.MessagingApiClient(config);
    // `middleware` function returns an Express-style middleware
    // So, we need to convert it to Hono-style middleware
    const expressMiddleware = middleware(config);
    // Read raw body and attach a `body` property to satisfy the middleware's Request type
    const rawBody = await c.req.text();
    const req = c.req.raw;
    try {
        req.body = JSON.parse(rawBody);
    }
    catch {
        req.body = rawBody;
    }
    const res = {
        status: (code) => {
            c.status(code);
            return {
                send: (body) => {
                    c.res = new Response(body);
                },
            };
        },
    };
    // This is a hack to use Express-style middleware in Hono
    await new Promise((resolve, reject) => {
        expressMiddleware(req, res, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
    c.set('line-bot-client', client);
    await next();
};
