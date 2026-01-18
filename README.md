# TWIX-Ai-Assistant

TWIX-Ai-Assistant is an intelligent chatbot application built with React and Vite for the frontend, and Python for the backend. It provides a seamless user interface for interacting with an AI-powered conversational assistant.

## Features

- **Interactive Chat Interface**: Real-time conversation with an AI assistant
- **Modern UI**: Built with React and styled with Tailwind CSS
- **Fast Development**: Powered by Vite for rapid development and hot module replacement
- **Python Backend**: Robust backend API for processing conversations

## Project Structure

```
chatbot/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── __pycache__/
└── frontend/
    └── chatbotui/
        ├── src/
        ├── public/
        ├── package.json
        ├── vite.config.js
        └── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/chatbotui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the Flask app:
   ```bash
   python app.py
   ```

## Build

To build the frontend for production:

```bash
npm run build
```

## License

This project is licensed under the MIT License.
