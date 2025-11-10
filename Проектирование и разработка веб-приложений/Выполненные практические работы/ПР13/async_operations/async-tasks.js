document.addEventListener('DOMContentLoaded', () => {
    // Основной код асинхронных операций

    // === АСИНХРОННЫЕ ОПЕРАЦИИ - ОСНОВНЫЕ ЗАДАНИЯ ===
    // ЗАДАНИЕ 1: Основы промисов
    // 1.1. Создаем базовый промис
    function createBasicPromise(shouldResolve = true) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldResolve) resolve("Успех!");
                else reject("Ошибка!");
            }, 1000);
        });
    }

    // 1.2. Обрабатываем базовый промис
    function handleBasicPromise() {
        createBasicPromise(true).then(result => {
            document.getElementById('promise-output').innerText += "\nРезультат: " + result;
        }).catch(error => {
            document.getElementById('promise-output').innerText += "\nОшибка: " + error;
        });
    }

    // 1.3. Цепочка промисов
    function createPromiseChain() {
        let promiseResult = "";
        createBasicPromise(true)
            .then(result => {
                promiseResult += result + ", ";
                return createBasicPromise(true); // Следующая операция
            })
            .then(result => {
                promiseResult += result + ", ";
                return createBasicPromise(true); // Последняя операция
            })
            .then(result => {
                promiseResult += result;
                document.getElementById('promise-output').innerText += "\nЦепочка: " + promiseResult;
            })
            .catch(error => {
                document.getElementById('promise-output').innerText += "\nОшибка в цепи: " + error;
            });
    }

    // 1.4. Обработка ошибки в промисах
    function handlePromiseError() {
        createBasicPromise(false).catch(error => {
            document.getElementById('promise-output').innerText += "\nОшибка промиса: " + error;
        });
    }

    // Настройка обработчиков кнопок
    function setupPromiseEvents() {
        document.getElementById('basic-promise').addEventListener('click', handleBasicPromise);
        document.getElementById('promise-chain').addEventListener('click', createPromiseChain);
        document.getElementById('promise-error').addEventListener('click', handlePromiseError);
    }

    // === ASYNC/AWAIT ===
    // 2.1. Простое async/await
    async function basicAsyncAwait() {
        try {
            const result = await createBasicPromise(true);
            document.getElementById('async-output').innerText += "\nРезультат async/await: " + result;
        } catch (error) {
            document.getElementById('async-output').innerText += "\nОшибка async/await: " + error;
        }
    }

    // 2.2. Обработка ошибки async/await
    async function handleAsyncError() {
        try {
            await createBasicPromise(false);
        } catch (error) {
            document.getElementById('async-output').innerText += "\nОшибка async/await: " + error;
        }
    }

    // 2.3. Параллельное выполнение async/await
    async function parallelAsyncExecution() {
        const promises = [
            createBasicPromise(true),
            createBasicPromise(true),
            createBasicPromise(true)
        ];
        const results = await Promise.all(promises);
        document.getElementById('async-output').innerText += "\nПараллельный результат: " + results.join(', ');
    }

    // Настройка обработчиков кнопок async/await
    function setupAsyncEvents() {
        document.getElementById('basic-async').addEventListener('click', basicAsyncAwait);
        document.getElementById('async-error').addEventListener('click', handleAsyncError);
        document.getElementById('async-parallel').addEventListener('click', parallelAsyncExecution);
    }

    // === РАБОТА С API ===
    // 3.1. Получение списка пользователей
    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            document.getElementById('api-output').innerHTML = '';
            users.forEach(user => {
                const card = `<div style="border: 1px solid black; padding: 10px; margin-bottom: 10px;">Имя: ${user.name}<br>Email: ${user.email}</div>`;
                document.getElementById('api-output').insertAdjacentHTML('beforeend', card);
            });
        } catch (error) {
            document.getElementById('api-output').innerText = "Ошибка при получении пользователей.";
        }
    }

    // 3.2. Отправка поста
    async function createPost() {
        try {
            const postData = { title: 'Новый заголовок', body: 'Контент нового поста.', userId: 1 };
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });
            const data = await response.json();
            document.getElementById('api-output').innerText = "Пост успешно отправлен: " + JSON.stringify(data);
        } catch (error) {
            document.getElementById('api-output').innerText = "Ошибка отправки поста.";
        }
    }

    // 3.3. Тестовая ошибка API
    async function testApiError() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/nouser');
            const data = await response.json();
            document.getElementById('api-output').innerText = "Получены данные: " + JSON.stringify(data);
        } catch (error) {
            document.getElementById('api-output').innerText = "Ошибка API: " + error.message;
        }
    }

    // Настройка обработчиков кнопок API
    function setupApiEvents() {
        document.getElementById('fetch-users').addEventListener('click', fetchUsers);
        document.getElementById('fetch-post').addEventListener('click', createPost);
        document.getElementById('fetch-error').addEventListener('click', testApiError);
    }

    // === ТАЙМЕРЫ ===
    // 4.1. Интервал
    let intervalId;
    async function startAsyncInterval() {
        let counter = 0;
        intervalId = setInterval(async() => {
            counter++;
            document.getElementById('timer-output').innerText = "Интервал: " + counter;
        }, 1000);
    }

    // 4.2. Остановка интервала
    function stopAsyncInterval() {
        clearInterval(intervalId);
        document.getElementById('timer-output').innerText = "Интервал остановлен";
    }

    // 4.3. Задержка с промисом
    function delayWithPromise(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 4.4. Тест задержки
    async function testDelay() {
        for (let i = 0; i < 3; i++) {
            await delayWithPromise(1000 * (i + 1)); // Увеличенная задержка
            document.getElementById('timer-output').innerText += "\nПрогресс теста задержки: Шаг " + (i + 1);
        }
    }

    // Настройка обработчиков таймеров
    function setupTimerEvents() {
        document.getElementById('start-interval').addEventListener('click', startAsyncInterval);
        document.getElementById('stop-interval').addEventListener('click', stopAsyncInterval);
        document.getElementById('delay-promise').addEventListener('click', testDelay);
    }

    // === ОБРАБОТКА ОШИБОК ===
    // 5.1. Примеры try/catch
    async function asyncTryCatch() {
        try {
            await createBasicPromise(false); // Это приведет к ошибке
        } catch (error) {
            document.getElementById('error-output').innerText = "Ошибка async/await: " + error;
        }
    }

    // 5.2. Несколько ошибок
    async function handleMultipleErrors() {
        const results = await Promise.allSettled([
            createBasicPromise(true),
            createBasicPromise(false),
            createBasicPromise(true)
        ]);
        document.getElementById('error-output').innerText = "Статистика: выполнено успешно " +
            results.filter(r => r.status === 'fulfilled').length + "/" + results.length;
    }

    // 5.3. Повторные попытки
    async function retryWithBackoff(operation, maxRetries = 3) {
        let retries = 0;
        while (retries <= maxRetries) {
            try {
                return await operation(); // Пробуем операцию
            } catch (error) {
                retries++;
                console.log(`Ошибка, попытка №${retries}`);
                await delayWithPromise(Math.pow(retries, 2) * 1000); // Экспоненциальная задержка
            }
        }
        throw new Error("Превышено количество попыток");
    }

    // Настройка обработчиков ошибок
    function setupErrorEvents() {
        document.getElementById('try-catch').addEventListener('click', asyncTryCatch);
        document.getElementById('multiple-errors').addEventListener('click', handleMultipleErrors);
        document.getElementById('retry-pattern').addEventListener('click', async() => {
            await retryWithBackoff(createBasicPromise.bind(null, false));
        });
    }

    // === ПАРАЛЛЕЛЬНЫЕ ОПЕРАЦИИ ===
    // 6.1. Parallel execution with Promise.all
    async function demonstratePromiseAll() {
        const promises = Array.from({ length: 5 }, (_, index) =>
            delayWithPromise(index * 1000).then(() => `Выполнено через ${index}s`)
        );
        const results = await Promise.all(promises);
        document.getElementById('parallel-output').innerText = "Все выполнены одновременно:\n" + results.join('\n');
    }

    // 6.2. Promise race
    async function demonstratePromiseRace() {
        const promises = [
            delayWithPromise(3000).then(() => "Долго"),
            delayWithPromise(1000).then(() => "Быстро")
        ];
        const firstResult = await Promise.race(promises);
        document.getElementById('parallel-output').innerText = "Победил промис: " + firstResult;
    }

    // 6.3. Все обещания завершились
    async function demonstratePromiseAllSettled() {
        const promises = [
            createBasicPromise(true),
            createBasicPromise(false),
            createBasicPromise(true)
        ];
        const results = await Promise.allSettled(promises);
        document.getElementById('parallel-output').innerText = "Итог: " + JSON.stringify(results.map(r => `${r.status}: ${r.value || r.reason}`));
    }

    // Настройка обработчиков параллельных операций
    function setupParallelEvents() {
        document.getElementById('promise-all').addEventListener('click', demonstratePromiseAll);
        document.getElementById('promise-race').addEventListener('click', demonstratePromiseRace);
        document.getElementById('promise-allSettled').addEventListener('click', demonstratePromiseAllSettled);
    }

    // === РЕАЛЬНЫЕ СЦЕНАРИИ ===
    // 7.1. Последовательные запросы
    async function sequentialApiRequests() {
        try {
            const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
            const user = await userResponse.json();
            const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
            const posts = await postsResponse.json();
            const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${posts[0].id}`);
            const comments = await commentsResponse.json();
            document.getElementById('scenario-output').innerText =
                `Пользователь: ${user.name}\nПосты: ${posts.length}\nКомментариев: ${comments.length}`;
        } catch (error) {
            document.getElementById('scenario-output').innerText = "Ошибка сценария: " + error;
        }
    }

    // 7.2. Симуляция загрузки файла
    async function simulateFileUpload() {
        const totalSteps = 10;
        for (let step = 0; step <= totalSteps; step++) {
            await delayWithPromise(step * 100);
            document.getElementById('scenario-output').innerText = `Загрузка... (${(step / totalSteps * 100).toFixed(0)}%)`;
        }
        document.getElementById('scenario-output').innerText = "Файл загружен!";
    }

    // 7.3. Кэширование запросов
    function createRequestCache() {
        const cache = new Map();
        return async function cachedRequest(url) {
            if (!cache.has(url)) {
                const response = await fetch(url);
                const data = await response.json();
                cache.set(url, data);
            }
            return cache.get(url);
        };
    }

    // Настройка обработчиков реальных сценариев
    function setupRealScenarioEvents() {
        document.getElementById('sequential-requests').addEventListener('click', sequentialApiRequests);
        document.getElementById('upload-simulation').addEventListener('click', simulateFileUpload);
        document.getElementById('cache-requests').addEventListener('click', async() => {
            const cachedFetch = createRequestCache();
            const result = await cachedFetch('https://jsonplaceholder.typicode.com/users/1');
            document.getElementById('scenario-output').innerText = "Закэшированные данные: " + JSON.stringify(result);
        });
    }

    // === ИНИЦИАЛИЗАЦИЯ ВСЕХ СОБЫТИЙ ===
    setupPromiseEvents();
    setupAsyncEvents();
    setupApiEvents();
    setupTimerEvents();
    setupErrorEvents();
    setupParallelEvents();
    setupRealScenarioEvents();
});