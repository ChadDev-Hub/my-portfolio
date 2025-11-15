from supabase import create_client, Client
import os
from dotenv import load_dotenv
from typing import Optional
import asyncio
class Supa():
    def __init__(self):
       load_dotenv()
       URL = os.getenv("SUPABASEURL")
       API = os.getenv("SUPAAPIKEY")
       if URL and API:
         self.supabase:Client =  create_client(supabase_url=URL,supabase_key=API)

        
    def upload_file(self, file:Optional[bytes], file_content:Optional[str], fname:Optional[str]):
        if file and file_content:
            file_name = f"Projects Image/{fname}"
            bucket_name = "IMAGE STORAGE"
            response = self.supabase.storage.from_(bucket_name).upload(file_name,file,file_options={"content-type":file_content,"upsert":"true"})
            url = self.supabase.storage.from_(bucket_name).get_public_url(file_name)
            return url
        
        