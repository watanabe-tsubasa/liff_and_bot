# requirements.md

index.ts
static/
  index.html
replyAction/
  action.ts

- index.ts
  - hono entry point
    - app.get('/'): health check return hello hono
    - app.get('/static'): static server for static/index.html
    - app.post('/webhook'): line bot server for replyAction/action.ts
- static/index.html
  - static assets for LIFF front end
- replyAction/action.ts
  - reply logic for line messaging api(first write echo bot)
