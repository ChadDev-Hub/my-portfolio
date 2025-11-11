from fastapi import APIRouter, Depends, Form, UploadFile, File
from fastapi.exceptions import HTTPException
from sqlmodel import cast, Integer, select , asc, desc, func, text
from sqlalchemy.dialects.postgresql import insert
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from typing import Annotated
import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from typing import Annotated
from datetime import datetime
import os
import base64
from ..db.session import Database
from ..db.model import Profile, Contact, Education, Works, Skills, Interests, Duties, Lang, Tools
from typing import Optional
from contextlib import asynccontextmanager


load_dotenv()
home_router = APIRouter()
db = Database()
        
async def send_email(subject, body, image:Optional[bytes], sender, recipient, password):
    msg = MIMEMultipart()
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To']=recipient
    
    body = MIMEText(body)
    msg.attach(body)

    if image:
        msg.attach(MIMEImage(image))
    
    
    
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
        smtp_server.login(sender, password)
        smtp_server.send_message(msg)
    


def greet():
    time_now = datetime.now().strftime("%H")
    if isinstance(time_now, str):
        time_now = int(time_now.replace("0","") or "0")
    else:
        time_now = int(time_now)
    
    if time_now <= 9:
        greetings = "Good Morning 🌅"
    elif time_now > 9 and time_now <= 12:
        greetings = "Good Noon ☀️"
    elif time_now > 12 and time_now <= 17:
        greetings = "Good Afternoon 🕑"
    else:
        greetings = "Good Evening 🌃" 
    return {
        "greeting": greetings
    }

@home_router.post("/create_profile")
async def create_profile( 
                         name: Annotated[str, Form()],
                         about: Annotated[str, Form()],
                         summary: Annotated[str, Form()],
                         content: Annotated[str, Form()],
                         profile: UploadFile = File(None),
                         session:AsyncSession = Depends(db.get_session)):
# Inserting Data into Database
    image = await profile.read()
    stmt = insert(Profile).values({
        "name": name,
        "about": about,
        "summary": summary,
        "content": content,
        "profilepic": image
    })
    upsert_stmt = stmt.on_conflict_do_update(
        index_elements=[Profile.name],
        set_={
        "about": stmt.excluded.about,
        "summary": stmt.excluded.summary,
        "content": stmt.excluded.content,
        "profilepic": stmt.excluded.profilepic
        }
    )
    
    await session.execute(upsert_stmt)
    await session.commit()
    
    return JSONResponse({
        "status": "successfull"
    })

# create contact for the user
@home_router.post("/create_profile/contact")
async def create_contact(name: str = Form(),
                         barangay:str = Form(),
                         city:str =Form(),
                         email:str = Form(),
                         mobile:str = Form(),
                         session: AsyncSession = Depends(db.get_session)):
    stmt = select(Profile.id).where(Profile.name == name)
    result = await session.execute(stmt)
    user_id  = result.scalar_one()
    if not user_id:
        raise HTTPException(status_code=404, detail="Profile not found")
  
    insert_stmt = insert(Contact).values({
        "user_id": user_id,
        "barangay": barangay,
        "city": city,
        "email": email,
        "mobile": mobile
    }).on_conflict_do_update(
    index_elements=["user_id"],
    set_={
        "barangay": barangay,
        "city": city,
        "email": email,
        "mobile": mobile
    })
    
    await session.execute(insert_stmt)
    await session.commit()
    
    
    return JSONResponse({
        "status": "Successfuly added Contact",
        "data" : {
          "user_id" : user_id,
          "barangay": barangay,
          "city": city,
          "email": email,
          "mobile": mobile
        }
    })
    

# create Education data
@home_router.post("/create_profile/education")
async def create_education(
    name:str =  Form(),
    school:str = Form(),
    school_address:str = Form(),
    course:str = Form(),
    year:str = Form(),
    datestarted: str = Form(),
    dategraduated: str = Form(),
    session: AsyncSession = Depends(db.get_session)):
    
    datestart = datetime.strptime(datestarted,"%m-%d-%Y").date()
    dategrad = datetime.strptime(dategraduated,"%m-%d-%Y").date()
    
    stmt = select(Profile.id).where(Profile.name == name)
    data = await session.scalar(stmt)
    
    if not data:
        return HTTPException(404, "Item not Found")
    
    insert_stmt = insert(Education).values({
        "user_id": data,
        "school" : school,
        "school_address" : school_address,
        "course" : course,
        "year" : year,
        "date_started" : datestart,
        "date_graduated" : dategrad})
    await session.execute(insert_stmt)
    await session.commit()
    
    
    return JSONResponse({
        "status": "Upsert Successfull",
        "school" : school,
        "school_address" : school_address,
        "course" : course,
        "year" : year,
        "datestarted" : datestart.strftime("%m-%d-%Y"),
        "dategraduated" : dategrad.strftime("%m-%d-%Y")
    })


