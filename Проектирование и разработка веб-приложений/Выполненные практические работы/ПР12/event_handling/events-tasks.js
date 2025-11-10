// =============== ЗАДАНИЕ 1: Базовые обработчики ===============

function handleBasicClick(event) {
    var output = document.getElementById('basic-output');
    if (!output) return;

    var info = [
        'Тип: ' + event.type,
        'Цель: #' + (event.target.id || event.target.tagName.toLowerCase()),
        'Координаты: (' + event.clientX + ', ' + event.clientY + ')'
    ].join('<br>');

    output.innerHTML = info;

    // Добавляем анимацию
    var btn = event.target;
    btn.classList.add('pulse');
    setTimeout(function() {
        btn.classList.remove('pulse');
    }, 500);
}

function handleMouseEvents(event) {
    var box = document.getElementById('color-box');
    var output = document.getElementById('mouse-output');
    if (!box || !output) return;

    if (event.type === 'mouseenter') {
        box.style.backgroundColor = '#e74c3c';
    } else if (event.type === 'mouseleave') {
        box.style.backgroundColor = '#3498db';
    } else if (event.type === 'mousemove') {
        output.innerHTML = 'Координаты: (' + event.clientX + ', ' + event.clientY + ')';
    }
}

function setupBasicEvents() {
    var btn = document.getElementById('basic-btn');
    var box = document.getElementById('color-box');
    if (btn) {
        btn.addEventListener('click', handleBasicClick);
    }
    if (box) {
        box.addEventListener('mouseenter', handleMouseEvents);
        box.addEventListener('mouseleave', handleMouseEvents);
        box.addEventListener('mousemove', handleMouseEvents);
    }
}

// =============== ЗАДАНИЕ 2: Клавиатура ===============

function handleKeyEvents(event) {
    var output = document.getElementById('key-output');
    if (!output) return;

    var keyInfo = [
        'key: "' + event.key + '"',
        'code: "' + event.code + '"',
        'ctrlKey: ' + event.ctrlKey,
        'altKey: ' + event.altKey,
        'shiftKey: ' + event.shiftKey
    ].join(', ');

    var message = 'Нажата клавиша: ' + keyInfo;

    // Обработка комбинаций
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        message += ' → [Ctrl+S] перехвачено!';
    } else if (event.altKey && event.key === 'c') {
        event.preventDefault();
        message += ' → [Alt+C] перехвачено!';
    } else if (event.shiftKey && event.key === 'A') {
        event.preventDefault();
        message += ' → [Shift+A] перехвачено!';
    }

    output.innerHTML = message;
}

function setupKeyboardEvents() {
    var input = document.getElementById('key-input');
    if (input) {
        input.addEventListener('keydown', handleKeyEvents);
    }
}

// =============== ЗАДАНИЕ 3: Делегирование ===============

function handleDelegationClick(event) {
    var list = document.getElementById('item-list');
    if (!list) return;

    if (event.target.classList.contains('item')) {
        event.target.classList.toggle('selected');
        updateDelegationOutput();
    } else if (event.target.classList.contains('delete')) {
        var item = event.target.closest('.item');
        if (item) item.remove();
        updateDelegationOutput();
    }
}

function updateDelegationOutput() {
    var selected = document.querySelectorAll('#item-list .item.selected');
    var output = document.getElementById('delegation-output');
    if (output) {
        output.innerHTML = 'Выбрано: ' + selected.length;
    }
}

function addNewItem() {
    var list = document.getElementById('item-list');
    if (!list) return;

    var items = list.querySelectorAll('.item');
    var nextId = items.length + 1;

    var li = document.createElement('li');
    li.className = 'item';
    li.setAttribute('data-id', nextId);
    li.innerHTML = 'Элемент ' + nextId + ' <button class="delete">×</button>';

    list.appendChild(li);
}

function setupDelegationEvents() {
    var list = document.getElementById('item-list');
    var addBtn = document.getElementById('add-item-btn');
    if (list) {
        list.addEventListener('click', handleDelegationClick);
    }
    if (addBtn) {
        addBtn.addEventListener('click', addNewItem);
    }
    updateDelegationOutput(); // инициализация
}

// =============== ЗАДАНИЕ 4: Предотвращение поведения ===============

function preventLinkDefault(event) {
    event.preventDefault();

    var output = document.getElementById('prevention-output');
    var link = document.getElementById('prevent-link');
    if (output) {
        output.innerHTML = '🔗 Ссылка перехвачена! Стандартный переход отменён.';
    }
    if (link) {
        link.classList.add('shake');
        setTimeout(function() {
            link.classList.remove('shake');
        }, 500);
    }
}

function preventFormSubmit(event) {
    event.preventDefault();

    var form = event.target;
    var input = form.querySelector('input[name="text"]');
    var output = document.getElementById('prevention-output');

    var value = input ? input.value.trim() : '';
    if (value === '') {
        if (output) output.innerHTML = '❌ Поле пустое — валидация не пройдена.';
        return;
    }

    if (output) {
        output.innerHTML = '✅ Форма перехвачена. Введено: <strong>' + value + '</strong>';
    }
}

function setupPreventionEvents() {
    var link = document.getElementById('prevent-link');
    var form = document.getElementById('prevent-form');
    if (link) link.addEventListener('click', preventLinkDefault);
    if (form) form.addEventListener('submit', preventFormSubmit);
}

// =============== ЗАДАНИЕ 5: Кастомные события ===============

