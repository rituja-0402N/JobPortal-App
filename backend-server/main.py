from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import pathlib
from schema import Job
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

job_list = []
app = FastAPI()

# Define the allowed origins
origins = [
    "http://localhost:3000",  # Frontend origin
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,  # Allow credentials like cookies
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.on_event("startup")
async def startup():
    datapath = pathlib.Path() / 'jobs.json'
    if not datapath.exists():
        raise FileNotFoundError(f"{datapath} not found.")
    try:
        with open(datapath, 'r') as f:
            jobs = json.load(f)
            for job in jobs:
                job_list.append(Job(**job).dict())  # Validate and add to list
     
    except json.JSONDecodeError as e:
        raise ValueError(f"Error decoding JSON: {e}")
    except Exception as e:
        raise RuntimeError(f"Error loading jobs: {e}")

@app.get("/jobs")
async def get_jobs():
    if not job_list:
        raise HTTPException(status_code=404, detail="No jobs available")
    return {"jobs": job_list}
    
@app.get("/jobs/{job_id}")
async def get_job_by_id(job_id: int):
    for job in job_list:
        if job["id"] == job_id:
            print(job,"job.location")
            return(job)
            

    raise HTTPException(status_code=404, detail="Job not found")


if __name__ == "main__":
    app.run(debug=true,port=8000)
