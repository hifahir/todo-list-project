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

```

⚙️ Installation & Setup
Follow these steps to run the project locally.

Prerequisites
Node.js installed
MongoDB Atlas account (or local MongoDB)

1. Clone the Repository
```Bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd todo-fullstack-mern
```
2. Backend Setup
Navigate to the backend folder and install dependencies:
```Bash
cd backend
npm install
```
Create a .env file in the backend folder and add your configuration:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority
PORT=5000
```
Start the server:
```Bash
npm run dev
```
Server should run on http://localhost:5000
3. Frontend Setup
Open a new terminal, navigate to the frontend folder, and install dependencies:
```Bash
cd ../frontend
npm install
```
Start the React application:
```Bash
npm start
```
The app should open on http://localhost:3000

📝 License
This project is open-source and available under the MIT License.
