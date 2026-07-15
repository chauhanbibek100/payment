# Payment App

A full-stack payment application with a Java backend and a TypeScript frontend.

🔗 **Live Demo:** [payment-pi-gray.vercel.app](https://payment-pi-gray.vercel.app)

---

## 📌 Overview

This project is a payment platform consisting of two main parts:

- **`payment-backend`** — Server-side application (Java) that handles core business logic, APIs, and data processing.
- **`payment-frontend`** — Client-side application (TypeScript) that provides the user interface for interacting with the payment system.

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Backend    | Java |
| Frontend   | TypeScript, HTML, CSS |
| Deployment | Docker, Vercel |

---

## 📁 Project Structure

```
payment/
├── payment-backend/     # Backend service (Java)
├── payment-frontend/    # Frontend application (TypeScript)
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Java (JDK 17+ recommended)
- Node.js (v18+ recommended) and npm/yarn
- Docker (optional, for containerized setup)

### 1. Clone the repository

```bash
git clone https://github.com/chauhanbibek100/payment.git
cd payment
```

### 2. Backend Setup

```bash
cd payment-backend
# Build and run the backend (adjust based on build tool used, e.g. Maven/Gradle)
./mvnw spring-boot:run
```

### 3. Frontend Setup

```bash
cd payment-frontend
npm install
npm run dev
```

The frontend will typically be available at `http://localhost:3000` (or the port configured in the project), and the backend API at `http://localhost:8080` (adjust as needed).

---

## ⚙️ Environment Variables

Create a `.env` file in the `payment-frontend` (and/or `payment-backend`, e.g. `application.properties`/`application.yml`) directory with the required configuration, such as:

```
API_BASE_URL=
DATABASE_URL=
JWT_SECRET=
```

> Update these values according to your actual configuration.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| POST   | `/api/payments` | Create a new payment |
| GET    | `/api/payments/:id` | Get payment details |
| GET    | `/api/payments` | List all payments |

> Update this table with the actual endpoints exposed by `payment-backend`.

---

## 🧪 Running Tests

```bash
# Backend
cd payment-backend
./mvnw test

# Frontend
cd payment-frontend
npm run test
```

---

## 🐳 Docker

If a `Dockerfile` is provided, you can build and run the backend using Docker:

```bash
cd payment-backend
docker build -t payment-backend .
docker run -p 8080:8080 payment-backend
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project currently has no license specified. Consider adding one (e.g., MIT) to clarify usage rights.

---

## 👤 Author

**Bibek Chauhan**
