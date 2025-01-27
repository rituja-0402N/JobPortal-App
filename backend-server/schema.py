from pydantic import BaseModel
from typing import List

class Posting(BaseModel):
    id: int
    sitename: str
    duration: int

class Location(BaseModel):
    city: str
    state: str
    country: str

class Job(BaseModel):
    postings: List[Posting]
    id:int
    req_name:str
    description:str
    status:str
    location:dict