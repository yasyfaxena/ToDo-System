# TaskFlow

A simple full-stack Todo application built as part of a technical assessment.

## Tech Stack

### Frontend
- React + Vite
- TanStack Query
- Tailwind CSS
- Axios
- Zustand

### Backend
- Express.js
- Prisma
- PostgreSQL
- Awilix
- Zod
- Helmet
- Pino
- Supertest
- Swagger/OpenAPI
- JWT Authentication

## Features

- User registration and login
- JWT authentication
- Create, view, update, and delete todos
- User-based todo ownership
- Request validation with Zod
- Centralized error handling
- API logging with Pino
- API documentation with Swagger
- AI Assistant for productivity and todo-related questions

## Architecture

```text
Frontend (React)
        ↓
     Axios
        ↓
Backend (Express)
        ↓
Router
        ↓
Authentication & Validation
        ↓
Controller
        ↓
Service
        ↓
Repository
        ↓
Prisma
        ↓
PostgreSQL
