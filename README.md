# TaskFlow – Görev ve Proje Yönetim Sistemi API

Node.js ve Express.js ile geliştirilmiş, REST API mantığında çalışan bir görev yönetim servisi.
*Node.js ile Backend Programlama – Bitirme Projesi*

## Özellikler

- Görev ekleme, listeleme, detay görüntüleme, güncelleme ve silme (CRUD)
- Görevlere çalışan atama (`assignee`), durum (`status`) ve öncelik (`priority`) takibi
- Logger middleware: her isteğin method, endpoint ve zaman damgası konsola ve `logs/requests.log` dosyasına yazılır
- Veriler `src/data/tasks.json` dosyasında JSON olarak saklanır

## Gereksinimler

- [Node.js](https://nodejs.org) 18 veya üzeri
- npm (Node.js ile birlikte gelir)
- Postman (test için)

## Kurulum

```bash
# 1) Repoyu indirin
git clone <REPO_URL>
cd taskflow

# 2) Bağımlılıkları kurun
npm install

# 3) Sunucuyu başlatın
npm start
```

Sunucu varsayılan olarak `http://localhost:3000` adresinde çalışır.
Farklı port için: `PORT=4000 npm start` (Windows PowerShell: `$env:PORT=4000; npm start`)

Geliştirme modunda (dosya değişince otomatik yeniden başlar): `npm run dev`

## Klasör Yapısı

```
taskflow/
├── server.js                    # Uygulama giriş noktası
├── package.json
├── src/
│   ├── routes/taskRoutes.js     # Routing
│   ├── controllers/taskController.js  # CRUD mantığı
│   ├── middleware/logger.js     # Logger middleware
│   └── data/tasks.json          # JSON veri deposu
├── docs/PROJE_TANITIM.md        # Proje tanıtım dokümanı
├── postman/                     # Postman koleksiyonu
└── screenshots/                 # Postman test ekran görüntüleri
```

## API Uç Noktaları

| Method | Endpoint     | Açıklama                 | Başarılı yanıt |
|--------|--------------|--------------------------|----------------|
| GET    | `/`          | API durum kontrolü       | 200 |
| POST   | `/tasks`     | Yeni görev oluşturur     | 201 |
| GET    | `/tasks`     | Tüm görevleri listeler   | 200 |
| GET    | `/tasks/:id` | Tek görevin detayı       | 200 |
| PUT    | `/tasks/:id` | Görevi günceller         | 200 |
| DELETE | `/tasks/:id` | Görevi siler             | 200 |

Hata durumları: `400` (title eksik / geçersiz JSON), `404` (görev veya endpoint bulunamadı).

### Görev modeli

| Alan        | Tip    | Açıklama |
|-------------|--------|----------|
| `id`        | number | Otomatik atanır |
| `title`     | string | **Zorunlu** |
| `description` | string | Opsiyonel |
| `status`    | string | `pending` (varsayılan), `in-progress`, `completed` |
| `priority`  | string | `low`, `medium` (varsayılan), `high` |
| `assignee`  | string | Göreve atanan kişi (opsiyonel) |
| `createdAt` / `updatedAt` | ISO tarih | Otomatik |

### Örnek istekler

**Görev ekleme** – `POST /tasks`
```json
{
  "title": "Login ekranını geliştir",
  "description": "JWT ile giriş akışı",
  "priority": "high",
  "assignee": "musa"
}
```

**Görev güncelleme** – `PUT /tasks/1`
```json
{ "status": "completed" }
```

## Postman ile Test

1. Postman'de **Import** > `postman/TaskFlow.postman_collection.json` dosyasını seçin.
2. Sunucu çalışırken koleksiyondaki istekleri sırayla çalıştırın.
3. Her isteğin yanıtının ekran görüntüsünü `screenshots/` klasörüne kaydedin
   (ekleme, listeleme, detay, güncelleme, silme).

## Lisans

ISC
