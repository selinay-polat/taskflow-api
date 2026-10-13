const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

// ---- Veri katmanı (JSON dosyası) ----
function readTasks() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch (err) {
    return [];
  }
}

function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
}

function nextId(tasks) {
  return tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
}

const ALLOWED_STATUS = ['pending', 'in-progress', 'completed'];
const ALLOWED_PRIORITY = ['low', 'medium', 'high'];

// ---- CRUD ----

// GET /tasks  -> tüm görevleri listele
exports.getAllTasks = (req, res) => {
  const tasks = readTasks();
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
};

// GET /tasks/:id  -> görev detayı
exports.getTaskById = (req, res) => {
  const id = Number(req.params.id);
  const task = readTasks().find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ success: false, message: `${req.params.id} id'li görev bulunamadı` });
  }
  res.status(200).json({ success: true, data: task });
};

// POST /tasks  -> yeni görev ekle
exports.createTask = (req, res) => {
  const { title, description, status, priority, assignee } = req.body || {};

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ success: false, message: 'title alanı zorunludur' });
  }

  const tasks = readTasks();
  const now = new Date().toISOString();

  const newTask = {
    id: nextId(tasks),
    title: title.trim(),
    description: description || '',
    status: ALLOWED_STATUS.includes(status) ? status : 'pending',
    priority: ALLOWED_PRIORITY.includes(priority) ? priority : 'medium',
    assignee: assignee || null,
    createdAt: now,
    updatedAt: now
  };

  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json({ success: true, message: 'Görev oluşturuldu', data: newTask });
};

// PUT /tasks/:id  -> görev güncelle
exports.updateTask = (req, res) => {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `${req.params.id} id'li görev bulunamadı` });
  }

  const { title, description, status, priority, assignee } = req.body || {};
  const task = tasks[index];

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (assignee !== undefined) task.assignee = assignee;
  task.updatedAt = new Date().toISOString();

  tasks[index] = task;
  writeTasks(tasks);

  res.status(200).json({ success: true, message: 'Görev güncellendi', data: task });
};

// DELETE /tasks/:id  -> görev sil
exports.deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: `${req.params.id} id'li görev bulunamadı` });
  }

  const [removed] = tasks.splice(index, 1);
  writeTasks(tasks);

  res.status(200).json({ success: true, message: 'Görev silindi', data: removed });
};
