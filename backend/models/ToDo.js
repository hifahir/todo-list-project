const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'Judul tugas diperlukan'],
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
    deadline: {
        type: Date,
    },
    prioryty: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    tags: {
        type: [String],
        default: [],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('ToDo', ToDoSchema);