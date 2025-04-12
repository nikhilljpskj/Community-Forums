# 🗨️ Community Forums Web App

A full-stack web application that allows users to create forums, comment on discussions, and interact — inspired by platforms like GitHub Discussions.

---

## 📌 Features

- ✅ User Registration & Login (JWT Authentication)
- ✅ Create, Read, Update, and Delete Forums
- ✅ Commenting on forums (only for logged-in users)
- ✅ Public viewing of all forums without login
- ✅ Tags support for forums
- ✅ Forum detail view with comments
- ✅ Protected API routes (authorization checks)
- ✅ Responsive, clean UI with TailwindCSS

---

## ⚙️ Tech Stack

### Frontend:
- **Next.js (TypeScript)**
- **Tailwind CSS**
- `Axios` for API requests
- `Next Navigation` for routing
- `LocalStorage` to manage JWT session

### Backend:
- **Node.js + Express**
- **Prisma ORM**
- **MySQL** (using JSON field for tags)
- **JWT Authentication**
- `bcryptjs` for password hashing

---

## 🛠️ Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nikhilljpskj/Community-Forums
cd community-forums
