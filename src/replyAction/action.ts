// src/replyAction/action.ts
// リプライアクションを処理するファイルです
// 必要に応じて編集してください

import { messagingApi, type Message, type WebhookEvent } from '@line/bot-sdk'

type ReplyActionParams = {
  client: messagingApi.MessagingApiClient
  events: WebhookEvent[]
}

export const replyAction = async ({
  client,
  events,
}: ReplyActionParams): Promise<void> => {
  const tasks: Promise<unknown>[] = []

  for (const event of events) {
    if (event.type !== 'message') continue
    if (event.message.type !== 'text') continue

    const response: Message = {
      type: 'text',
      text: event.message.text,
    }

    tasks.push(
      client.replyMessage({
        replyToken: event.replyToken,
        messages: [response],
      })
    )
  }

  await Promise.all(tasks)
}
