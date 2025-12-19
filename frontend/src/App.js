import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Sidebar from "./sidebar";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodoText, setNewTodoText] = useState("");
  const [filter, setFilter] = useState("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    text: "",
    description: "",
    deadline: "",
    priority: "Medium",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Function untuk READ (Mengambil Daftar Tugas)
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal mengambil tugas:", error);
      setLoading(false);
    }
  };

  // Function untuk POST (Menambahkan Tugas Baru)
  const addTodo = async () => {
    if (!formData.text.trim()) return;

    try {
      // Siapkan data untuk dikirim
      const payload = {
        ...formData,
        // Ubah string tag "Kampus, Belajar" menjadi array ["Kampus", "Belajar"]
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
      };

      const response = await axios.post(API_URL, payload);
      setTodos([response.data, ...todos]);

      // Reset Form
      setFormData({
        text: "",
        description: "",
        deadline: "",
        priority: "Medium",
        tags: "",
      });
    } catch (error) {
      console.error("Gagal menambahkan tugas:", error);
    }
  };

  // Function untuk mengubah status completed
  const toggleComplete = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`);

      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error("Gagal memperbarui tugas:", error);
    }
  };

  // Function untuk DELETE (Menghapus Tugas)
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Gagal menghapus tugas:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const isOverdue = (deadline, completed) => {
    if (!deadline || completed) return false;
    return new Date(deadline) < new Date();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <Sidebar
        currentFilter={filter}
        setFilter={setFilter}
        isOpen={isSidebarOpen}
      />

      <div className={`main-content ${isSidebarOpen ? "" : "full-width"}`}>
        <header className="app-header">
          <button
            className="toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <div className="header-text">
            <h1>Task Manager Pro</h1>
            <p className="subtitle">Kelola deadline dan prioritasmu.</p>
          </div>
        </header>

        <main>
          {/* --- FORM INPUT YANG LEBIH LENGKAP --- */}
          <div className="form-container">
            <div className="form-row">
              <input
                name="text"
                type="text"
                placeholder="Judul Tugas (Wajib)..."
                value={formData.text}
                onChange={handleChange}
                className="input-title"
              />
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="input-priority"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <textarea
              name="description"
              placeholder="Deskripsi tugas (opsional)..."
              value={formData.description}
              onChange={handleChange}
              className="input-desc"
            />

            <div className="form-row">
              <input
                name="deadline"
                type="datetime-local" // Input Tanggal & Jam HTML5
                value={formData.deadline}
                onChange={handleChange}
                className="input-date"
              />
              <input
                name="tags"
                type="text"
                placeholder="Tags (pisahkan koma)..."
                value={formData.tags}
                onChange={handleChange}
                className="input-tags"
              />
              <button onClick={addTodo} className="btn-add">
                Simpan Tugas
              </button>
            </div>
          </div>

          {/* --- DAFTAR TUGAS DENGAN DETAIL --- */}
          <div className="todo-list">
            {filteredTodos.map((todo) => {
              const overdue = isOverdue(todo.deadline, todo.completed);

              // PERBAIKAN: Berikan nilai default jika data kosong (untuk support data lama)
              const priority = todo.priority ? todo.priority : "Medium";
              const tags = todo.tags ? todo.tags : [];

              return (
                <div
                  key={todo._id}
                  className={`todo-card ${priority.toLowerCase()} ${
                    todo.completed ? "completed" : ""
                  }`}
                >
                  {/* Bagian Header Card */}
                  <div className="card-header">
                    <div className="badges">
                      <span className={`badge-priority ${priority}`}>
                        {priority}
                      </span>
                      {overdue && (
                        <span className="badge-overdue">⚠️ Terlambat</span>
                      )}
                    </div>
                    {todo.deadline && (
                      <span className="deadline-text">
                        📅 {formatDate(todo.deadline)}
                      </span>
                    )}
                  </div>

                  {/* Bagian Isi Card */}
                  <div className="card-body">
                    <h3 onClick={() => toggleComplete(todo._id)}>
                      {todo.text}
                    </h3>
                    {todo.description && (
                      <p className="desc-text">{todo.description}</p>
                    )}

                    {/* Tags (Gunakan variabel aman 'tags') */}
                    {tags.length > 0 && (
                      <div className="tags-container">
                        {tags.map((tag, idx) => (
                          <span key={idx} className="tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bagian Footer Card */}
                  <div className="card-footer">
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="btn-delete"
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => toggleComplete(todo._id)}
                      className="btn-check"
                    >
                      {todo.completed ? "Batal" : "Selesai"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
