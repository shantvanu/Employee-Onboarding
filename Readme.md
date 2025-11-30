# Employee Onboarding - Dynamic Form Builder

A full-stack dynamic form builder system for employee onboarding, built with React and Node.js. This application allows users to fill out a dynamic form and view/manage submissions in a paginated, sortable table.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Quick Start Guide](#quick-start-guide)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Known Issues](#known-issues)
- [Contributing](#contributing)

## 🎯 Overview

This project implements a complete dynamic form builder system with:
- **Frontend**: React-based SPA with dynamic form rendering
- **Backend**: RESTful API with SQLite database
- **Features**: Form validation, pagination, sorting, search, CSV export, dark mode

## ✨ Features

### Core Features
- ✅ Dynamic form rendering from schema
- ✅ 7 field types (text, number, select, multi-select, date, textarea, switch)
- ✅ Client-side and server-side validation
- ✅ Paginated submissions table
- ✅ Server-side sorting and pagination
- ✅ Search functionality
- ✅ Edit/Delete submissions
- ✅ CSV export
- ✅ Dark mode toggle

### Technical Features
- ✅ TanStack Query for server state management
- ✅ TanStack Form for form state management
- ✅ TanStack Table for table rendering
- ✅ URL sync for pagination parameters
- ✅ Responsive design with Tailwind CSS
- ✅ Error handling and loading states

## 🛠 Technology Stack

### Frontend
- **React 19** - UI framework
- **TanStack Query** - Server state management
- **TanStack Form** - Form state management
- **TanStack Table** - Table component
- **Tailwind CSS v4** - Styling
- **React Router DOM** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **SQLite3** - Database
- **UUID** - Unique ID generation
- **CORS** - Cross-origin resource sharing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

Verify your installation:
```bash
node --version  # Should be v18 or higher
npm --version   # Should be 8.x or higher
git --version
```

## 🚀 Getting Started

### Option 1: Clone from Repository

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Employee-Onboarding
   ```

2. **Or if you have SSH access:**
   ```bash
   git clone git@github.com:<username>/Employee-Onboarding.git
   cd Employee-Onboarding
   ```

### Option 2: Fork the Repository

1. **Fork the repository** on GitHub/GitLab
2. **Clone your fork:**
   ```bash
   git clone https://github.com/<your-username>/Employee-Onboarding.git
   cd Employee-Onboarding
   ```

### Option 3: Download ZIP

1. Download the repository as ZIP
2. Extract to your desired location
3. Open terminal in the extracted folder

## ⚡ Quick Start Guide

### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

This will install all required backend dependencies:
- express
- sqlite3
- uuid
- cors
- nodemon (dev dependency)

### Step 2: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

This will install all required frontend dependencies including React, TanStack libraries, Tailwind CSS, etc.

### Step 3: Start Backend Server

```bash
cd ../backend
npm start
```

The backend server will start on `http://localhost:5600`

**For development with auto-restart:**
```bash
npm run dev
```

### Step 4: Start Frontend Server

Open a **new terminal window** and run:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173` (or another port if 5173 is occupied)

### Step 5: Access the Application

1. Open your browser and navigate to: `http://localhost:5173`
2. You should see the Employee Onboarding form
3. Fill out the form and submit to test the functionality

## 📁 Project Structure

```
Employee-Onboarding/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── server.js             # Server entry point
│   │   ├── config/
│   │   │   └── db.js             # Database configuration
│   │   ├── controllers/         # Request handlers
│   │   ├── models/               # Data models
│   │   ├── routes/               # API routes
│   │   ├── schema/               # Form schema
│   │   ├── validation/           # Validation logic
│   │   └── middleware/          # Express middleware
│   ├── database.sqlite          # SQLite database (auto-created)
│   ├── package.json
│   └── README.md                 # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── api/                  # API client functions
│   │   ├── components/          # React components
│   │   │   ├── ui/              # UI components
│   │   │   ├── layout/          # Layout components
│   │   │   └── feedback/        # Alert/Toast components
│   │   ├── features/            # Feature modules
│   │   │   ├── form/            # Form components
│   │   │   └── submissions/     # Submissions components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json
│   └── README.md                # Frontend documentation
│
├── postman_collection.json      # Postman API collection
├── README.md                    # This file
└── ASSIGNMENT_COMPLETION_CHECKLIST.md
```

## 🔧 Configuration

### Backend Configuration

The backend server runs on port `5600` by default. To change this:

1. Create a `.env` file in the `backend` directory:
   ```env
   PORT=5600
   ```

2. Or set the environment variable:
   ```bash
   export PORT=5600  # Linux/Mac
   set PORT=5600     # Windows
   ```

### Frontend Configuration

The frontend API base URL is configured in `frontend/src/api/client.js`. To change the backend URL:

```javascript
export const api = axios.create({
  baseURL: 'http://localhost:5600',  // Change this
  // ...
});
```

## 📚 API Documentation

### Quick API Reference

- **GET** `/api/form-schema` - Get form schema
- **POST** `/api/submissions` - Create submission
- **GET** `/api/submissions` - List submissions (paginated)
- **GET** `/api/submissions/search?q=query` - Search submissions
- **PUT** `/api/submissions/:id` - Update submission
- **DELETE** `/api/submissions/:id` - Delete submission
- **GET** `/api/submissions/export/csv` - Export CSV

For detailed API documentation, see:
- [Backend README](./backend/README.md) - Complete API documentation
- [Postman Collection](./postman_collection.json) - Importable API collection

## 🧪 Testing

### Testing with Postman

1. **Import the Postman Collection:**
   - Open Postman
   - Click "Import"
   - Select `postman_collection.json` from the root directory
   - All API endpoints will be available with example requests

2. **Test Endpoints:**
   - Start the backend server
   - Use the imported collection to test all endpoints
   - Replace `:id` placeholders with actual submission IDs

### Testing the Frontend

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Test the following:
   - Form submission with valid data
   - Form validation with invalid data
   - View submissions table
   - Pagination and sorting
   - Search functionality
   - Edit/Delete submissions
   - CSV export
   - Dark mode toggle

### Manual API Testing

```bash
# Health check
curl http://localhost:5600/health

# Get form schema
curl http://localhost:5600/api/form-schema

# Create submission
curl -X POST http://localhost:5600/api/submissions \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","age":25,"department":"engineering","skills":["js","react"],"joiningDate":"2024-06-01","bio":"Developer","isRemote":true}'

# Get submissions
curl "http://localhost:5600/api/submissions?page=1&limit=10&sortOrder=desc"
```

## 🐛 Known Issues

None at this time. All features are working as expected.

## 📝 Development Notes

- The SQLite database is automatically created on first run
- Form schema is defined in `backend/src/schema/formSchema.js`
- All dates are handled in ISO 8601 format
- Multi-select values are stored as JSON arrays
- Dark mode preference is saved in localStorage

## 🔍 Troubleshooting

### Backend won't start
- Check if port 5600 is already in use
- Verify Node.js version (v18+)
- Run `npm install` again in backend directory

### Frontend won't start
- Check if port 5173 is already in use
- Verify Node.js version (v18+)
- Run `npm install` again in frontend directory
- Clear node_modules and reinstall if needed

### API requests failing
- Ensure backend server is running on port 5600
- Check CORS configuration in backend
- Verify API base URL in `frontend/src/api/client.js`

### Database issues
- Delete `backend/database.sqlite` and restart server
- Database will be recreated automatically

## 📖 Additional Documentation

- [Frontend README](./frontend/README.md) - Frontend features and functionalities
- [Backend README](./backend/README.md) - Backend APIs and testing guide
- [API Testing Summary](./API_TESTING_SUMMARY.md) - API endpoint examples
- [Assignment Checklist](./ASSIGNMENT_COMPLETION_CHECKLIST.md) - Completion status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created for the MatBook assignment.

## 👤 Shantvanu Mutha
Built for MatBook Software Engineer Assignment

---

**Happy Coding! 🚀**
