from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.pool import NullPool
from dotenv import load_dotenv
from urllib.parse import quote_plus
import os
from contextlib import asynccontextmanager
class Database():
    def __init__(self):
        load_dotenv()
        USER = os.getenv("user")
        PASSWORD = os.getenv("password")
        HOST = os.getenv("host")
        PORT = os.getenv("port")
        DBNAME = os.getenv("dbname")
        self.sql_url = f"postgresql+asyncpg://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}"
        self.engine = create_async_engine(self.sql_url)
        self.async_session = async_sessionmaker(self.engine, class_=AsyncSession, expire_on_commit=False)
        
    async def create_db_and_table(self):
        async with self.engine.begin() as conn:
            await conn.run_sync(SQLModel.metadata.create_all)
            
    async def get_session(self):
        async with self.async_session() as session:
            yield session
    
    async def close(self):
        if self.engine:
            await self.engine.dispose()
    
    