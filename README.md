# AI Interview Question Generator – Frontend

This is the frontend application for the **AI Interview Question Generator**.  
It provides a chat-style interface where users can enter a topic and receive AI-generated interview questions.

The frontend communicates with the Spring Boot backend through REST APIs.

----------------------------------------------------

## Features

- Chat-style interface
- Generate interview questions by topic
- View previously generated question history
- Responsive UI
- Integration with backend REST APIs

----------------------------------------------------

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Fetch API

----------------------------------------------------

## Application Flow

User enters topic  
↓  
Frontend sends API request  
↓  
Spring Boot backend processes request  
↓  
Backend calls Gemini AI  
↓  
Questions generated  
↓  
Questions displayed in chat  
↓  
Saved to database  

----------------------------------------------------

## Pages

### Chat Page

Users enter a topic and generate AI interview questions.

Example:

Input:  
Java

Output:  
1. What is polymorphism?  
2. What is encapsulation?  
3. What is inheritance?  

----------------------------------------------------

### History Page

Displays previously generated interview questions stored in the backend database.

----------------------------------------------------

## Running the Frontend

Clone the repository

git clone https://github.com/YOUR_USERNAME/frontend-repo.git

Navigate to project

cd frontend-repo

Install dependencies

npm install

Start development server

npm run dev

Frontend runs at

http://localhost:5173

----------------------------------------------------

## Backend Connection

Frontend communicates with backend API at

http://localhost:8080

Example API request:

GET /api/generate?topic=Java

----------------------------------------------------

## Future Improvements

- Improved UI animations
- Authentication system
- Save favorite questions
- Deployment to cloud platforms

----------------------------------------------------

## Author

Devi Naga Prasad  
BTech – Mallareddy University