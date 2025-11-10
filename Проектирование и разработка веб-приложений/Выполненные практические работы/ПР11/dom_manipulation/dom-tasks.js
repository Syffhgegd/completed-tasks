// =============== ЗАДАНИЕ 1: Создание и вставка элементов ===============

function createCard(title, content) {
    var card = document.createElement('div');
    card.className = 'card';

    var heading = document.createElement('h4');
    heading.innerHTML = title; // для IE: innerHTML безопасен для текста

    var paragraph = document.createElement('p');
    paragraph.innerHTML = content;

    card.appendChild(heading);
    card.appendChild(paragraph);

    var target = document.getElementById('target1');
    if (target) {
        target.appendChild(card);
    }
}

function createList(items) {
    if (!Array.isArray || !items || !Array.isArray(items)) return;

    var ol = document.createElement('ol');
    for (var i = 0; i < items.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = items[i];
        ol.appendChild(li);
    }

    var target = document.getElementById('target1');
    if (target) {
        target.appendChild(ol);
    }
}

// =============== ЗАДАНИЕ 2: Навигация по DOM ===============

function countChildren() {
    var parent = document.getElementById('parent-element');
    if (!parent) return 0;
    return parent.children.length;
}

function findSpecialChild() {
    var parent = document.getElementById('parent-element');
    if (!parent) return '';
    var special = parent.querySelector('.special');
    return special ? special.innerHTML.replace(/^\s+|\s+$/g, '') : '';
}

function getParentBackground() {
    var child = document.querySelector('.child');
    if (!child) return '';
    var parent = child.parentNode;
    if (!parent) return '';
    return parent.currentStyle ? parent.currentStyle.backgroundColor :
        window.getComputedStyle ? window.getComputedStyle(parent, null).backgroundColor : '';
}

// =============== ЗАДАНИЕ 3: Работа с классами и стилями ===============

function setupStyleToggle() {
    var btn = document.getElementById('toggle-style');
    var target = document.getElementById('style-target');
    if (btn && target) {
        btn.onclick = function() {
            if (target.className.indexOf('active-style') === -1) {
                target.className += ' active-style';
            } else {
                target.className = target.className.replace(/\s*active-style\s*/g, ' ').replace(/^\s+|\s+$/g, '');
            }
        };
    }
}

function changeHeaderColor() {
    var header = document.querySelector('header');
    if (!header) return;

    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    header.style.backgroundColor = 'rgb(' + r + ',' + g + ',' + b + ')';
}

function animateElement() {
    var el = document.getElementById('style-target');
    if (!el) return;

    if (el.className.indexOf('animated') === -1) {
        el.className += ' animated';
    } else {
        el.className = el.className.replace(/\s*animated\s*/g, ' ').replace(/^\s+|\s+$/g, '');
    }
}

// =============== ЗАДАНИЕ 4: Обработка событий ===============

function setupClickCounter() {
    var count = 0;
    var btn = document.getElementById('click-btn');
    var counter = document.getElementById('click-counter');
    if (btn && counter) {
        btn.onclick = function() {
            count += 1;
            counter.innerHTML = count;
        };
    }
}

function setupInputDisplay() {
    var input = document.getElementById('text-input');
    var display = document.getElementById('input-display');
    if (input && display) {
        input.oninput = function() {
            display.innerHTML = input.value || '—';
        };
        // fallback для старых браузеров
        if (!('oninput' in input)) {
            input.onkeyup = function() {
                display.innerHTML = input.value || '—';
            };
        }
    }
}

function setupKeyboardEvents() {
    document.onkeydown = function(e) {
        e = e || window.event;
        var key = e.key || e.keyCode || e.which;
        console.log('[keydown] key:', key);
    };
    document.onkeyup = function(e) {
        e = e || window.event;
        var key = e.key || e.keyCode || e.which;
        console.log('[keyup] key:', key);
    };
}

// =============== ЗАДАНИЕ 5: Динамические списки ===============

function addListItem() {
    var input = document.getElementById('item-input');
    var list = document.getElementById('dynamic-list');
    if (!input || !list) return;

    var value = input.value.replace(/^\s+|\s+$/g, '');
    if (value === '') return;

    var li = document.createElement('li');
    li.className = 'list-item';

    var textSpan = document.createElement('span');
    textSpan.innerHTML = value;

    var delBtn = document.createElement('button');
    delBtn.innerHTML = '&times;';
    delBtn.setAttribute('aria-label', 'Удалить');

    delBtn.onclick = function() {
        var liToRemove = this.parentNode;
        if (liToRemove && liToRemove.parentNode) {
            liToRemove.parentNode.removeChild(liToRemove);
        }
    };

    li.appendChild(textSpan);
    li.appendChild(delBtn);
    list.appendChild(li);

    input.value = '';
    input.focus();
}

function clearList() {
    var list = document.getElementById('dynamic-list');
    if (list) {
        list.innerHTML = '';
    }
}

