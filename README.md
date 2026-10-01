# Goergenexus AI School Management System

Tam AI-destəkli məktəb idarəetmə sistemi — admin paneli, AI tutor, chat, analytics.

## 🎯 Xüsusiyyətlər

- 📊 Admin Dashboard — tələbə, dərs, qiymətləndirmə idarəetməsi
- 🤖 AI Tutor — 24/7 şagirdlərə sual-cavab dəstəyi
- 💬 Chatbot — real vaxtda ünsiyyət
- 📈 Analytics — şagirdlərin irəliləyişi, statistika
- 📧 Notifications — e-poçt, SMS bildirişlər
- 🔐 Security — JWT auth, rol-əsaslan icazə
- 📱 Responsive — mobil + desktop

## 🛠️ Texnoloji Stack

```
Backend:    Node.js + Express
Database:   PostgreSQL
Frontend:   React / Next.js (ayrı repo)
AI:         OpenAI API
Auth:       JWT
Deployment: Vercel (frontend), Railway (backend)
```

## 📁 Layihə Strukturu

```
goergenexus-ai-admin/
├── config/              # Konfigurasyonlar
├── models/              # Database modelləri
├── routes/              # API routes
├── controllers/         # Business logic
├── middleware/          # Auth, validation
├── services/            # AI, email, external APIs
├── database/            # SQL schemas, migrations
├── scripts/             # Seed data, utilities
├── server.js            # Entry point
├── package.json
└── README.md
```

## 🚀 Qurulum

```bash
# 1. Repository klonla
git clone https://github.com/globalnexus-max/goergenexus-ai-admin
cd goergenexus-ai-admin

# 2. Paketləri yüklə
npm install

# 3. .env faylını konfigurə et
cp .env.example .env

# 4. Databaseni qurğula
creatdb goergenexus_school
psql goergenexus_school < database/schema.sql
npm run seed

# 5. Serveri başlat
npm run dev
```

## 📚 API Docs

### Authentication
- `POST /api/auth/register` — Qeydiyyat
- `POST /api/auth/login` — Daxil ol
- `POST /api/auth/logout` — Çıxış

### Students
- `GET /api/students` — Bütün tələbələr
- `POST /api/students` — Tələbə əlavə et
- `GET /api/students/:id` — Tələbənin detayları
- `PUT /api/students/:id` — Tələbəni redaktə et
- `DELETE /api/students/:id` — Tələbəni sil

### Courses
- `GET /api/courses` — Bütün dərslər
- `POST /api/courses` — Dərs əlavə et
- `GET /api/courses/:id` — Dərsin detayları

### AI Tutor
- `POST /api/ai/ask` — AI-ya sual ver
- `POST /api/ai/generate-quiz` — Avtomatik test yaratma
- `POST /api/ai/lesson-plan` — Dərs planı yaratma

### Admin
- `GET /api/admin/analytics` — Statistika
- `GET /api/admin/logs` — Sistem logları
- `POST /api/admin/actions` — Admin əmri icra et

## 🔐 Security

- JWT token-based auth
- Role-based access control (admin, teacher, student)
- Password hashing (bcrypt)
- SQL injection protection
- CORS enabled
- Rate limiting (soon)

## 📞 Support

Sorularınız üçün: support@goergenexus.com
