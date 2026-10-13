# TaskFlow – Proje Tanıtım Dokümanı

**Proje:** Görev ve Proje Yönetim Sistemi API Geliştirme Projesi
**Eğitim:** Node.js ile Backend Programlama – Bitirme Projesi (2026)
**Hazırlayan:** Selinay POLAT

## 1. Projenin Amacı

Bu proje, eğitim süresince edinilen Node.js, Express.js, REST API, routing, middleware ve CRUD bilgilerinin uygulamalı olarak gösterilmesi amacıyla geliştirilmiştir. Gerçek hayatta kullanılabilecek bir **Görev ve Proje Yönetim Sistemi API'si** tasarlanmıştır.

## 2. Senaryo

Bir yazılım şirketi, ekip içerisindeki görevleri, projeleri ve çalışanların sorumluluklarını takip etmek istemektedir. Geliştirilen sistem; görevlerin oluşturulmasını, çalışanlara atanmasını, durumlarının takip edilmesini ve önceliklendirilmesini desteklemektedir. Sistem tamamen REST API mantığında geliştirilmiştir.

## 3. Sistem Özeti

| Özellik | Açıklama |
|---------|----------|
| Görev oluşturma | `POST /tasks` ile yeni görev eklenir |
| Çalışana atama | `assignee` alanı ile görev bir çalışana atanır |
| Durum takibi | `pending`, `in-progress`, `completed` |
| Öncelik yönetimi | `low`, `medium`, `high` |
| Listeleme / Detay | `GET /tasks`, `GET /tasks/:id` |
| Güncelleme / Silme | `PUT /tasks/:id`, `DELETE /tasks/:id` |
| Loglama | Logger middleware her isteği kaydeder |

## 4. Teknolojiler

- **Node.js** – çalışma ortamı
- **Express.js** – web sunucusu ve routing
- **JSON dosyası** – veri saklama (`src/data/tasks.json`)
- **Postman** – API testleri

## 5. Veri Modeli

```json
{
  "id": 1,
  "title": "Backend altyapısını kur",
  "description": "Express kurulumu ve klasör yapısı",
  "status": "in-progress",
  "priority": "medium",
  "assignee": "ayse",
  "createdAt": "2026-10-03T10:15:00.000Z",
  "updatedAt": "2026-10-03T10:15:00.000Z"
}
```

## 6. API Mimarisi

İstek akışı: **İstek → Logger middleware → Router → Controller → JSON veri dosyası → Yanıt**

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| POST | `/tasks` | Görev ekleme |
| GET | `/tasks` | Görev listeleme |
| GET | `/tasks/:id` | Görev detayı |
| PUT | `/tasks/:id` | Görev güncelleme |
| DELETE | `/tasks/:id` | Görev silme |

## 7. Temel Middleware

**Logger:** Tüm API isteklerinin method, endpoint ve zaman damgası bilgisini konsola ve `logs/requests.log` dosyasına yazar.
Örnek çıktı: `[2026-10-12T17:40:09.281Z] GET /tasks`

## 8. Test

Tüm CRUD uç noktaları Postman üzerinden test edilmiştir. Test ekran görüntüleri `screenshots/` klasöründe yer almaktadır.

## 9. Kurulum

Çalıştırma adımları için `README.md` dosyasına bakınız.
