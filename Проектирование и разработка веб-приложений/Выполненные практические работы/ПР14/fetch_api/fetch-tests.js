console.log('=== ТЕСТЫ ПР14 ===');

function test(name, fn) {
    try {
        var res = fn();
        if (res === true || res === undefined) {
            console.log('✅', name);
        } else {
            console.log('⚠️', name, res);
        }
    } catch (e) {
        console.error('❌', name, e.message);
    }
}

test('fetch поддерживается', function() {
    return typeof fetch === 'function';
});

test('JSON поддерживается', function() {
    var x = JSON.parse('{"a":1}');
    return x.a === 1;
});

test('FormData поддерживается', function() {
    return typeof FormData === 'function';
});

test('Basic Auth encoding', function() {
    return btoa('user:pass') === 'dXNlcjpwYXNz';
});

// Асинхронные тесты (запустятся в фоне)
console.log('🔍 Запуск асинхронных тестов...');

fetch(API_BASE_URL + '/posts/1')
    .then(function(r) { return r.json(); })
    .then(function(data) {
        if (data.id === 1 && data.title) {
            console.log('✅ GET /posts/1 — OK');
        } else {
            console.warn('⚠️ GET /posts/1 — неожиданный ответ');
        }
    })
    .catch(function(e) {
        console.error('❌ GET /posts/1 — ошибка:', e.message);
    });