# create work Experience
@home_router.post("/create_profile/work")
async def create_works(name:str = Form(...),
                       compname:str = Form(),
                       position:str = Form(),
                       companyaddress:str = Form(),
                       datehired:str = Form(),
                       dateend:str = Form(),
                       session:AsyncSession = Depends(db.get_session)):
    stmt = select(Profile.id).where(Profile.name == name)
    user_id = await session.scalar(stmt)
    if not user_id:
        return HTTPException(404, "Item not found")
    insert_stmt = insert(Works).values({
        "company_name" : compname,
        "user_id": user_id,
        "position": position,
        "company_address": companyaddress,
        "date_hired": datetime.strptime(datehired,"%m-%d-%Y").date(),
        "date_end": datetime.strptime(dateend, "%m-%d-%Y").date()
    })
    await session.execute(insert_stmt)
    await session.commit()
   
    
    return JSONResponse({
        "status" : "INSERT COMPLETED",
        "user_id": user_id,
        "company_name" : compname,
        "position": position,
        "company_address": companyaddress,
        "date_hired": datehired,
        "date_end": dateend
    })



# create duties
@home_router.post("/create_profile/duties")
async def create_duties(workname:str= Form(),company:str =Form(), duty:str = Form(), session:AsyncSession = Depends(db.get_session)):
    stmt = select(Works.id).where(Works.position == workname and Works.company_name == company)
    query = await session.execute(stmt)
    work_id = query.scalar()
    if not work_id:
        return HTTPException(404, "Item not found")
    upsert_statement = insert(Duties).values({
        "work_id": work_id,
        "duties": duty
    }).on_conflict_do_update(
        index_elements=["duties"],
        set_={
            "work_id": work_id,
            "duties": duty
        }
    )
    await session.execute(upsert_statement)
    await session.commit()
    
    return JSONResponse({
        "status": "UPSERT COMPLETED",
        "work_id": work_id,
        "duties": duty
    })

# create skills
@home_router.post("/create_profile/skills")
async def create_skills(session:AsyncSession = Depends(db.get_session),
                        name:str = Form(),
                        skill:str = Form(),
                        profeciency:int = Form(),
                        category:str = Form()):
    stmt = select(Profile.id).where(Profile.name == name)
    data = await session.scalar(stmt)
    if not data:
        return HTTPException(status_code=404, detail="Item not Found")
    
    insert_stmt = insert(Skills).values({
        "user_id": data,
        "skill": skill,
        "proficiency" : profeciency,
        "category": category
        
    }).on_conflict_do_update(
        index_elements=[Skills.skill],
        set_={
            "user_id": data,
            "proficiency" : profeciency,
            "category": category
        }
    )
    
    await session.execute(insert_stmt)
    await session.commit()
    
    
    return JSONResponse({
        "status": "INSERT SUCCESSFUL",
        "user_id": data,
        "skill": skill,
        "proficiency" : profeciency,
        "category": category
    })
    
# CREATE LANGUAGE
@home_router.post("/create_profile/language")
async def create_language(session:AsyncSession = Depends(db.get_session), user:str = Form(), lang:str = Form(), prof:int = Form()):
    print(lang)
    stmt = select(Profile.id).where(Profile.name == user)
    query = await session.execute(stmt)
    user_id = query.scalar()
    if not user_id:
        return HTTPException(404,"Item not Found")
    upsert_stmt = insert(Lang).values({
        "user_id": user_id,
        "language": lang,
        "proficiency": prof
    }).on_conflict_do_update(
        index_elements=["language"],
        set_={
            "proficiency": prof
        },
        where= (Lang.user_id == user_id)
    )
    await session.execute(upsert_stmt)
    await session.commit()
   
    
    return JSONResponse({
        "user_id": user_id,
        "language": lang,
        "proficiency": prof
    })
    
