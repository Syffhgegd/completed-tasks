# Ответы на вопросы самоконтроля (ПР14)

1. **Fetch vs XHR**:  
   Fetch — современный, промис-ориентированный, проще в использовании, поддерживает потоки, `AbortController`. XHR — callback-based, сложнее, но позволяет отслеживать прогресс (`onprogress`). Fetch не отправляет куки по умолчанию (`credentials: 'include'`), XHR — да.

2. **Ошибки в Fetch**:  
   `fetch()` **не отклоняет промис** при HTTP-ошибках (404, 500). Reject происходит **только при сетевых ошибках** (DNS, offline). Поэтому обязательно проверяйте `response.ok` или `response.status`.

3. **HTTP-методы**:  
   - `GET` — получение данных  
   - `POST` — создание  
   - `PUT` — полное обновление ресурса  
   - `PATCH` — частичное обновление  
   - `DELETE` — удаление

4. **Заголовки**:  
   В запросе — объект `headers: { 'Key': 'Value' }`.  
   В ответе — `response.headers.get('key')` или `.forEach()`.  
   Примеры: `Content-Type`, `Authorization`, `Accept`, `Cache-Control`, `X-Requested-With`.

5. **PUT vs PATCH**:  
   `PUT` заменяет **весь ресурс**, требует все поля. `PATCH` обновляет **только указанные поля**. Используйте `PATCH` для экономии трафика и гибкости.

6. **Авторизация**:  
   - Basic: `Authorization: Basic base64(user:pass)`  
   - Bearer: `Authorization: Bearer <token>`  
   - OAuth2: передаётся как `Bearer token` в заголовке или параметре.

7. **Отмена запросов**:  
   Через `AbortController` + `signal`. Используется при уходе со страницы, таймаутах, отмене пользователем.

8. **Форматы данных**:  
   - JSON: `JSON.stringify()` + `body`, `response.json()`  
   - FormData: `new FormData()` → авто-Content-Type, `response.formData()`  
   - Blob: `response.blob()` → `URL.createObjectURL()`  
   - ArrayBuffer: `response.arrayBuffer()` — для бинарных данных (аудио, zip и т.д.)

9. **Оптимизация**:  
   - `Promise.all()` для параллельных запросов  
   - Кэширование (в памяти, localStorage, SW)  
   - Отмена ненужных запросов  
   - Пагинация и фильтрация на сервере

10. **Лучшие практики**:  
    - Всегда проверяйте `response.ok`  
    - Обрабатывайте и сетевые, и HTTP-ошибки  
    - Выносите повторяющийся код в обёртки (`api.get()`)  
    - Не храните токены в `localStorage` (риск XSS)  
    - Используйте `credentials: 'same-origin'` при необходимости кук