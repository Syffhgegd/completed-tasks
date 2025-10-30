// tests.js

// Функция для добавления результата в DOM
function displayTestResult(name, passed, result, expected) {
  const output = document.getElementById('output');
  const div = document.createElement('div');
  div.className = passed ? 'test passed' : 'test failed';
  div.innerHTML = `
    <strong>${name}:</strong> ${passed ? '✅ Верно' : '❌ Неверно'}<br>
    Получено: <code>${JSON.stringify(result)}</code><br>
    Ожидалось: <code>${JSON.stringify(expected)}</code>
  `;
  output.appendChild(div);
}

// Запуск одного теста и вывод результата
function runTest(name, fn, expected) {
  try {
    const result = fn();
    const passed = JSON.stringify(result) === JSON.stringify(expected);
    displayTestResult(name, passed, result, expected);
  } catch (e) {
    displayTestResult(name, false, `Ошибка: ${e.message}`, expected);
  }
}

// Начало тестов
document.getElementById('output').innerHTML = '<p>Запуск тестов...</p>';

// Тесты для чисел
runTest('isPrime(7)', () => isPrime(7), true);
runTest('isPrime(10)', () => isPrime(10), false);
runTest('factorial(5)', () => factorial(5), 120);
runTest('fibonacci(6)', () => fibonacci(6), [0, 1, 1, 2, 3, 5]);
runTest('gcd(48, 18)', () => gcd(48, 18), 6);

// Тесты для строк
runTest('isPalindrome("А роза упала на лапу Азора")', () => isPalindrome("А роза упала на лапу Азора"), true);
runTest('countVowels("Привет, World!")', () => countVowels("Привет, World!"), 4);
runTest('reverseString("hello")', () => reverseString("hello"), "olleh");
runTest('findLongestWord("JavaScript is awesome")', () => findLongestWord("JavaScript is awesome"), "JavaScript");

// Тесты для массивов
runTest('findMax([1, 5, 3])', () => findMax([1, 5, 3]), 5);
runTest('removeDuplicates([1,2,2,3])', () => removeDuplicates([1,2,2,3]), [1,2,3]);
runTest('bubbleSort([3,1,2])', () => bubbleSort([3,1,2]), [1,2,3]);
runTest('binarySearch([1,2,3,4,5], 3)', () => binarySearch([1,2,3,4,5], 3), 2);

// Утилитарные функции
runTest('formatCurrency(1234.56)', () => formatCurrency(1234.56), "1 234.56 ₽");
runTest('isValidEmail("test@example.com")', () => isValidEmail("test@example.com"), true);
runTest('isValidEmail("invalid-email")', () => isValidEmail("invalid-email"), false);
runTest('generatePassword(8).length', () => generatePassword(8).length, 8);

// Финальное сообщение
const output = document.getElementById('output');
const summary = document.createElement('div');
summary.className = 'summary';
summary.innerHTML = '<h2>✅ Тестирование завершено!</h2>';
output.appendChild(summary);