function setupListEvents() {
    var addBtn = document.getElementById('add-item-btn');
    var clearBtn = document.getElementById('clear-list-btn');
    var input = document.getElementById('item-input');

    if (addBtn) {
        addBtn.onclick = addListItem;
    }
    if (clearBtn) {
        clearBtn.onclick = clearList;
    }
    if (input) {
        input.onkeypress = function(e) {
            e = e || window.event;
            var key = e.keyCode || e.which;
            if (key === 13) { // Enter
                addListItem();
                if (e.preventDefault) e.preventDefault();
                else e.returnValue = false;
                return false;
            }
        };
    }
}

// =============== ЗАДАНИЕ 6: Работа с формами ===============

function validateForm(formData) {
    var errors = {};

    var name = '';
    if (formData.name && formData.name.value) {
        name = formData.name.value.replace(/^\s+|\s+$/g, '');
    }
    if (name.length < 2) {
        errors.name = 'Имя должно содержать минимум 2 символа';
    }

    var email = '';
    if (formData.email && formData.email.value) {
        email = formData.email.value.replace(/^\s+|\s+$/g, '');
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.email = 'Некорректный формат email';
    }

    var ageStr = formData.age && formData.age.value ? formData.age.value : '';
    var age = parseInt(ageStr, 10);
    if (isNaN(age) || age < 1 || age > 120) {
        errors.age = 'Возраст должен быть числом от 1 до 120';
    }

    return Object.keys ? (Object.keys(errors).length === 0 ? null : errors) : (errors.name || errors.email || errors.age ? errors : null);
}

function displayFormErrors(errors) {
    var output = document.getElementById('form-output');
    if (!output) return;

    output.innerHTML = '';
    var errorDiv = document.createElement('div');
    errorDiv.className = 'error-list';
    var errorList = document.createElement('ul');

    for (var field in errors) {
        if (errors.hasOwnProperty(field)) {
            var li = document.createElement('li');
            li.className = 'error-item';
            li.innerHTML = errors[field];
            errorList.appendChild(li);
        }
    }

    errorDiv.appendChild(errorList);
    output.appendChild(errorDiv);
}

function displayFormSuccess(userData) {
    var output = document.getElementById('form-output');
    if (!output) return;

    output.innerHTML = '';
    var successDiv = document.createElement('div');
    successDiv.className = 'success-message';

    successDiv.innerHTML =
        '<p><strong>✅ Данные успешно отправлены!</strong></p>' +
        '<p><strong>Имя:</strong> ' + userData.name + '</p>' +
        '<p><strong>Email:</strong> ' + userData.email + '</p>' +
        '<p><strong>Возраст:</strong> ' + userData.age + '</p>';

    output.appendChild(successDiv);
}

function handleFormSubmit(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    } else if (window.event) {
        window.event.returnValue = false;
    }

    var form = document.getElementById('user-form');
    var errors = validateForm(form);

    if (errors) {
        displayFormErrors(errors);
    } else {
        var userData = {
            name: form.name.value,
            email: form.email.value,
            age: form.age.value
        };
        displayFormSuccess(userData);
    }
}

function setupForm() {
    var form = document.getElementById('user-form');
    if (form) {
        if (form.addEventListener) {
            form.addEventListener('submit', handleFormSubmit, false);
        } else if (form.attachEvent) {
            form.attachEvent('onsubmit', handleFormSubmit);
        } else {
            form.onsubmit = handleFormSubmit;
        }
    }
}

// =============== ИНИЦИАЛИЗАЦИЯ (совместимая со всеми браузерами) ===============

function initApp() {
    // Задание 1
    createCard('Карточка 1', 'Это динамически созданная карточка.');
    createList(['Первый', 'Второй', 'Третий']);

    // Задание 3
    setupStyleToggle();

    var animateBtn = document.getElementById('animate-btn');
    if (animateBtn) {
        if (animateBtn.addEventListener) {
            animateBtn.addEventListener('click', animateElement, false);
        } else if (animateBtn.attachEvent) {
            animateBtn.attachEvent('onclick', animateElement);
        } else {
            animateBtn.onclick = animateElement;
        }
    }

    var colorBtn = document.getElementById('change-color-btn');
    if (colorBtn) {
        if (colorBtn.addEventListener) {
            colorBtn.addEventListener('click', changeHeaderColor, false);
        } else if (colorBtn.attachEvent) {
            colorBtn.attachEvent('onclick', changeHeaderColor);
        } else {
            colorBtn.onclick = changeHeaderColor;
        }
    }

    // Задание 4
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();

    // Задание 5
    setupListEvents();

    // Задание 6
    setupForm();

    // Отладка
    if (window.console && console.log) {
        console.log('✅ Приложение инициализировано. Кнопки должны работать.');
    }
}

// Совместимая загрузка
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', initApp, false);
} else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
            initApp();
        }
    });
} else {
    window.onload = initApp;
}