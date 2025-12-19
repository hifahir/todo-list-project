const express = require('express');
const { getAllTodos, addTodo, updateTodo, deleteTodo } = require('../controllers/todoControllers');

const router = express.Router();

router.get('/todos', getAllTodos);
router.post('/todos', addTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;