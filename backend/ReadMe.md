# Backend - Employee Onboarding API

A RESTful API built with Node.js and Express for the Employee Onboarding Form Builder system.

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [API Endpoints](#api-endpoints)
- [Request/Response Examples](#requestresponse-examples)
- [Validation Rules](#validation-rules)
- [Database Schema](#database-schema)
- [Testing with Postman](#testing-with-postman)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [Development](#development)

## 🎯 Overview

This backend API provides:
- Dynamic form schema endpoint
- Form submission with validation
- Paginated and sortable submissions list
- Search functionality
- CRUD operations for submissions
- CSV export functionality

## 🛠 Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js 4.19.2** - Web framework
- **SQLite3 5.1.6** - Lightweight database
- **UUID 9.0.1** - Unique ID generation
- **CORS 2.8.5** - Cross-origin resource sharing

## 📡 API Endpoints

### Base URL
```
http://localhost:5600
```

### 1. Health Check

**GET** `/health`

Check if the server is running.

**Response** (200 OK):
```json
{
  "status": "ok"
}
```

---

### 2. Get Form Schema

**GET** `/api/form-schema`

Returns the complete form schema for Employee Onboarding form.

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "title": "Employee Onboarding",
    "description": "Please fill in the details to onboard a new employee.",
    "fields": [
      {
        "name": "fullName",
        "label": "Full Name",
        "type": "text",
        "placeholder": "Enter full name",
        "required": true,
        "validations": {
          "minLength": 3,
          "maxLength": 50,
          "regex": "^[A-Za-z ]+$"
        }
      },
      {
        "name": "age",
        "label": "Age",
        "type": "number",
        "placeholder": "Enter age",
        "required": true,
        "validations": {
          "min": 18,
          "max": 65
        }
      },
      {
        "name": "department",
        "label": "Department",
        "type": "select",
        "placeholder": "Select department",
        "required": true,
        "options": [
          { "label": "Engineering", "value": "engineering" },
          { "label": "HR", "value": "hr" },
          { "label": "Finance", "value": "finance" }
        ]
      },
      {
        "name": "skills",
        "label": "Skills",
        "type": "multi-select",
        "placeholder": "Select skills",
        "required": true,
        "options": [
          { "label": "JavaScript", "value": "js" },
          { "label": "React", "value": "react" },
          { "label": "Node.js", "value": "node" },
          { "label": "SQL", "value": "sql" },
          { "label": "Communication", "value": "communication" }
        ],
        "validations": {
          "minSelected": 1,
          "maxSelected": 3
        }
      },
      {
        "name": "joiningDate",
        "label": "Joining Date",
        "type": "date",
        "required": true,
        "validations": {
          "minDate": "2024-01-01"
        }
      },
      {
        "name": "bio",
        "label": "About Employee",
        "type": "textarea",
        "placeholder": "Short bio (optional)",
        "validations": {
          "maxLength": 200
        }
      },
      {
        "name": "isRemote",
        "label": "Remote Employee",
        "type": "switch",
        "required": false
      }
    ]
  }
}
```

---

### 3. Create Submission

**POST** `/api/submissions`

Creates a new form submission with validation.

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "fullName": "John Doe",
  "age": 25,
  "department": "engineering",
  "skills": ["js", "react"],
  "joiningDate": "2024-06-01",
  "bio": "Experienced software developer with expertise in React and Node.js",
  "isRemote": true
}
```

**Success Response** (201 Created):
```json
{
  "success": true,
  "id": "5b93e7d2-2371-419d-96fc-c180ce979e02",
  "createdAt": "2025-11-30T12:36:27.514Z"
}
```

**Error Response** (400 Bad Request):
```json
{
  "success": false,
  "errors": {
    "fullName": "Minimum length is 3",
    "age": "Minimum value is 18",
    "skills": "This field is required",
    "joiningDate": "Date must be after 2024-01-01"
  }
}
```

---

### 4. Get Submissions (Paginated)

**GET** `/api/submissions`

Returns a paginated and sortable list of submissions.

**Query Parameters**:
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10, max: 50) - Items per page
- `sortOrder` (optional, default: "desc") - Sort order: "asc" or "desc"

**Example Request**:
```
GET /api/submissions?page=1&limit=10&sortOrder=desc
```

**Response** (200 OK):
```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "totalPages": 5,
  "totalCount": 50,
  "items": [
    {
      "id": "5b93e7d2-2371-419d-96fc-c180ce979e02",
      "createdAt": "2025-11-30T12:36:27.514Z",
      "data": {
        "fullName": "John Doe",
        "age": 25,
        "department": "engineering",
        "skills": ["js", "react"],
        "joiningDate": "2024-06-01",
        "bio": "Experienced software developer",
        "isRemote": true
      }
    }
    // ... more items
  ]
}
```

---

### 5. Search Submissions

**GET** `/api/submissions/search`

Searches submissions by query string.

**Query Parameters**:
- `q` (required) - Search query string

**Example Request**:
```
GET /api/submissions/search?q=john
```

**Response** (200 OK):
```json
{
  "success": true,
  "items": [
    {
      "id": "5b93e7d2-2371-419d-96fc-c180ce979e02",
      "createdAt": "2025-11-30T12:36:27.514Z",
      "data": {
        "fullName": "John Doe",
        // ... other fields
      }
    }
  ]
}
```

---

### 6. Update Submission

**PUT** `/api/submissions/:id`

Updates an existing submission by ID.

**URL Parameters**:
- `id` - Submission ID (UUID)

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**: Same as POST /api/submissions

**Success Response** (200 OK):
```json
{
  "success": true
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Submission not found"
}
```

---

### 7. Delete Submission

**DELETE** `/api/submissions/:id`

Deletes a submission by ID.

**URL Parameters**:
- `id` - Submission ID (UUID)

**Success Response** (200 OK):
```json
{
  "success": true
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "Submission not found"
}
```

---

### 8. Export CSV

**GET** `/api/submissions/export/csv`

Exports all submissions as a CSV file.

**Response** (200 OK):
- Content-Type: `text/csv`
- File download with all submissions

**CSV Format**:
```csv
id,createdAt,fullName,age,department,skills,joiningDate,bio,isRemote
5b93e7d2-2371-419d-96fc-c180ce979e02,2025-11-30T12:36:27.514Z,John Doe,25,engineering,"js,react",2024-06-01,Experienced developer,true
```

---

## ✅ Validation Rules

### Field Validation

#### Text Fields
- **minLength**: Minimum character length
- **maxLength**: Maximum character length
- **regex**: Regular expression pattern matching
- **required**: Field must be provided

#### Number Fields
- **min**: Minimum numeric value
- **max**: Maximum numeric value
- **required**: Field must be provided

#### Date Fields
- **minDate**: Minimum date (ISO format: YYYY-MM-DD)
- **required**: Field must be provided

#### Multi-select Fields
- **minSelected**: Minimum number of selections
- **maxSelected**: Maximum number of selections
- **required**: At least one selection required

#### Switch Fields
- **required**: Boolean value must be provided (true/false)

### Validation Error Messages

- `"This field is required"` - Required field is missing
- `"Minimum length is {n}"` - Text is too short
- `"Maximum length is {n}"` - Text is too long
- `"Invalid format"` - Regex pattern doesn't match
- `"Minimum value is {n}"` - Number is too small
- `"Maximum value is {n}"` - Number is too large
- `"Date must be after {date}"` - Date is before minimum
- `"Select at least {n} options"` - Not enough selections
- `"Select at most {n} options"` - Too many selections

---

## 🗄 Database Schema

### Submissions Table

```sql
CREATE TABLE IF NOT EXISTS submissions (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  createdAt TEXT NOT NULL
);
```

**Fields**:
- `id` - UUID string (primary key)
- `data` - JSON string containing submission data
- `createdAt` - ISO 8601 timestamp string

**Example Data**:
```json
{
  "id": "5b93e7d2-2371-419d-96fc-c180ce979e02",
  "data": "{\"fullName\":\"John Doe\",\"age\":25,\"department\":\"engineering\",\"skills\":[\"js\",\"react\"],\"joiningDate\":\"2024-06-01\",\"bio\":\"Developer\",\"isRemote\":true}",
  "createdAt": "2025-11-30T12:36:27.514Z"
}
```

---

## 🧪 Testing with Postman

### Step 1: Import Postman Collection

1. **Open Postman**
2. **Click "Import"** button (top left)
3. **Select File** or **Paste Raw Text**
4. **Choose** `postman_collection.json` from the project root
5. **Click "Import"**

The collection will be imported with all endpoints pre-configured.

### Step 2: Start Backend Server

```bash
cd backend
npm start
```

Server should be running on `http://localhost:5600`

### Step 3: Test Endpoints

#### Test 1: Health Check
1. Select **"Health Check"** request
2. Click **"Send"**
3. Should return `{"status": "ok"}`

#### Test 2: Get Form Schema
1. Select **"Get Form Schema"** request
2. Click **"Send"**
3. Should return complete form schema with all fields

#### Test 3: Create Valid Submission
1. Select **"Create Submission - Valid"** request
2. Review the request body (pre-filled with valid data)
3. Click **"Send"**
4. Should return `201 Created` with `id` and `createdAt`
5. **Copy the `id`** for use in update/delete requests

#### Test 4: Create Invalid Submission
1. Select **"Create Submission - Invalid"** request
2. Click **"Send"**
3. Should return `400 Bad Request` with validation errors

#### Test 5: Get Submissions
1. Select **"Get Submissions - Paginated"** request
2. Click **"Send"**
3. Should return paginated list of submissions

#### Test 6: Search Submissions
1. Select **"Search Submissions"** request
2. Modify the `q` parameter if needed
3. Click **"Send"**
4. Should return matching submissions

#### Test 7: Update Submission
1. Select **"Update Submission"** request
2. **Replace** `:id` in URL with actual submission ID from Test 3
3. Modify request body if needed
4. Click **"Send"**
5. Should return `200 OK` with `{"success": true}`

#### Test 8: Delete Submission
1. Select **"Delete Submission"** request
2. **Replace** `:id` in URL with actual submission ID
3. Click **"Send"**
4. Should return `200 OK` with `{"success": true}`

#### Test 9: Export CSV
1. Select **"Export CSV"** request
2. Click **"Send"**
3. Should download a CSV file

### Step 4: Test Different Scenarios

#### Pagination Testing
- Test with different `page` values (1, 2, 3, etc.)
- Test with different `limit` values (10, 20, 50)
- Test edge cases (page beyond total pages)

#### Sorting Testing
- Test `sortOrder=asc` (oldest first)
- Test `sortOrder=desc` (newest first)

#### Validation Testing
- Test each validation rule individually
- Test multiple validation errors at once
- Test edge cases (boundary values)

---

## 📝 Request/Response Examples

### Example 1: Valid Submission

**Request**:
```bash
POST http://localhost:5600/api/submissions
Content-Type: application/json

{
  "fullName": "Jane Smith",
  "age": 30,
  "department": "hr",
  "skills": ["communication"],
  "joiningDate": "2024-07-15",
  "bio": "HR Manager with 5 years experience",
  "isRemote": false
}
```

**Response** (201):
```json
{
  "success": true,
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "createdAt": "2025-11-30T13:00:00.000Z"
}
```

### Example 2: Invalid Submission

**Request**:
```bash
POST http://localhost:5600/api/submissions
Content-Type: application/json

{
  "fullName": "AB",
  "age": 15,
  "department": "engineering",
  "skills": [],
  "joiningDate": "2023-01-01",
  "bio": "",
  "isRemote": false
}
```

**Response** (400):
```json
{
  "success": false,
  "errors": {
    "fullName": "Minimum length is 3",
    "age": "Minimum value is 18",
    "skills": "This field is required",
    "joiningDate": "Date must be after 2024-01-01"
  }
}
```

### Example 3: Paginated Submissions

**Request**:
```bash
GET http://localhost:5600/api/submissions?page=1&limit=20&sortOrder=desc
```

**Response** (200):
```json
{
  "success": true,
  "page": 1,
  "limit": 20,
  "totalPages": 3,
  "totalCount": 50,
  "items": [
    // ... 20 submission objects
  ]
}
```

---

## 🚨 Error Handling

### HTTP Status Codes

- **200 OK** - Successful GET, PUT, DELETE requests
- **201 Created** - Successful POST request
- **400 Bad Request** - Validation errors or invalid request
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

### Error Response Format

```json
{
  "success": false,
  "message": "Error message",
  "errors": {
    "fieldName": "Field-specific error message"
  }
}
```

### Common Errors

1. **Validation Errors** (400):
   - Missing required fields
   - Invalid field values
   - Validation rule violations

2. **Not Found** (404):
   - Submission ID doesn't exist
   - Invalid resource path

3. **Server Errors** (500):
   - Database connection issues
   - Unexpected errors

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── app.js                    # Express app configuration
│   ├── server.js                 # Server entry point
│   │
│   ├── config/
│   │   └── db.js                 # Database connection and setup
│   │
│   ├── controllers/
│   │   ├── formController.js     # Form schema controller
│   │   └── submissionController.js  # Submission CRUD controllers
│   │
│   ├── models/
│   │   └── submissionModel.js    # Database operations
│   │
│   ├── routes/
│   │   ├── formRoutes.js         # Form schema routes
│   │   └── submissionRoutes.js   # Submission routes
│   │
│   ├── schema/
│   │   └── formSchema.js         # Form schema definition
│   │
│   ├── validation/
│   │   └── formValidator.js      # Validation logic
│   │
│   └── middleware/
│       ├── errorHandler.js       # Global error handler
│       └── validateRequest.js    # Request validation middleware
│
├── database.sqlite               # SQLite database file (auto-created)
├── package.json
└── README.md                    # This file
```

---

## 🚀 Development

### Installation

```bash
npm install
```

### Running the Server

**Production Mode**:
```bash
npm start
```

**Development Mode** (with auto-restart):
```bash
npm run dev
```

### Environment Variables

Create a `.env` file (optional):
```env
PORT=5600
```

### Database

- Database file: `database.sqlite`
- Automatically created on first run
- Located in `backend/` directory
- To reset: Delete `database.sqlite` and restart server

### API Testing

#### Using cURL

```bash
# Health check
curl http://localhost:5600/health

# Get form schema
curl http://localhost:5600/api/form-schema

# Create submission
curl -X POST http://localhost:5600/api/submissions \
  -H "Content-Type: application/json" \
  -d '{"fullName":"John Doe","age":25,"department":"engineering","skills":["js"],"joiningDate":"2024-06-01","bio":"Developer","isRemote":true}'

# Get submissions
curl "http://localhost:5600/api/submissions?page=1&limit=10&sortOrder=desc"
```

#### Using Postman

See [Testing with Postman](#testing-with-postman) section above.

---

## 🔍 Logic Flow

### Submission Creation Flow

1. **Request Received** → `POST /api/submissions`
2. **Validation Middleware** → Validates request body structure
3. **Form Validator** → Validates against form schema rules
4. **If Valid**:
   - Generate UUID for submission ID
   - Create timestamp
   - Store in database
   - Return success response
5. **If Invalid**:
   - Collect validation errors
   - Return error response with field-specific messages

### Pagination Flow

1. **Request Received** → `GET /api/submissions?page=X&limit=Y&sortOrder=Z`
2. **Parse Query Parameters** → Extract page, limit, sortOrder
3. **Validate Parameters** → Ensure valid values
4. **Calculate Offset** → `offset = (page - 1) * limit`
5. **Database Query** → Fetch submissions with LIMIT and OFFSET
6. **Count Total** → Get total count for pagination info
7. **Calculate Total Pages** → `totalPages = Math.ceil(totalCount / limit)`
8. **Return Response** → Include items, pagination info

---

## 📝 Notes

- All timestamps are in ISO 8601 format
- Submission IDs are UUIDs (v4)
- Multi-select values are stored as JSON arrays
- Database uses SQLite for simplicity
- CORS is enabled for frontend communication
- All validation happens server-side

---

## 🔧 Troubleshooting

### Server won't start
- Check if port 5600 is available
- Verify Node.js version (v18+)
- Check for syntax errors in code

### Database errors
- Delete `database.sqlite` and restart
- Check file permissions
- Verify SQLite3 installation

### Validation not working
- Check form schema definition
- Verify validation rules in `formValidator.js`
- Check request body format

### CORS errors
- Verify CORS middleware is enabled
- Check frontend API base URL
- Ensure backend server is running

---

For frontend documentation, see [Frontend README](../frontend/README.md)
