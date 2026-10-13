const express = require('express');
const logger = require('./src/middleware/logger');
const taskRoutes = require('./src/routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// JSON gövdesini okumak için
app.use(express.json());

// Temel middleware: tüm istekleri kayıt altına alır
app.use(logger);

// Sağlık kontrolü
app.get('/', (req, res) => {
  res.json({
    name: 'TaskFlow API',
    message: 'Görev ve Proje Yönetim Sistemi API çalışıyor',
    endpoints: '/tasks'
  });
});

// Görev yönetim modülü
app.use('/tasks', taskRoutes);

// Tanımsız route (404)
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Endpoint bulunamadı' });
});

// Hatalı JSON gövdesi vb. genel hata yakalama
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Geçersiz JSON gövdesi' });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Sunucu hatası' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`TaskFlow API http://localhost:${PORT} adresinde çalışıyor`);
  });
}

module.exports = app;