# CREATE INTERESTS
@home_router.post("/create_profile/interests")
async def create_interests(session:AsyncSession=Depends(db.get_session),
                           user:str = Form(),
                           interests:str = Form(),
                           prof:int = Form(),
                           content:str = Form(),
                           image:UploadFile = File(None)):
    stmt = select(Profile.id).where(Profile.name == user)
    query = await session.execute(stmt)
    image_data = await image.read()
    user_id = query.scalar()
    if not user_id:
        return HTTPException(404, "Item not Found")
    upsert_stmt = insert(Interests).values({
        "user_id": user_id,
        "interests": interests,
        "proficiency": prof,
        "content": content,
        "image": image_data
    }).on_conflict_do_update(
        index_elements=[Interests.interests],
        set_={
            "user_id": user_id,
            "proficiency": prof,
            "content": content,
            "image": image_data
        },
        where= (Interests.user_id == user_id)
    )
    
    await session.execute(upsert_stmt)
    await session.commit()
    
    return JSONResponse({
        "status": "UPSERT SUCCESSFULL",
        "user_id": user_id,
        "interests": interests,
        "proficiency": prof,
        "content": content,
        "image": base64.b64encode(image_data).decode("utf-8")
    })
    
#CREATE TOOLS
@home_router.post("/create_profile/tools")
async def create_tools(session:AsyncSession = Depends(db.get_session),
                       user:str = Form(),
                       tool_name:str = Form(),
                       content:str = Form(),
                       proficiency:int = Form(),
                       image:UploadFile = File(None)):
    stmt = select(Profile.id).where(Profile.name == user)
    query = await session.execute(stmt)
    user_id = query.scalar()
    if not user_id:
        return HTTPException(404, "Item not Found")
    image_data = await image.read()
    upsert_stmt = insert(Tools).values({
        "user_id": user_id,
        "tool_name": tool_name,
        "content": content,
        "proficiency": proficiency,
        "image": image_data
    }).on_conflict_do_update(
        index_elements=["tool_name"],
        set_={
            "user_id": user_id,
            "content": content,
            "proficiency": proficiency,
            "image": image_data
        },
        where=(Tools.user_id == user_id)
    )
    await session.execute(upsert_stmt)
    await session.commit()
    return JSONResponse({
        "user_id": user_id,
        "content": content,
        "proficiency": proficiency,
        "image": base64.b64encode(image_data).decode("utf-8")
    })


