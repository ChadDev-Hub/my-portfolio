from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
class Database():
    def __init__(self):
        self.sql_url = "postgresql+asyncpg://postgres:admin123@localhost/myportfolio"
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
    
    