function triggerCustomEvent() {
    var event = new CustomEvent('customAction', {
        detail: {
            message: 'Привет от кастомного события!',
            timestamp: new Date().toLocaleTimeString()
        },
        bubbles: true,
        cancelable: true
    });
    document.dispatchEvent(event);
}

function handleCustomEvent(event) {
    var output = document.getElementById('custom-output');
    if (output) {
        output.innerHTML = '📬 ' + event.detail.message +
            ' (время: ' + event.detail.timestamp + ')';
    }
    var btn = document.getElementById('trigger-custom');
    if (btn) {
        btn.classList.add('pulse');
        setTimeout(function() {
            btn.classList.remove('pulse');
        }, 500);
    }
}

function setupMultipleListeners() {
    var counter = 1;

    function createHandler(n) {
        return function() {
            console.log('Обработчик #' + n + ' сработал');
        };
    }

    for (var i = 1; i <= 3; i++) {
        document.addEventListener('customAction', createHandler(i));
    }
    console.log('✅ Добавлено 3 обработчика для customAction');
}

function setupCustomEvents() {
    document.addEventListener('customAction', handleCustomEvent);

    var triggerBtn = document.getElementById('trigger-custom');
    var multiBtn = document.getElementById('multiple-listeners');

    if (triggerBtn) triggerBtn.addEventListener('click', triggerCustomEvent);
    if (multiBtn) multiBtn.addEventListener('click', setupMultipleListeners);
}

// =============== ЗАДАНИЕ 6: Загрузка и ошибки ===============

function loadImageWithEvents() {
    var container = document.getElementById('image-container');
    var output = document.getElementById('loading-output');
    if (!container || !output) return;

    // Очистка
    container.innerHTML = '';
    output.innerHTML = 'Статус: загрузка...';

    var img = document.createElement('img');
    img.src = 'https://picsum.photos/300/200?random=' + Date.now();

    img.addEventListener('load', function() {
        output.innerHTML = '✅ Изображение загружено';
        container.appendChild(img);
    });

    img.addEventListener('error', function() {
        output.innerHTML = '❌ Ошибка загрузки изображения';
    });

    // loadstart/loadend — не срабатывают на <img>, но можно эмулировать
    // Здесь просто покажем начало:
    // (реально — только load/error)
}

function simulateLoadError() {
    var container = document.getElementById('image-container');
    var output = document.getElementById('loading-output');
    if (!container || !output) return;

    container.innerHTML = '';
    output.innerHTML = 'Статус: попытка загрузки...';

    var img = document.createElement('img');
    img.src = 'https://example.com/nonexistent.jpg?' + Date.now();

    img.addEventListener('error', function() {
        output.innerHTML = '💥 Ошибка: ресурс не найден (404)';
    });
}

function setupLoadingEvents() {
    var loadBtn = document.getElementById('load-image');
    var errorBtn = document.getElementById('load-error');
    if (loadBtn) loadBtn.addEventListener('click', loadImageWithEvents);
    if (errorBtn) errorBtn.addEventListener('click', simulateLoadError);
}

// =============== ЗАДАНИЕ 7: Таймеры и оптимизация ===============

var timerInterval = null;
var timerValue = 0;

function startTimer() {
    if (timerInterval) return; // уже запущен

    timerInterval = setInterval(function() {
        timerValue++;
        var output = document.getElementById('timer-output');
        if (output) output.textContent = timerValue;
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    // Не сбрасываем значение — по ТЗ: "сбросить timerValue" — сделаем:
    timerValue = 0;
    var output = document.getElementById('timer-output');
    if (output) output.textContent = '0';
}

function createDebounce(func, delay) {
    var timeoutId;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    };
}

function createThrottle(func, interval) {
    var lastCall = 0;
    return function() {
        var now = Date.now();
        if (now - lastCall >= interval) {
            func.apply(this, arguments);
            lastCall = now;
        }
    };
}

var debounceLog = createDebounce(function(msg) {
    var out = document.getElementById('async-output');
    if (out) out.innerHTML += '<div>[' + new Date().toLocaleTimeString() + '] DEBOUNCE: ' + msg + '</div>';
}, 500);

var throttleLog = createThrottle(function(msg) {
    var out = document.getElementById('async-output');
    if (out) out.innerHTML += '<div>[' + new Date().toLocaleTimeString() + '] THROTTLE: ' + msg + '</div>';
}, 1000);

function testDebounce() {
    debounceLog('клик по debounce-кнопке');
}

function testThrottle() {
    throttleLog('клик по throttle-кнопке');
}

function setupTimerEvents() {
    var startBtn = document.getElementById('start-timer');
    var stopBtn = document.getElementById('stop-timer');
    var debounceBtn = document.getElementById('debounce-btn');
    var throttleBtn = document.getElementById('throttle-btn');
    var output = document.getElementById('async-output');
    if (output) output.innerHTML = ''; // очистка

    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (stopBtn) stopBtn.addEventListener('click', stopTimer);
    if (debounceBtn) debounceBtn.addEventListener('click', testDebounce);
    if (throttleBtn) throttleBtn.addEventListener('click', testThrottle);
}

// =============== ИНИЦИАЛИЗАЦИЯ ===============

document.addEventListener('DOMContentLoaded', function() {
    setupBasicEvents();
    setupKeyboardEvents();
    setupDelegationEvents();
    setupPreventionEvents();
    setupCustomEvents();
    setupLoadingEvents();
    setupTimerEvents();

    console.log('✅ ПР12: Все обработчики событий подключены.');
});