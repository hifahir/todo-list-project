import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Sidebar from "./sidebar";

// Pastikan URL ini sesuai dengan backend Anda (Localhost atau Render)
const API_URL = "http://localhost:5000/api/todos"; 

function App() {
  // --- STATE ---
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // State untuk Mode Edit
  const [editId, setEditId] = useState(null);

  // State untuk Data Form (Gabungan)
  const [formData, setFormData] = useState({
    text: "",
    description: "",
    deadline: "",
    priority: "Medium",
    tags: ""
  });

  // --- HANDLER FUNCTIONS ---

  // 1. Mengambil data saat aplikasi dimuat
  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      setTodos(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal ambil data:", error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchTodos(); }, []);

  // 2. Mengurus perubahan input form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. FUNGSI UTAMA: SIMPAN & UPDATE (Pengganti addTodo)
  const handleSubmit = async () => {
    // Validasi: Judul tidak boleh kosong
    if (!formData.text.trim()) {
      alert("Judul tugas wajib diisi!");
      return;
    }

    try {
      // Format tags dari string "a, b" menjadi array ["a", "b"]
      const payload = {
        ...formData,
        tags: typeof formData.tags === 'string' && formData.tags 
              ? formData.tags.split(',').map(tag => tag.trim()) 
              : formData.tags
      };

      if (editId) {
        // --- MODE UPDATE ---
        const response = await axios.patch(`${API_URL}/${editId}`, payload);
        
        // Update state lokal
        setTodos(todos.map(todo => (todo._id === editId ? response.data : todo)));
        setEditId(null); // Keluar mode edit
      } else {
        // --- MODE CREATE (TAMBAH BARU) ---
        const response = await axios.post(API_URL, payload);
        setTodos([response.data, ...todos]);
      }
      
      // Reset Form jadi kosong
      setFormData({ text: "", description: "", deadline: "", priority: "Medium", tags: "" });

    } catch (error) {
      console.error("Gagal menyimpan tugas:", error);
      alert("Terjadi kesalahan saat menyimpan.");
    }
  };

  // 4. Masuk ke Mode Edit (Isi form dengan data tugas)
  const handleEdit = (todo) => {
    setEditId(todo._id);
    
    // Format tanggal agar bisa masuk ke input HTML
    let formattedDate = "";
    if (todo.deadline) {
       const date = new Date(todo.deadline);
       // Trik mengatasi zona waktu
       const offset = date.getTimezoneOffset() * 60000;
       formattedDate = new Date(date.getTime() - offset).toISOString().slice(0, 16);
    }

    setFormData({
      text: todo.text,
      description: todo.description || "",
      deadline: formattedDate,
      priority: todo.priority || "Medium",
      tags: todo.tags ? todo.tags.join(', ') : ""
    });
    
    // Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 5. Batal Edit
  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({ text: "", description: "", deadline: "", priority: "Medium", tags: "" });
  };

  // 6. Delete Tugas
  const deleteTodo = async (id) => {
      if(!window.confirm("Yakin hapus tugas ini?")) return;

      try {
        await axios.delete(`${API_URL}/${id}`);
        setTodos(todos.filter((todo) => todo._id !== id));
      } catch (error) { console.error(error); }
  };

  // 7. Toggle Selesai
  const toggleComplete = async (id) => {
      try {
        // Kirim body kosong {} karena backend menangani toggle jika body kosong
        const response = await axios.patch(`${API_URL}/${id}`, {}); 
        setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      } catch (error) { console.error(error); }
  };

  // --- HELPER FUNCTIONS ---
  const isOverdue = (deadline, completed) => {
    if (!deadline || completed) return false;
    return new Date(deadline) < new Date();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (loading) return <div className="loading">Loading...</div>;

  // --- TAMPILAN (JSX) ---
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
          {/* --- FORM INPUT --- */}
          <div className="form-container" style={editId ? {border: '2px solid #ffa502'} : {}}>
            
            {editId && (
              <div style={{marginBottom: '10px', color: '#ffa502', fontWeight: 'bold'}}>
                ✏️ Sedang Mengedit Tugas
              </div>
            )}

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
                type="datetime-local"
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

              {/* TOMBOL AKSI */}
              {editId ? (
                 <div style={{display: 'flex', gap: '5px'}}>
                   <button 
                     onClick={handleSubmit} 
                     className="btn-add" 
                     style={{backgroundColor: '#ffa502'}}
                   >
                     Update
                   </button>
                   <button 
                     onClick={handleCancelEdit} 
                     className="btn-add" 
                     style={{backgroundColor: '#747d8c'}}
                   >
                     Batal
                   </button>
                 </div>
              ) : (
                 <button onClick={handleSubmit} className="btn-add">
                   Simpan Tugas
                 </button>
              )}
            </div>
          </div>

          {/* --- LIST TUGAS --- */}
          <div className="todo-list">
            {filteredTodos.map((todo) => {
              const overdue = isOverdue(todo.deadline, todo.completed);
              const priority = todo.priority ? todo.priority : "Medium";
              const tags = todo.tags ? todo.tags : [];

              return (
                <div
                  key={todo._id}
                  className={`todo-card ${priority.toLowerCase()} ${
                    todo.completed ? "completed" : ""
                  }`}
                >
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

                  <div className="card-body">
                    <h3 onClick={() => toggleComplete(todo._id)}>
                      {todo.text}
                    </h3>
                    {todo.description && (
                      <p className="desc-text">{todo.description}</p>
                    )}

                    {tags.length > 0 && (
                      <div className="tags-container">
                        {tags.map((tag, idx) => (
                          <span key={idx} className="tag">#{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="card-footer">
                    <button 
                      onClick={() => handleEdit(todo)} 
                      className="btn-edit"
                    >
                      ✏️ Edit
                    </button>

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