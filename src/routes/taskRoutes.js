const express = require('express');
const controller = require('../controllers/taskController');

const router = express.Router();

router.get('/', controller.getAllTasks);       // Görev listeleme
router.get('/:id', controller.getTaskById);    // Görev detayı
router.post('/', controller.createTask);       // Görev ekleme
router.put('/:id', controller.updateTask);     // Görev güncelleme
router.delete('/:id', controller.deleteTask);  // Görev silme

module.exports = router;
