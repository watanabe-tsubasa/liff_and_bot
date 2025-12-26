import { Message, messagingApi, WebhookEvent } from '@line/bot-sdk';
import { Context } from 'hono';
export const replyAction = async (c) => {
    const client = c.get('line-bot-client');
    const body = await c.req.json();
    const events = body.events;
    for (const event of events) {
        if (event.type === 'message' && event.message.type === 'text') {
            const { replyToken } = event;
            const { text } = event.message;
            const response = {
                type: 'text',
                text: text,
            };
            await client.replyMessage({
                replyToken,
                messages: [response]
            });
        }
    }
    return c.json({ success: true });
};
