from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.home import home_router
from .db import session, model
from starlette.applications import Starlette
import os
from dotenv import load_dotenv


load_dotenv()
baseUrl = os.getenv("CORS_ORIGIN", "")

app = FastAPI()

origins = [baseUrl]
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=[baseUrl],  # for development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(home_router)

