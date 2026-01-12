🛰 TWIX-AI-ASSISTANT

TWIX AI is a full-stack AI chatbot application built to demonstrate clean frontend-backend integration with a modern UI and an LLM-powered backend.

The project focuses on practical system design, API clarity, and a responsive user experience.

---

## Overview

The application allows users to interact with an AI assistant through a chat interface.
The frontend handles presentation and user interaction, while the backend manages conversation context and communicates with the Groq LLM API.

---

## Key Features

* Real-time AI chat responses
* Conversation-based context handling
* Clean, responsive UI with animated branding
* REST API built using FastAPI
* Clear separation between frontend and backend

---

## Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* JavaScript (ES6+)

### Backend

* FastAPI
* Groq LLM API
* Python
* Uvicorn

---

## High-Level Architecture

```
User → React Frontend → FastAPI Backend → Groq LLM
```

* The frontend sends user messages to the backend
* The backend maintains conversation state in memory
* Conversation history is forwarded to the LLM
* The generated response is returned to the frontend

---

## Backend Summary

* FastAPI provides a single `/chat/` endpoint
* Requests are validated using Pydantic models
* Conversations are tracked using a `conversation_id`
* LLM responses are streamed and aggregated before returning
* Configuration is handled securely via environment variables

This design keeps the frontend stateless and allows multiple parallel conversations.

---

## Frontend Summary

* Responsive chat interface built with Tailwind CSS
* Animated chatbot logo for branding (TWIX-CHATBOT)
* Auto-scrolling chat window
* Loading indicators for AI responses
* Clean separation of UI and API logic

---

## Setup Instructions

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoint

### POST `/chat/`

```json
{
  "message": "Hello",
  "conversation_id": "12345"
}
```

Returns an AI-generated response while preserving conversation context.

---

## Future Improvements

* Persistent storage for conversations
* Streaming responses to frontend
* Authentication and user sessions
* Deployment-ready configuration
* UI enhancements and accessibility improvements

---

## Purpose

This project is intended to demonstrate:

* Full-stack application structure
* LLM integration using a production-ready API
* Clean frontend-backend communication
* Practical UI/UX decisions for AI applications

---
___
