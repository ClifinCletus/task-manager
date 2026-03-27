# Task Manager

A robust task management dashboard built with Next.js, Redux, and Firebase. This application provides a centralized interface for tracking activities, managing deadlines, and prioritizing essential work within a dark, high-contrast UI.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **State Management**: Redux Toolkit (Thunks for async logic)
- **Backend**: Firebase (Authentication & Firestore)
- **Styling**: Scoped CSS Modules
- **Library Support**: React Icons, React Hot Toast

## ✨ Dynamic Features

- **Redux-Powered State**: Centralized task and auth state management with asyncThunks for data fetching and updates through specialized Redux slices and custom hooks (`useTasks`, `useAuth`).
- **Firebase Integration**: 
    - Full authentication system (Sign-up/Login).
    - Real-time task persistence and Firestore CRUD operations.
    - security measures for protected access.
- **Task Lifecycle Management**:
    - Manage task status (Todo, In Progress, Done).
    - Urgency levels (High, Medium, Low) with visual indicators.
    - Single-tag categorization system.
    - Deadline support with custom date formatting.
- **Task Prioritization**:
    - Pin critical tasks to the top of your list.
    - Automated limit: You can pin a maximum of 2 tasks simultaneously to maintain focus.
- **Search & Advanced Filtering**:
    - Real-time search by task title or description.
    - Filter by Status, Urgency, or Tag.
    - Multi-way sorting: Newest First, Oldest First, or by Deadline distance.
- **Live Stats Dashboard**: Instant overview of your total activities vs. completed tasks.
- **Feedback & Validation**:
    - Toast notifications for every action (success/error).
    - Client-side form validation for task creation and updates.
- **Mobile Responsive**: Dark theme UI optimized for various screen sizes using a custom CSS variable system.

## � Getting Started

### 1. Installation
   ```bash
   npm install
   ```

### 2. Environment Variables
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_id
   ```

### 3. Usage
   ```bash
   npm run dev
   ```

## 🏗️ Project Architecture

- **`/src/hooks`**: Custom logic for tasks and authentication.
- **`/src/redux`**: Global store configuration and async slices.
- **`/src/components`**: Reusable task cards, forms, and filtering UI.
- **`/src/services`**: Firebase initialization and Firestore references.
- **`/src/utils`**: provider for protectedRoutes

---
Developed by [Clifin Cletus](https://github.com/ClifinCletus)
