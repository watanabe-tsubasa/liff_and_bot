# Project Overview

This project is a LINE Bot and LIFF (LINE Front-end Framework) application built with TypeScript, Hono, and the LINE Bot SDK.

The application serves a simple LIFF application and has a webhook endpoint to receive messages from the LINE platform.

## Key Technologies

*   **TypeScript:** The primary programming language.
*   **Hono:** A fast, lightweight, and simple web framework for Node.js.
*   **LINE Bot SDK:** For interacting with the LINE Messaging API.
*   **LIFF (LINE Front-end Framework):** For creating web applications that run within the LINE app.

## Project Structure

*   `src/index.ts`: The main entry point of the application. It sets up the Hono server and defines the routes.
*   `src/static/index.html`: A simple HTML page that is served as the LIFF application.
*   `src/replyAction/action.ts`: Contains the logic for replying to messages from the LINE bot.
*   `package.json`: Defines the project's dependencies and scripts.
*   `tsconfig.json`: The configuration file for the TypeScript compiler.

# Building and Running

## Development

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the server on `http://localhost:3000` and automatically restart it when you make changes to the code.

## Production

To build the application for production, use the following command:

```bash
npm run build
```

This will compile the TypeScript code to JavaScript and output it to the `dist` directory.

To run the application in production, use the following command:

```bash
npm run start
```

# Development Conventions

## Coding Style

The project uses TypeScript and follows standard TypeScript conventions.

## Testing

There are no tests in this project.
