# Frontend - Employee Onboarding Form Builder

A modern React application built with TanStack libraries for dynamic form rendering and submission management.

## 📋 Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Components](#components)
- [Functionalities](#functionalities)
- [Project Structure](#project-structure)

## 🎯 Overview

This frontend application provides a complete user interface for:
- **Dynamic Form Rendering**: Renders form fields based on schema from backend
- **Form Submission**: Validates and submits employee onboarding data
- **Submissions Management**: View, edit, delete, and export submissions
- **Search & Filter**: Search submissions with debouncing
- **Dark Mode**: Toggle between light and dark themes

## 🛠 Technology Stack

- **React 19.2.0** - UI framework
- **TanStack Query 5.90.11** - Server state management
- **TanStack Form 1.26.0** - Form state management
- **TanStack Table 8.21.3** - Table component
- **Tailwind CSS 4.1.17** - Styling
- **React Router DOM 7.9.6** - Routing
- **Axios 1.13.2** - HTTP client
- **Vite 7.2.4** - Build tool

## ✨ Features

### 1. Dynamic Form Page

#### Form Schema Fetching
- Fetches form schema from `GET /api/form-schema` endpoint
- Uses TanStack Query for data fetching
- Implements loading state with spinner
- Shows error message if schema fetch fails

#### Dynamic Form Rendering
- Renders all 7 field types dynamically:
  1. **Text** - Single-line text input with validation
  2. **Number** - Numeric input with min/max validation
  3. **Select** - Dropdown selection
  4. **Multi-select** - Checkbox-based multi-selection
  5. **Date** - Date picker with max date validation (today)
  6. **Textarea** - Multi-line text input with character counter
  7. **Switch** - Toggle boolean input

#### Form Validation
- **Client-side validation** using TanStack Form validators
- **Server-side validation** on submission
- **Validation rules supported**:
  - `minLength` / `maxLength` - Text length validation
  - `regex` - Pattern matching
  - `min` / `max` - Number range validation
  - `maxDate` - Date maximum validation (prevents future dates)
  - `minSelected` / `maxSelected` - Multi-select count validation
  - `required` - Required field validation

#### Submission Handling
- Submit button disabled when form is invalid
- Submit button disabled during submission
- Loading indicator ("Submitting...") during submission
- Success toast notification on successful submission
- Error messages displayed for validation failures
- Form automatically cleared after successful submission
- Automatic navigation to submissions page after success

### 2. Submissions Table Page

#### Table Features
- Uses TanStack Table for rendering
- Displays columns: Full Name, Age, Department, Skills, Created Date, Actions
- Server-side pagination (10/20/50 items per page)
- Server-side sorting by createdAt (ascending/descending)
- Search functionality with 500ms debounce
- Loading, error, and empty states

#### Actions
- **View** - Opens modal with full submission details
- **Edit** - Opens modal in edit mode with pre-filled form
- **Delete** - Confirms before deletion, shows success toast
- **CSV Export** - Downloads all submissions as CSV file

#### Pagination
- Page selector (10/20/50 items per page)
- Previous/Next navigation buttons
- Page info display (Page X of Y)
- Total submissions count
- URL sync for pagination parameters

### 3. Dark Mode
- Toggle button in navbar (sun/moon icon)
- Preference saved in localStorage
- Smooth theme transitions
- All components support dark mode

## 🧩 Components

### Layout Components

#### `Layout.jsx`
- Main layout wrapper
- Provides consistent page structure
- Includes Navbar and main content area

#### `Navbar.jsx`
- Navigation bar with centered heading
- Links to Form and Submissions pages
- Dark mode toggle button
- Active route highlighting

### Form Components

#### `DynamicFormPage.jsx`
- Main form page component
- Fetches and renders form schema
- Handles form submission
- Manages form state with TanStack Form
- Shows loading, error, and success states

#### `FieldRenderer.jsx`
- Renders appropriate input component based on field type
- Handles field-specific logic
- Applies validation rules
- Displays error messages

#### `formUtils.js`
- `buildDefaultValues()` - Creates default values from schema
- `buildValidator()` - Builds validation functions for each field

### Submissions Components

#### `SubmissionsPage.jsx`
- Main submissions page
- Manages pagination, sorting, and search state
- Handles CRUD operations (create, read, update, delete)
- CSV export functionality

#### `SubmissionTable.jsx`
- Table component using TanStack Table
- Renders submission data in columns
- Provides action buttons (View, Edit, Delete)

#### `SubmissionModal.jsx`
- Modal dialog for viewing/editing submissions
- Displays all submission fields
- Edit mode with form pre-filled

### UI Components

#### `Button.jsx`
- Reusable button component
- Variants: solid, outline, ghost
- Sizes: sm, md, lg
- Disabled state support

#### `Input.jsx`
- Text, number, and date input component
- Date inputs styled with sky-600 color (matches submit button)
- Dark mode support

#### `Select.jsx`
- Dropdown select component
- Dark mode support

#### `MultiSelectCheckbox.jsx`
- Checkbox-based multi-select component
- Visual feedback for selected items
- Shows selected count and max limit
- Disabled state when max reached

#### `Switch.jsx`
- Toggle switch component
- Boolean input for remote employee field

#### `Modal.jsx`
- Reusable modal dialog component
- Backdrop and close functionality

#### `Alert.jsx`
- Error/success message component
- Different types: error, success

#### `Toast.jsx`
- Temporary notification component
- Auto-dismisses after timeout

#### `Spinner.jsx`
- Loading spinner component
- Used during data fetching

### Custom Hooks

#### `useDarkMode.jsx`
- Dark mode context provider
- `useDarkMode()` hook for accessing dark mode state
- Manages theme persistence in localStorage

#### `useDebounce.jsx`
- Debounce hook for search input
- Delays API calls by 500ms

#### `usePaginationParams.jsx`
- Manages pagination parameters in URL
- Syncs page, limit, and sortOrder with URL query params

## 🔧 Functionalities

### Form Submission Flow

1. User fills out form fields
2. Client-side validation runs on field change
3. Submit button enables when form is valid
4. On submit:
   - Button shows "Submitting..." and is disabled
   - Form data sent to `POST /api/submissions`
   - Server validates data
   - On success: Toast notification, form cleared, navigate to submissions page
   - On error: Error messages displayed

### Submissions Management Flow

1. **Viewing Submissions**:
   - Fetches paginated submissions from `GET /api/submissions`
   - Displays in table with pagination controls
   - Supports sorting by createdAt

2. **Searching**:
   - User types in search box
   - Debounced query sent to `GET /api/submissions/search?q=query`
   - Results displayed in table

3. **Editing**:
   - Click Edit button on submission
   - Modal opens with pre-filled form
   - User modifies data
   - Sends `PUT /api/submissions/:id` request
   - Table refreshes with updated data

4. **Deleting**:
   - Click Delete button
   - Confirmation dialog appears
   - On confirm, sends `DELETE /api/submissions/:id` request
   - Table refreshes, success toast shown

5. **CSV Export**:
   - Click Export CSV button
   - Fetches all submissions from `GET /api/submissions/export/csv`
   - Downloads CSV file with all submission data

### State Management

#### Server State (TanStack Query)
- Form schema cached and reused
- Submissions list with pagination
- Automatic cache invalidation after mutations
- Optimistic updates for better UX

#### Form State (TanStack Form)
- Field values managed reactively
- Validation errors tracked per field
- Form-level validation state
- Submit state management

#### Local State (React useState)
- UI state (modals, toasts)
- Search query
- Pagination parameters

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   ├── client.js           # Axios instance configuration
│   │   └── formApi.js          # API function exports
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── MultiSelectCheckbox.jsx
│   │   │   ├── Switch.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Alert.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── Spinner.jsx
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── Layout.jsx
│   │   │   └── Navbar.jsx
│   │   │
│   │   └── feedback/            # Feedback components
│   │       └── Alert.jsx
│   │
│   ├── features/
│   │   ├── form/               # Form-related components
│   │   │   ├── DynamicFormPage.jsx
│   │   │   ├── FieldRenderer.jsx
│   │   │   └── formUtils.js
│   │   │
│   │   └── submissions/        # Submissions-related components
│   │       ├── SubmissionsPage.jsx
│   │       ├── SubmissionTable.jsx
│   │       └── SubmissionModal.jsx
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useDarkMode.jsx
│   │   ├── useDebounce.jsx
│   │   └── usePaginationParams.jsx
│   │
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
│
├── package.json
└── README.md                   # This file
```

## 🚀 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Development Server

- **URL**: http://localhost:5173
- **Hot Reload**: Automatic page refresh on file changes
- **Fast Refresh**: React component state preservation

### Building for Production

```bash
npm run build
```

Output will be in `dist/` directory, ready for deployment.

## 📝 Notes

- Form validation happens both client-side and server-side
- All API calls are handled through TanStack Query
- Dark mode preference persists across sessions
- URL parameters sync with pagination state
- CSV export downloads all submissions
- Date picker prevents future dates
- Multi-select uses checkboxes for better UX

---

For backend API documentation, see [Backend README](../backend/README.md)
