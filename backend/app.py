import os
from typing import List, Dict
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not set")

client = Groq(api_key=GROQ_API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    message: str
    conversation_id: str
    role: str = "user"


class Conversation:
    def __init__(self):
        self.messages: List[Dict[str, str]] = [
            {"role": "system", "content": "You are a helpful assistant."}
        ]
        self.active = True


conversations: Dict[str, Conversation] = {}


def get_or_create_conversation(conversation_id: str) -> Conversation:
    if conversation_id not in conversations:
        conversations[conversation_id] = Conversation()
    return conversations[conversation_id]


def query_groq_api(conversation: Conversation) -> str:
    try:
        stream = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=conversation.messages,
            temperature=1,
            max_completion_tokens=1024,
            stream=True,
        )

        response = ""
        for chunk in stream:
            if (
                chunk.choices
                and chunk.choices[0].delta
                and chunk.choices[0].delta.content
            ):
                response += chunk.choices[0].delta.content

        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat/")
async def chat(input: UserInput):
    conversation = get_or_create_conversation(input.conversation_id)

    if not conversation.active:
        raise HTTPException(status_code=400, detail="Conversation inactive")

    conversation.messages.append(
        {"role": input.role, "content": input.message}
    )

    response = query_groq_api(conversation)

    conversation.messages.append(
        {"role": "assistant", "content": response}
    )

    return {
        "conversation_id": input.conversation_id,
        "response": response,
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
