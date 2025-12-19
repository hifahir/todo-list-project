# ✨ Task Manager Pro (MERN Stack)

A full-stack Task Management application built to help users organize their daily lives efficiently. This project features a robust backend for data management and a responsive frontend with advanced filtering, prioritization, and deadline tracking capabilities.

![Project Preview](https://via.placeholder.com/800x400?text=Insert+Your+Screenshot+Here)
*(Note: Replace the link above with a screenshot of your actual application)*

## 🚀 Features

* **Full CRUD Operations**: Create, Read, Update, and Delete tasks seamlessly.
* **Smart Filtering**: Sidebar navigation to filter tasks by status (All, Active, Completed).
* **Task Details**: Support for detailed descriptions, deadlines, and tags.
* **Priority System**: Visual indicators for Low, Medium, and High priority tasks.
* **Deadline Tracking**: Automatically flags tasks as "⚠️ Overdue" if the deadline has passed.
* **Responsive Sidebar**: Collapsible sidebar for better mobile experience.
* **Optimistic UI**: Instant visual feedback when updating task status.

## 🛠️ Tech Stack

**Frontend:**
* React.js (Hooks & Functional Components)
* CSS3 (Custom Cards, Flexbox, Transitions)
* Axios (API Consumption)

**Backend:**
* Node.js & Express.js (RESTful API)
* MongoDB & Mongoose (Database & ODM)
* Dotenv (Environment Variables)

## 📂 Project Structure

```bash
todo-fullstack-mern/
├── backend/            # Server-side logic (Node/Express)
│   ├── controllers/    # Request handlers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── server.js       # Entry point
│
└── frontend/           # Client-side logic (React)
    ├── src/
    │   ├── components/ # Sidebar, etc.
    │   ├── App.js      # Main UI logic
    │   └── App.css     # Styling