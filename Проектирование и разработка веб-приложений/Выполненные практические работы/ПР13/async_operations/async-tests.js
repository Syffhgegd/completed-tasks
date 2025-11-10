// Загружаем необходимые модули
const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals');

// Импортируем ваши асинхронные функции
import {
    createBasicPromise,
    handleBasicPromise,
    createPromiseChain,
    handlePromiseError,
    setupPromiseEvents,
    basicAsyncAwait,
    handleAsyncError,
    parallelAsyncExecution,
    setupAsyncEvents,
    fetchUsers,
    createPost,
    testApiError,
    setupApiEvents,
    startAsyncInterval,
    stopAsyncInterval,
    delayWithPromise,
    testDelay,
    setupTimerEvents,
    asyncTryCatch,
    handleMultipleErrors,
    retryWithBackoff,
    setupErrorEvents,
    demonstratePromiseAll,
    demonstratePromiseRace,
    demonstratePromiseAllSettled,
    setupParallelEvents,
    sequentialApiRequests,
    simulateFileUpload,
    createRequestCache,
    setupRealScenarioEvents
} from './async-tasks';

// Установка глобальных переменных
global.document = {};
global.window = global;

// Имитация DOM-элементов
document.getElementById = jest.fn(id => ({
    innerText: '',
    insertAdjacentHTML: jest.fn(),
}));

// Очистка состояний перед каждым тестом
beforeEach(() => {
    jest.clearAllMocks();
});

// === ЧАСТЬ 1: ПРОМИСЫ ===

