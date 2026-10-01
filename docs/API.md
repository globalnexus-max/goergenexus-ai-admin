# Goergenexus AI Admin — API Dokumentasiyası

## Base URL
`http://localhost:5000/api`

## Authentication
Bütün xüsusi əndpointlər üçün `Authorization` header-ində JWT token göndərin:
```
Authorization: Bearer {token}
```

---

## 1. Authentication Endpoints

### Register — Qeydiyyat
```
POST /auth/register
Content-Type: application/json

{
  "name": "Aysel Məmmədova",
  "email": "aysel@example.com",
  "password": "password123",
  "grade": "10",
  "role": "student"
}

Response 201:
{
  "message": "User registered",
  "user": {
    "id": 1,
    "name": "Aysel Məmmədova",
    "email": "aysel@example.com",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login — Daxil ol
```
POST /auth/login
Content-Type: application/json

{
  "email": "aysel@example.com",
  "password": "password123"
}

Response 200:
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "Aysel Məmmədova",
    "email": "aysel@example.com",
    "role": "student"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 2. Students Endpoints

### Get All Students (Admin)
```
GET /students
Authorization: Bearer {token}

Response 200:
[
  {
    "id": 1,
    "name": "Aysel Məmmədova",
    "email": "aysel@example.com",
    "grade": "10",
    "created_at": "2026-10-01T10:00:00Z"
  }
]
```

### Get Student Profile
```
GET /students/profile/:id
Authorization: Bearer {token}

Response 200:
{
  "id": 1,
  "name": "Aysel Məmmədova",
  "email": "aysel@example.com",
  "grade": "10",
  "bio": "Riyaziyyatı sevən şagird",
  "avatar_url": "https://...",
  "created_at": "2026-10-01T10:00:00Z"
}
```

### Get Student Progress
```
GET /students/:id/progress
Authorization: Bearer {token}

Response 200:
[
  {
    "id": 1,
    "name": "Riyaziyyat",
    "total_lessons": 10,
    "completed_lessons": 7
  }
]
```

---

## 3. Courses Endpoints

### Get All Courses
```
GET /courses

Response 200:
[
  {
    "id": 1,
    "name": "Riyaziyyat",
    "description": "Riyaziyyat dərsi",
    "grade_level": "9-12",
    "teacher_id": 2,
    "created_at": "2026-10-01T10:00:00Z"
  }
]
```

### Create Course (Teacher/Admin)
```
POST /courses
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Riyaziyyat",
  "description": "Riyaziyyat əsasları",
  "grade_level": "10"
}

Response 201:
{
  "id": 1,
  "name": "Riyaziyyat",
  "description": "Riyaziyyat əsasları",
  "grade_level": "10",
  "teacher_id": 2,
  "created_at": "2026-10-01T10:00:00Z"
}
```

---

## 4. AI Endpoints

### Ask AI Tutor
```
POST /ai/ask
Authorization: Bearer {token}
Content-Type: application/json

{
  "question": "Kvadrat tənliyin kökləri nədir?",
  "context": "Riyaziyyat dərsi"
}

Response 200:
{
  "answer": "Kvadrat tənlik ax²+bx+c=0 şəklində olur. Kökləri tapmaq üçün..."
}
```

### Generate Quiz
```
POST /ai/generate-quiz
Authorization: Bearer {token}
Content-Type: application/json

{
  "topic": "Biologiya - Hüceyrə",
  "difficulty": "medium",
  "questionCount": 5
}

Response 200:
{
  "questions": [
    {
      "question": "Hüceyrənin mərkəzi orqanı nədir?",
      "options": ["Nukleus", "Mitoxondrion", "Xloroplast", "Ribosoma"],
      "correct": 0,
      "explanation": "Nukleus hüceyrənin mərkəzi orqanıdır..."
    }
  ]
}
```

### Generate Lesson Plan
```
POST /ai/lesson-plan
Authorization: Bearer {token}
Content-Type: application/json

{
  "topic": "İngilis Dili - Past Tense",
  "grade": "10",
  "duration": 45
}

Response 200:
{
  "objectives": [...],
  "materials": [...],
  "activities": [...],
  "assessment": [...],
  "closure": [...]
}
```

---

## 5. Admin Endpoints

### Get Analytics
```
GET /admin/analytics
Authorization: Bearer {token} (admin only)

Response 200:
{
  "total_students": 150,
  "total_courses": 8,
  "total_lessons": 120,
  "average_score": "82.5"
}
```

### Get System Logs
```
GET /admin/logs
Authorization: Bearer {token} (admin only)

Response 200:
[
  {
    "id": 1,
    "user_id": 5,
    "action": "Lesson completed",
    "details": "Student completed Mathematics - Chapter 1",
    "created_at": "2026-10-01T14:30:00Z"
  }
]
```

---

## Error Responses

```
400 Bad Request:
{ "error": "Missing required fields" }

401 Unauthorized:
{ "error": "No token provided" }

403 Forbidden:
{ "error": "Access denied" }

404 Not Found:
{ "error": "Resource not found" }

500 Internal Server Error:
{ "error": "Internal server error" }
```
