# Ask Me Anything

"Ask Me Anything" is a real-time web application built using Golang for the backend and React TypeScript for the frontend. The application allows users to create rooms, engage in conversations, discuss topics, and react to them, all connected through WebSockets.

## Project Structure

The project is divided into two main folders:

- `go` - Contains the Golang backend, which manages the server, WebSocket connections, and APIs.
- `web` - Contains the React TypeScript frontend, which handles the user interface and connects to the backend via WebSockets.

## Features

- Create and join rooms for conversation.
- Create topics for discussion within a room.
- React to topics and messages in real time.
- Real-time updates via WebSockets.

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Possanii/react-go-socket.git
cd react-go-socket
```

### Backend (Go - API)

Navigate to the api folder and install dependencies:

```bash
cd go
go mod tidy
```

### Frontend (React TypeScript - Web)

Navigate to the web folder and install dependencies:

```bash
cd web
npm install
```

## Environment Variables

Before running the application, you need to configure your environment variables.

1. Navigate to the `go` folder.
2. Rename the `.env.example` file to `.env`:

   ```bash
   mv .env.example .env
   ```

3. Open the `.env` file and fill in the required environment variables with your specific values.

Make sure to set the necessary values for the application to function correctly, such as database connection strings and other configuration settings.

Replicate the same configuration to your web folder

## Running the Application

### Backend

Start the Go server:

```bash
cd go
go run cmd/src/main.go
```

### Frontend

Start the React application:

```bash
cd web
npm run dev
```

This will run the application in development mode. Open http://localhost:5173 to view it in the browser.

## Usage

Once the application is running, you can:

1. Create a room.
2. Invite others to join the room.
3. Start a conversation by creating topics.
4. React to messages and topics in real time.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