describe('Основные операции с промисами', () => {
    it('createBasicPromise возвращает правильный результат', async() => {
        const result = await createBasicPromise(true);
        expect(result).toEqual('Успех!');
    });

    it('handleBasicPromise правильно обрабатывает успешный результат', async() => {
        await handleBasicPromise();
        expect(document.getElementById.mock.calls.some(call => call.includes('#promise-output'))).toBeTruthy();
    });

    it('createPromiseChain формирует правильную цепочку промисов', async() => {
        await createPromiseChain();
        expect(document.getElementById.mock.calls.some(call => call.includes('#promise-output'))).toBeTruthy();
    });

    it('handlePromiseError выводит правильное сообщение об ошибке', async() => {
        await handlePromiseError();
        expect(document.getElementById.mock.calls.some(call => call.includes('#promise-output'))).toBeTruthy();
    });

    it('setupPromiseEvents устанавливает обработчики событий', () => {
        setupPromiseEvents();
        expect(document.getElementById.mock.calls.some(call => call.includes('#basic-promise'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#promise-chain'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#promise-error'))).toBeTruthy();
    });
});

// === ЧАСТЬ 2: ASYNC/AWAIT ===

describe('Операции с async/await', () => {
    it('basicAsyncAwait возвращает правильный результат', async() => {
        await basicAsyncAwait();
        expect(document.getElementById.mock.calls.some(call => call.includes('#async-output'))).toBeTruthy();
    });

    it('handleAsyncError обрабатывает ошибку', async() => {
        await handleAsyncError();
        expect(document.getElementById.mock.calls.some(call => call.includes('#async-output'))).toBeTruthy();
    });

    it('parallelAsyncExecution правильно выполняет параллельную обработку', async() => {
        await parallelAsyncExecution();
        expect(document.getElementById.mock.calls.some(call => call.includes('#async-output'))).toBeTruthy();
    });

    it('setupAsyncEvents устанавливает обработчики событий', () => {
        setupAsyncEvents();
        expect(document.getElementById.mock.calls.some(call => call.includes('#basic-async'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#async-error'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#async-parallel'))).toBeTruthy();
    });
});

// === ЧАСТЬ 3: РАБОТА С API ===

describe('Работа с внешним API', () => {
    it('fetchUsers получает список пользователей', async() => {
        await fetchUsers();
        expect(document.getElementById.mock.calls.some(call => call.includes('#api-output'))).toBeTruthy();
    });

    it('createPost отправляет пост', async() => {
        await createPost();
        expect(document.getElementById.mock.calls.some(call => call.includes('#api-output'))).toBeTruthy();
    });

    it('testApiError проверяет обработку ошибок API', async() => {
        await testApiError();
        expect(document.getElementById.mock.calls.some(call => call.includes('#api-output'))).toBeTruthy();
    });

    it('setupApiEvents устанавливает обработчики событий', () => {
        setupApiEvents();
        expect(document.getElementById.mock.calls.some(call => call.includes('#fetch-users'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#fetch-post'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#fetch-error'))).toBeTruthy();
    });
});

// === ЧАСТЬ 4: ТАЙМЕРЫ ===

describe('Таймеры и задержки', () => {
    it('startAsyncInterval запускает интервал', () => {
        startAsyncInterval();
        expect(setInterval).toHaveBeenCalledTimes(1);
    });

    it('stopAsyncInterval останавливает интервал', () => {
        stopAsyncInterval();
        expect(clearInterval).toHaveBeenCalledTimes(1);
    });

    it('delayWithPromise возвращает задержанный результат', async() => {
        const result = await delayWithPromise(1000);
        expect(result).toBeUndefined(); // Промис не возвращает значение
    });

    it('testDelay показывает последовательность шагов', async() => {
        await testDelay();
        expect(document.getElementById.mock.calls.some(call => call.includes('#timer-output'))).toBeTruthy();
    });

    it('setupTimerEvents устанавливает обработчики событий', () => {
        setupTimerEvents();
        expect(document.getElementById.mock.calls.some(call => call.includes('#start-interval'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#stop-interval'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#delay-promise'))).toBeTruthy();
    });
});

// === ЧАСТЬ 5: ОБРАБОТКА ОШИБОК ===

describe('Обработка ошибок', () => {
    it('asyncTryCatch обрабатывает ошибки с try/catch', async() => {
        await asyncTryCatch();
        expect(document.getElementById.mock.calls.some(call => call.includes('#error-output'))).toBeTruthy();
    });

    it('handleMultipleErrors корректно обрабатывает множественные ошибки', async() => {
        await handleMultipleErrors();
        expect(document.getElementById.mock.calls.some(call => call.includes('#error-output'))).toBeTruthy();
    });

    it('retryWithBackoff осуществляет повторные попытки', async() => {
        await retryWithBackoff(() => createBasicPromise(false), 3);
        expect(document.getElementById.mock.calls.some(call => call.includes('#error-output'))).toBeTruthy();
    });

    it('setupErrorEvents устанавливает обработчики событий', () => {
        setupErrorEvents();
        expect(document.getElementById.mock.calls.some(call => call.includes('#try-catch'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#multiple-errors'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#retry-pattern'))).toBeTruthy();
    });
});

// === ЧАСТЬ 6: ПАРАЛЛЕЛЬНЫЕ ОПЕРАЦИИ ===

describe('Параллельные операции', () => {
    it('demonstratePromiseAll собирает результаты массива промисов', async() => {
        await demonstratePromiseAll();
        expect(document.getElementById.mock.calls.some(call => call.includes('#parallel-output'))).toBeTruthy();
    });

    it('demonstratePromiseRace выбирает самый быстрый промис', async() => {
        await demonstratePromiseRace();
        expect(document.getElementById.mock.calls.some(call => call.includes('#parallel-output'))).toBeTruthy();
    });

    it('demonstratePromiseAllSettled собирает все результаты независимо от статуса', async() => {
        await demonstratePromiseAllSettled();
        expect(document.getElementById.mock.calls.some(call => call.includes('#parallel-output'))).toBeTruthy();
    });

    it('setupParallelEvents устанавливает обработчики событий', () => {
        setupParallelEvents();
        expect(document.getElementById.mock.calls.some(call => call.includes('#promise-all'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#promise-race'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#promise-allSettled'))).toBeTruthy();
    });
});

// === ЧАСТЬ 7: РЕАЛЬНЫЕ СЦЕНАРИИ ===

describe('Реальные сценарии', () => {
    it('sequentialApiRequests последовательно запрашивает данные', async() => {
        await sequentialApiRequests();
        expect(document.getElementById.mock.calls.some(call => call.includes('#scenario-output'))).toBeTruthy();
    });

    it('simulateFileUpload имитирует процесс загрузки файла', async() => {
        await simulateFileUpload();
        expect(document.getElementById.mock.calls.some(call => call.includes('#scenario-output'))).toBeTruthy();
    });

    it('createRequestCache кэширует запросы', async() => {
        const cachedFetch = createRequestCache();
        const result = await cachedFetch('https://jsonplaceholder.typicode.com/users/1');
        expect(result).not.toBeNull();
    });

    it('setupRealScenarioEvents устанавливает обработчики событий', () => {
        setupRealScenarioEvents();
        expect(document.getElementById.mock.calls.some(call => call.includes('#sequential-requests'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#upload-simulation'))).toBeTruthy();
        expect(document.getElementById.mock.calls.some(call => call.includes('#cache-requests'))).toBeTruthy();
    });
});

// После окончания тестов очищаем mock-функции
afterEach(() => {
    jest.restoreAllMocks();
});