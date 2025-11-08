from typing import Annotated
from sqlmodel import Field, SQLModel, create_engine, select, Text, LargeBinary, Integer, Relationship, Date
from typing import Optional
from datetime import date

# Profile Class
class Profile(SQLModel, table = True):
    id: Optional[int] = Field(default=None, sa_type=Integer, primary_key=True)
    name: str = Field(default=None, sa_type=Text, unique=True, index=True, nullable=True)
    about: Optional[str] = Field(default=None, sa_type=Text,  nullable=True)
    summary: Optional[str] = Field(default=None,sa_type=Text,  nullable=True)
    content: Optional[str] = Field(default=None, sa_type=Text,  nullable=True)
    profilepic: Optional[bytes] = Field(default=None, sa_type=LargeBinary, nullable=True)
    contact: list["Contact"] = Relationship(back_populates="profile", cascade_delete=True)
    project: list["Project"] = Relationship(back_populates="profile", cascade_delete=True)
    education: list["Education"] = Relationship(back_populates="profile", cascade_delete=True)
    works: list["Works"] = Relationship(back_populates="profile", cascade_delete=True)
    skills: list["Skills"] = Relationship(back_populates="profile", cascade_delete=True)
    interests: list["Interests"] = Relationship(back_populates="profile", cascade_delete=True)
    lang: list["Lang"] = Relationship(back_populates="profile", cascade_delete=True)
    
class Project(SQLModel, table = True):
    id: Optional[int] = Field(default=None, sa_type=Integer, primary_key=True)
    user_id: Optional[int] = Field(default=None, sa_type=Integer, foreign_key="profile.id")
    title: str = Field(default=None, unique=True, sa_type=Text, index=True)
    content: Optional[str] = Field(default=None, sa_type=Text, index=True)
    url: Optional[str] = Field(default=None, sa_type=Text, index=True)
    image: Optional[bytes] | None = Field(default=None, sa_type= LargeBinary, index=True)
    profile: Optional[Profile] = Relationship(back_populates="project")
    
class Contact(SQLModel, table = True):
    id: Optional[int] = Field(default=None, sa_type=Integer, primary_key=True)
    user_id:int = Field(default=None, sa_type=Integer, unique=True, foreign_key="profile.id")
    barangay:str = Field(default=None, sa_type=Text)
    city:Optional[str] = Field(default=None, sa_type=Text)
    email:Optional[str] = Field(default=None, sa_type=Text)
    mobile:Optional[str] = Field(default=None, sa_type=Text)
    profile: Optional[Profile] = Relationship(back_populates="contact")
    
class Education(SQLModel, table=True):
    id: Optional[int] = Field(default= None, sa_type=Integer, primary_key=True)
    user_id: Optional[int] = Field(default=None, sa_type=Integer, foreign_key="profile.id")
    school: str = Field(default=None, sa_type=Text)
    school_address: Optional[str] = Field(default=None, sa_type=Text)
    course: Optional[str] = Field(default=None, sa_type=Text)
    year: Optional[str] = Field(default=None, sa_type=Text)
    date_started: Optional[date] = Field(default=None, sa_type=Date)
    date_graduated: Optional[date] = Field(default=None, sa_type=Date)
    profile: Optional[Profile] = Relationship(back_populates="education")

class Works(SQLModel, table= True):
    id: Optional[int] = Field(default=None, sa_type=Integer, primary_key=True)
    user_id: Optional[int] = Field(default=None, sa_type=Integer, foreign_key="profile.id")
    company_name: str = Field(default=None, sa_type=Text)
    position: Optional[str] = Field(default=None, unique=True, sa_type=Text)
    company_address: Optional[str] = Field(default=None, sa_type=Text)
    date_hired: Optional[date] = Field(default=None, sa_type=Date)
    date_end: Optional[date] = Field(default=None, sa_type=Date)
    profile: Optional[Profile] = Relationship(back_populates="works")
    duties : list["Duties"] = Relationship(back_populates="works")
    

class Duties(SQLModel, table=True):
    id: Optional[int] = Field(default=None,sa_type=Integer,primary_key=True)
    work_id: Optional[int] = Field(default=None, sa_type=Integer, foreign_key="works.id")
    duties: str = Field(default=None, unique=True,sa_type=Text)
    works: Optional[Works] = Relationship(back_populates="duties")

class Skills(SQLModel, table=True):
    id: Optional[int] = Field(default=None,sa_type=Integer, primary_key=True)
    user_id: Optional[int] = Field(default=None, sa_type=Integer, foreign_key="profile.id")
    skill: str = Field(default=None,unique=True, sa_type=Text)
    proficiency: Optional[int] = Field(default=None, sa_type=Integer)
    category: Optional[str] = Field(default=None, sa_type=Text)
    profile: Optional[Profile] = Relationship(back_populates="skills")

class Lang(SQLModel, table=True):
    id: Optional[int] = Field(default=None, sa_type=Integer, primary_key=True)
    user_id: Optional[int] = Field(default=None, sa_type=Integer, foreign_key="profile.id")
    language: Optional[str] = Field(default=None, unique=True, sa_type=Text)
    proficiency: Optional[int] = Field(default=None, sa_type=Integer)
    profile: Optional[Profile] = Relationship(back_populates="lang")


class Interests(SQLModel, table=True):
    id: Optional[int] = Field(default=None, sa_type=Integer, primary_key=True)
    user_id: Optional[int] = Field(default=None, sa_type=Integer, foreign_key="profile.id")
    interests: str = Field(default=None,unique=True, sa_type=Text)
    proficiency: Optional[int] = Field(default=None, sa_type=Integer)
    profile: Optional[Profile] = Relationship(back_populates="interests")
    
    
    

