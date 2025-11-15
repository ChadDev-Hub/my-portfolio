from db import session, model
from sqlmodel import SQLModel, MetaData
from db.model import Project
import asyncio


db = session.Database()
engine = db.engine

async def create_table():
    db_model = model
    db_session = session.Database()
    await db_session.create_db_and_table()
    await db_session.close()
asyncio.run(create_table())

async def delete_table(table_name:str):
    async with engine.begin() as conn:
        await conn.run_sync(
            lambda sync_con: SQLModel.metadata.tables[table_name].drop(sync_con, checkfirst=True)
        )
    print("table suncessfule drop")
    
# asyncio.run(delete_table("project"))
    