# fetch resume data
@home_router.get("/profile/resume_data")
async def get_resume_data(user:int, session:AsyncSession = Depends(db.get_session)):
    
    contact_stmt = select(Contact.barangay, Contact.city, Contact.email, Contact.mobile).join(Profile).where(Profile.id == user)
    
    
    education_stmt = select(Education).join(Profile).where(Profile.id == user).order_by(desc(Education.id))
    
    work_stmt =text('''
                select 
                works.user_id,
                works.id,
                works.company_name,
                works.company_address,
                works.position,
                works.date_hired,
                works.date_end,
                ARRAY_agg(duties.duties) as duties from works
                full outer join duties on
                works.id = duties.work_id
                where works.user_id = :user_id
                group by (
                    works.user_id,
                    works.id,
                    works.company_name,
                    works.company_address,
                    works.position,
                    works.date_hired,
                    works.date_end)''')
   
    skills_stmt = select(
        Skills.category,
        func.array_agg(Skills.skill).label("skill"),
        func.array_agg(Skills.proficiency).label("profeciency")).where(Skills.user_id == user).group_by(Skills.category).order_by(Skills.category)
    
    lang_stmt = select(
        Lang.language,
        Lang.proficiency
    ).where(Lang.user_id == user)
    
    interests_stmt = select(
        Interests.interests,
        Interests.proficiency,
        Interests.content,
        Interests.image
    ).where(Interests.user_id == user)
    
    
    tools_stmt = select(
        Tools.tool_name,
        Tools.content,
        Tools.image
        ).where(Tools.user_id == user)
    
    
    # QUERY EXECUTIOn
    contact_result = await session.execute(contact_stmt)
    education_query = await session.execute(education_stmt)
    work_query =  await session.execute(work_stmt,{"user_id": user})
    skills_query = await session.execute(skills_stmt)
    lang_query = await session.execute(lang_stmt)
    interests_query = await session.execute(interests_stmt)
    tools_query = await session.execute(tools_stmt)
    
    
    
    contact_data = contact_result.mappings().all()
    if not contact_data:
        return HTTPException(status_code=404, detail="Contact Data not found")
    

    education_data = education_query.scalars().all()
    if not education_data:
        return HTTPException(404, "Item not found")
    
    
    work_data = work_query.mappings().all()
    if not work_data:
        return HTTPException(404, "Work Data not found")
    
    skill_data = skills_query.mappings().all()
    if not skill_data:
        return HTTPException(404, "Skill Data not found")
    
    lang_data = lang_query.mappings().all()
    if not lang_data:
        return HTTPException(404, "Language Data not found")
    
    interest_data = interests_query.mappings().all()
    if not interest_data:
        return HTTPException(404 , "Interests Data not Found")
    
    tools_data = tools_query.mappings().all()
    if not tools_data:
        return HTTPException(404, "Tools Data not Found")
    
    
    # CONTACT
    contact_response = [{
        "barangay": i.barangay,
        "city": i.city,
        "email": i.email,
        "contact":i.mobile
    } for i in contact_data]
    
    # EDUCATION
    education_response = [{"user_id": item.user_id,
               "school": item.school,
               "course": item.course,
               "address": item.school_address,
               "date_started": item.date_started.strftime("%b %Y") if item.date_started else None,
               "date_graduated": item.date_graduated.strftime("%b %Y") if item.date_graduated else None
               } for item in education_data]
    
    # WORK RESPONSE
    work_response = [{
    "works_id": i['id'],
    "company_name": i['company_name'],
    "company_address": i['company_address'],
    "position": i['position'],
    "date_hired": i['date_hired'].strftime("%b %Y") if i['date_hired'] else None,
    "date_ended":i['date_end'].strftime("%b %Y") if i['date_end'] else None,
    "duties" :[item for item in i['duties'] if item is not None],
                } for i in work_data]
    # SKILL RESPONSE
    skills_response =  [{"category": i['category'],
                  "skills": [{"name": s,
                              "prof": p} for (s,p) in zip(i['skill'],i['profeciency'])]
                  }for i in skill_data]
    # LANGUAGE RESPONSE
    lang_response = [{"language": lan['language'], "proficiency": lan['proficiency']} for lan in lang_data]
    
    # INTERESTS DATA
    interests_response = [{"interest": interst['interests'],
                           "proficiency": interst['proficiency'],
                           "content": interst['content'],
                           "image": base64.b64encode(interst['image']).decode("utf-8")}for interst in interest_data]
    
    # TOOLS DATA
    tools_response = [{"name": tool['tool_name'],
                       "content": tool['content'],
                       "image": base64.b64encode(tool['image']).decode("utf-8")} for tool in tools_data]
    
    return JSONResponse({
        "contact_data": contact_response,
        "education_data": education_response,
        "works_data": work_response,
        "skills_data": skills_response,
        "language_data": lang_response,
        "interests_data": interests_response,
        "tools_data": tools_response
    })
    
    

# fetch data from the database for Landingpage
@home_router.get("/")
async def landing_page(session:AsyncSession =  Depends(db.get_session), greetings:dict = Depends(greet)):
    stmt = select(Profile.name, Profile.about, Profile.summary, Profile.profilepic).order_by(asc(cast(Profile.id, Integer)))
    profile = await session.execute(stmt)
    row = profile.first()
    if row is None:
        return JSONResponse({"message": "Cant Found Profile"})
    name, about, summary, profile = row
    profile_image = base64.b64encode(profile).decode()
    data = {
        "title": "MY PORTFOLIO",
        "name": name,
        "about": about,
        "summary": summary,
        "profile": profile_image,
        "time": greetings['greeting']
    }
    
    return JSONResponse(data)

@home_router.post("/send_email")
async def email(email: Annotated[str , Form()], content: Annotated[str, Form()] , file:UploadFile = File(None)):
    image = None
    if file:
        image = await file.read()
    subject = "Portfolio Message"
    body = f"Email From: {email}\n\n{content}"
    password = os.getenv("GOOGLEPASSWORD")
    replymessage = f"Thank you for messaging. Please wait I'm reviewing your message.\n\nSincerly,\nRichard Rojo"
    await send_email(subject=subject, body=body, sender="richardrojo61@gmail.com",image=image, recipient="richardrojo61@gmail.com", password=password)
    await send_email(subject="Richard Reply",
                     body= replymessage,
                     image=None, recipient=email, sender="richardrojo61@gmail.com", password=password)

        
    
@home_router.get("/home_page")
async def get_data(session:AsyncSession = Depends(db.get_session)):
    stmt = select(Profile.content, Profile.profilepic).order_by(asc(cast(Profile.id, Integer)))
    result = await session.execute(stmt)
    row = result.first()
    if row is None:
        return JSONResponse({"message": "Cant Found Profile"})
    content, profile = row
    image_profile = base64.b64encode(profile).decode('utf-8')
    data = {
        "profile": image_profile,
        "content": content 
    }
    return JSONResponse(data)