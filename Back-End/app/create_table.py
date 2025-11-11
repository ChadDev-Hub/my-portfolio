from db import session, model
import asyncio
async def create_table():
    db_model = model
    db_session = session.Database()
    await db_session.create_db_and_table()
    await db_session.close()
asyncio.run(create_table())