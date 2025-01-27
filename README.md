# JobPortal-App
This project is a web app with a FastAPI backend and React frontend. The backend provides RESTful APIs for managing job data, while the frontend displays job listings and details. Features include efficient API handling, a responsive UI, and seamless integration. Designed for scalability with setup and deployment instructions in the README.



#Project Overview
This project consists of:
1. Frontend: A React-based interface for displaying and interacting with job listings.
2. Backend: A FastAPI-based API for managing job data stored in jobs.json.

#Project Setup Instructions

#Backend Setup
1. pip install fastapi uvicorn
2. uvicorn main:app --reload --host 127.0.0.1 --port 8000

#Frontend Setup
1. npm install
2. npm run dev

#Deployment Ready
A: Deploy Together
* Bundle the frontend build into the backend using frontend proxy server.
* Deploy the combined app on a single server (e.g., AWS).
  
Option B: Deploy Separately
* Build the production files (npm run build)
* Deploy the frontend (e.g., Netlify, Vercel).
* Deploy the backend (e.g., AWS EC2, DigitalOcean, Render).
* Ensure the frontend makes API calls to the backend’s deployed URL.

Index Page
![Screenshot 2025-01-27 at 12 11 14 AM](https://github.com/user-attachments/assets/82380e30-5671-4a9c-aea1-0cf5577304e3)

Details Page
![Screenshot 2025-01-27 at 12 11 23 AM](https://github.com/user-attachments/assets/8a54f3f4-6af5-452d-ba67-499ceedf7796)

