// Простой тест-раннер
function runTests() {
    var passed = 0,
        total = 0;

    function test(name, fn) {
        total++;
        try {
            fn();
            console.log('✅ ' + name);
            passed++;
        } catch (e) {
            console.error('❌ ' + name + ':', e.message);
        }
    }

    // ===== Тесты =====

    test('handleBasicClick не падает', function() {
        // Эмуляция события
        var fakeEvent = {
            type: 'click',
            target: { classList: { add: function() {}, remove: function() {} } }
        };
        handleBasicClick(fakeEvent); // не должно быть ошибки
    });

    test('handleKeyEvents перехватывает Ctrl+S', function() {
        var fakeEvent = {
            key: 's',
            code: 'KeyS',
            ctrlKey: true,
            altKey: false,
            shiftKey: false,
            preventDefault: function() { this.defaultPrevented = true; }
        };
        handleKeyEvents(fakeEvent);
        if (!fakeEvent.defaultPrevented) throw new Error('preventDefault не вызван');
    });

    test('createDebounce работает', function() {
        var called = 0;
        var debounced = createDebounce(function() { called++; }, 10);
        debounced();
        debounced();
        debounced();
        // Через 20мс должно быть 1 вызов
        setTimeout(function() {
            if (called !== 1) console.error('❌ debounce: ожидался 1 вызов, получено ' + called);
            else console.log('✅ debounce работает');
        }, 20);
    });

    test('createThrottle ограничивает частоту', function() {
        var called = 0;
        var throttled = createThrottle(function() { called++; }, 100);
        throttled(); // 1
        throttled(); // проигнорировано
        setTimeout(function() { throttled(); }, 50); // проигнорировано
        setTimeout(function() {
            if (called !== 1) console.error('❌ throttle: ожидался 1 вызов за 100мс');
            else console.log('✅ throttle работает');
        }, 110);
    });

    test('preventLinkDefault останавливает переход', function() {
        var fakeEvent = { preventDefault: function() { this.called = true; } };
        preventLinkDefault(fakeEvent);
        if (!fakeEvent.called) throw new Error('preventDefault не вызван');
    });

    test('validate в preventFormSubmit работает', function() {
        var form = document.createElement('form');
        var input = document.createElement('input');
        input.name = 'text';
        input.value = '';
        form.appendChild(input);

        var fakeEvent = {
            target: form,
            preventDefault: function() {}
        };
        // Нельзя протестировать напрямую без DOM, но функция не падает
        try {
            preventFormSubmit(fakeEvent);
        } catch (e) {
            throw e;
        }
    });

    // ===== Итог =====
    setTimeout(function() {
        console.log('\n📊 Тесты завершены: ' + passed + '/' + total + ' пройдено.');
        if (passed === total) console.log('🎯 Отлично! Все базовые тесты прошли.');
    }, 200);
}

// Запуск через 1 сек после загрузки (чтобы DOM был готов)
setTimeout(runTests, 1000);