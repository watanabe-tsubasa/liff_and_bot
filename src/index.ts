// index.ts
// このファイルは触らなくてオッケーです

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { replyAction } from './replyAction/action.ts'
import { serveStatic } from '@hono/node-server/serve-static'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import 'dotenv/config'
import { type WebhookEvent } from '@line/bot-sdk'
import { signatureAndCreateClient } from './signatureAndCreateClient.ts'

const app = new Hono()
const STATIC_ROOT = './src/static'

app.get('/', (c) => c.text('Hello Hono!'))
app.get('/static', async (c) => {
  const html = await readFile(join(STATIC_ROOT, 'index.html'), 'utf-8')

  return c.html(
    html.replace(
      '</head>',
      `
      <script>
        window.__ENV__ = {
          LIFF_ID: "${process.env.LIFF_ID ?? ''}"
        }
      </script>
      </head>
      `
    )
  )
})
app.use('/static/*', serveStatic({ root: STATIC_ROOT }))
app.post('/webhook', async (c) => {
  const result = await signatureAndCreateClient(c)
  if (!result.ok) {
    return result.response
  }
  const body = JSON.parse(result.bodyText)
  const events = body.events as WebhookEvent[]
  await replyAction({ client: result.client, events})
  return c.json({ success: true })
})

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`listening on http://localhost:${info.port}`)
  },
)
