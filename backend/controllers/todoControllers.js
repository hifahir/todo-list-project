const ToDo = require('../models/ToDo');

// Mendapatkan semua tugas
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await ToDo.find().sort({ createdAt: -1 });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mendapatkan tugas', error });
    }
};

// Menambahkan tugas baru
exports.addTodo = async (req, res) => {
    try {
        const { text, description, deadline, priority, tags } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Judul tugas diperlukan' });
        }
        const newTodo = new ToDo({ 
            text, description, deadline, priority, tags 
        });
        
        const todo = await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Gagal menambahkan tugas', error });
    }
};

// Memperbarui status tugas
exports.updateTodo = async (req, res) => {
    try {
        const task = await ToDo.findById(req.params.id);
        
        if (!task) {
            return res.status(404).json({ msg: 'Tugas tidak ditemukan' });
        }

        const updatedTodo = await ToDo.findByIdAndUpdate(
            req.params.id,
            { completed: !task.completed }, // Ambil status dari variabel 'task'
            { new: true } 
        );
        
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Menghapus tugas
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await ToDo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Tugas tidak ditemukan' });
        }
        res.status(200).json({ message: 'Tugas berhasil dihapus' });;
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus tugas', error });
    }
};