// Простой тест-раннер
function describe(name, fn) {
    console.group(`🧪 ${name}`);
    fn();
    console.groupEnd();
}

function it(description, testFn) {
    try {
        testFn();
        console.log(`✅ ${description}`);
    } catch (e) {
        console.error(`❌ ${description}:`, e.message);
    }
}

// ========== ТЕСТЫ ==========

describe('Задание 1: Создание элементов', () => {
    it('createCard создаёт карточку и добавляет в #target1', () => {
        createCard('Test', 'Content');
        const cards = document.querySelectorAll('#target1 .card');
        if (cards.length < 1) throw new Error('Карточка не создана');
        const card = cards[cards.length - 1];
        if (card.querySelector('h4').textContent !== 'Test') throw new Error('Неверный заголовок');
        if (card.querySelector('p').textContent !== 'Content') throw new Error('Неверный текст');
    });

    it('createList создаёт ol из массива', () => {
        createList(['a', 'b']);
        const lists = document.querySelectorAll('#target1 ol');
        const lastList = lists[lists.length - 1];
        if (!lastList) throw new Error('Список не создан');
        const items = lastList.querySelectorAll('li');
        if (items.length !== 2) throw new Error('Неверное количество элементов');
        if (items[0].textContent !== 'a') throw new Error('Неверный первый элемент');
    });

    it('createList игнорирует не-массивы', () => {
        const target = document.getElementById('target1');
        const before = target.children.length;
        createList(null);
        createList('not array');
        if (target.children.length !== before) throw new Error('Функция должна игнорировать невалидные входные данные');
    });
});

describe('Задание 2: Навигация по DOM', () => {
    it('countChildren возвращает число элементов', () => {
        const n = countChildren();
        if (typeof n !== 'number') throw new Error('Должно быть число');
        if (n !== 5) throw new Error(`Ожидалось 5, получено ${n}`);
    });

    it('findSpecialChild находит элемент с классом .special', () => {
        const text = findSpecialChild();
        if (text !== 'Особый ребёнок') throw new Error(`Ожидалось "Особый ребёнок", получено "${text}"`);
    });

    it('findSpecialChild возвращает пустую строку, если нет .special', () => {
        // Удалим временно
        const special = document.querySelector('.special');
        if (special) special.classList.remove('special');
        const text = findSpecialChild();
        if (text !== '') throw new Error('Должна быть пустая строка, если нет .special');
        // Восстановим
        if (special) special.classList.add('special');
    });

    it('getParentBackground возвращает цвет фона', () => {
        const bg = getParentBackground();
        if (!bg || bg === 'rgba(0, 0, 0, 0)') throw new Error('Цвет фона не получен или прозрачный');
        if (!bg.startsWith('rgb')) throw new Error(`Некорректный формат: ${bg}`);
    });
});

describe('Задание 3–6: События, формы, список', () => {
    it('setupClickCounter увеличивает счётчик', () => {
        const btn = document.getElementById('click-btn');
        const counter = document.getElementById('click-counter');
        const before = parseInt(counter.textContent);
        btn.click();
        if (parseInt(counter.textContent) !== before + 1) throw new Error('Счётчик не увеличился');
    });

    it('setupInputDisplay обновляет текст в реальном времени', () => {
        const input = document.getElementById('text-input');
        const display = document.getElementById('input-display');
        input.value = 'тест';
        input.dispatchEvent(new Event('input'));
        if (display.textContent !== 'тест') throw new Error('Текст не обновился');
    });

    it('addListItem добавляет элемент в список', () => {
        const input = document.getElementById('item-input');
        input.value = 'Тестовый элемент';
        addListItem();
        const items = document.querySelectorAll('#dynamic-list .list-item');
        if (items.length < 1) throw new Error('Элемент не добавлен');
        if (items[items.length - 1].querySelector('span').textContent !== 'Тестовый элемент') throw new Error('Неверный текст');
    });

    it('removeListItem удаляет li при клике на кнопку', () => {
        const lastItem = document.querySelector('#dynamic-list .list-item:last-child button');
        if (lastItem) {
            const countBefore = document.querySelectorAll('#dynamic-list .list-item').length;
            lastItem.click();
            const countAfter = document.querySelectorAll('#dynamic-list .list-item').length;
            if (countAfter !== countBefore - 1) throw new Error('Элемент не удалён');
        }
    });

    it('validateForm возвращает ошибки при невалидных данных', () => {
        const form = document.getElementById('user-form');
        const formData = new FormData();
        formData.append('name', 'X'); // <2
        formData.append('email', 'invalid');
        formData.append('age', '200');

        const errors = validateForm(formData);
        if (!errors) throw new Error('Ожидались ошибки');
        if (!errors.name || !errors.email || !errors.age) throw new Error('Не все ошибки найдены');
    });

    it('validateForm возвращает null при валидных данных', () => {
        const formData = new FormData();
        formData.append('name', 'Анна');
        formData.append('email', 'test@example.com');
        formData.append('age', '25');
        const errors = validateForm(formData);
        if (errors !== null) throw new Error('Ожидались корректные данные без ошибок');
    });

    it('clearList очищает список', () => {
        clearList();
        const items = document.querySelectorAll('#dynamic-list li');
        if (items.length !== 0) throw new Error('Список не очищен');
    });
});

console.log('✔️ Все тесты запущены. Проверьте консоль.');