# Media Summary Analyzer

A minimal full-stack application that analyzes text by returning a short summary, sentiment score, and word count.

## Project Description

This application provides a simple interface to analyze any text input, generating a summary (first 2 sentences), sentiment score (ranging from -1 to 1), and word count using FastAPI server with TextBlob for natural language processing and a React client with Redux Toolkit for state management.

## Project Structure

```
media-summary-analyzer/
├── client/            # React + Vite + TypeScript + Redux Toolkit
│   ├── src/
│   │   ├── api/       # API client with Axios
│   │   ├── store/     # Redux store and slices
│   │   ├── components/# React components
│   │   ├── pages/     # Page components
│   │   └── types/     # TypeScript types
│   └── package.json
├── server/            # FastAPI application
│   ├── main.py        # FastAPI app with /health and /analyze endpoints
│   └── requirements.txt
└── README.md
```

## Prerequisites

- **Node.js** (v18 or higher) and npm
- **Python** (v3.8 or higher) and pip
- **TextBlob** data (will be downloaded automatically on first use)

## Installation & Setup

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Download TextBlob data (required for sentiment analysis):
   ```bash
   python -m textblob.download_corpora
   ```

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

You'll need to run both the server and client in separate terminals.

### Terminal 1: Server

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Activate your virtual environment (if not already activated):
   ```bash
   source venv/bin/activate  # macOS/Linux
   # or
   venv\Scripts\activate      # Windows
   ```

3. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

   The server will be available at `http://localhost:8000`

   You can verify it's running by visiting:
   - API: `http://localhost:8000/health`
   - API Docs: `http://localhost:8000/docs`

### Terminal 2: Client

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

   The client will be available at `http://localhost:3000`

## Running in Cursor

To run both services in Cursor:

1. **Open two terminal tabs/windows in Cursor**

2. **Terminal 1 - Server:**
   ```bash
   cd media-summary-analyzer/server
   source venv/bin/activate  # or venv\Scripts\activate on Windows
   uvicorn main:app --reload
   ```

3. **Terminal 2 - Client:**
   ```bash
   cd media-summary-analyzer/client
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### GET /health
Returns the health status of the API.

**Response:**
```json
{
  "status": "ok"
}
```

### POST /analyze
Analyzes the provided text and returns summary, sentiment, and word count.

**Request Body:**
```json
{
  "text": "Your text to analyze here..."
}
```

**Response:**
```json
{
  "summary": "First two sentences of the text...",
  "sentiment": 0.456,
  "word_count": 42
}
```

## Technologies Used

### Client
- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Axios** - HTTP client

### Server
- **FastAPI** - Modern Python web framework
- **TextBlob** - Natural language processing library
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## Development

### Client Development
- The client uses Vite for fast HMR (Hot Module Replacement)
- Redux DevTools can be used to inspect state
- TypeScript provides type checking

### Server Development
- FastAPI provides automatic API documentation at `/docs`
- The server runs with auto-reload enabled (`--reload` flag)
- CORS is configured to allow requests from `localhost:3000`

## Troubleshooting

### Server Issues

- **TextBlob errors**: Make sure you've run `python -m textblob.download_corpora`
- **Port already in use**: Change the port in `uvicorn main:app --reload --port 8001`
- **Import errors**: Ensure your virtual environment is activated and dependencies are installed

### Client Issues

- **Connection refused**: Make sure the server is running on port 8000
- **CORS errors**: Verify the server CORS middleware is configured correctly
- **Build errors**: Try deleting `node_modules` and running `npm install` again

## License

This project is open source and available for educational purposes.

