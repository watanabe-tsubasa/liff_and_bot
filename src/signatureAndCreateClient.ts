// src/signatureAndCreateClient.ts
// このファイルは触らなくてオッケーです

import { messagingApi, validateSignature } from '@line/bot-sdk'
import { type Context } from 'hono'

type SignatureResult =
  | { ok: true; client: messagingApi.MessagingApiClient; bodyText: string }
  | { ok: false; response: Response }

export const signatureAndCreateClient = async (
  c: Context
): Promise<SignatureResult> => {
  const channelSecret = process.env.CHANNEL_SECRET!
  const channelAccessToken = process.env.CHANNEL_ACCESS_TOKEN!

  const bodyText = await c.req.text()
  const signature = c.req.header('x-line-signature')

  if (!signature) {
    return {
      ok: false,
      response: c.text('Missing signature', 400),
    }
  }

  const isValid = validateSignature(bodyText, channelSecret, signature)

  if (!isValid) {
    return {
      ok: false,
      response: c.text('Invalid signature', 401),
    }
  }

  const client = new messagingApi.MessagingApiClient({
    channelAccessToken,
  })

  return {
    ok: true,
    client,
    bodyText,
  }
}
