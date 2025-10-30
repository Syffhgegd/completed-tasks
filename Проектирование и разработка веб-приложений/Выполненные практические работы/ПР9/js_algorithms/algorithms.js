// algorithms.js

// Часть 2.1: Работа с числами

/**
 * Проверяет, является ли число простым.
 * @param {number} number
 * @returns {boolean}
 * Сложность: O(√n)
 */
function isPrime(number) {
  if (number < 2) return false;
  if (number === 2) return true;
  if (number % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(number); i += 2) {
    if (number % i === 0) return false;
  }
  return true;
}

/**
 * Вычисляет факториал числа.
 * @param {number} n
 * @returns {number}
 * Сложность: O(n)
 */
function factorial(n) {
  if (n < 0) return null;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

/**
 * Возвращает первые n чисел Фибоначчи.
 * @param {number} n
 * @returns {number[]}
 * Сложность: O(n)
 */
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq[i] = seq[i - 1] + seq[i - 2];
  }
  return seq;
}

/**
 * Находит НОД двух чисел (алгоритм Евклида).
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * Сложность: O(log(min(a, b)))
 */
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// Часть 2.2: Работа со строками

/**
 * Проверяет, является ли строка палиндромом (игнорирует регистр и не-буквы).
 * @param {string} str
 * @returns {boolean}
 * Сложность: O(n)
 */
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^а-яa-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Считает количество гласных (русских и английских).
 * @param {string} str
 * @returns {number}
 * Сложность: O(n)
 */
function countVowels(str) {
  const vowels = 'аеёиоуыэюяaeiou';
  let count = 0;
  for (const char of str.toLowerCase()) {
    if (vowels.includes(char)) count++;
  }
  return count;
}

/**
 * Переворачивает строку без встроенных методов.
 * @param {string} str
 * @returns {string}
 * Сложность: O(n)
 */
function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

/**
 * Находит самое длинное слово в предложении.
 * @param {string} sentence
 * @returns {string}
 * Сложность: O(n)
 */
function findLongestWord(sentence) {
  const words = sentence.match(/[а-яa-z]+/gi) || [];
  if (words.length === 0) return '';
  return words.reduce((longest, word) => word.length > longest.length ? word : longest, '');
}

// Часть 2.3: Работа с массивами

/**
 * Находит максимальный элемент в массиве.
 * @param {number[]} arr
 * @returns {number|null}
 * Сложность: O(n)
 */
function findMax(arr) {
  if (arr.length === 0) return null;
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

/**
 * Удаляет дубликаты из массива.
 * @param {any[]} arr
 * @returns {any[]}
 * Сложность: O(n)
 */
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

/**
 * Сортирует массив методом пузырька.
 * @param {number[]} arr
 * @returns {number[]}
 * Сложность: O(n²)
 */
function bubbleSort(arr) {
  const sorted = [...arr];
  const n = sorted.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
      }
    }
  }
  return sorted;
}

/**
 * Бинарный поиск в отсортированном массиве.
 * @param {number[]} sortedArr
 * @param {number} target
 * @returns {number}
 * Сложность: O(log n)
 */
function binarySearch(sortedArr, target) {
  let left = 0;
  let right = sortedArr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (sortedArr[mid] === target) return mid;
    if (sortedArr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// Часть 2.4: Утилитарные функции

/**
 * Форматирует сумму с пробелами и валютой.
 * @param {number} amount
 * @param {string} currency
 * @returns {string}
 * Сложность: O(1)
 */
function formatCurrency(amount, currency = '₽') {
  const [integer, decimal = ''] = amount.toFixed(2).split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${formattedInteger}.${decimal} ${currency}`;
}

/**
 * Проверяет валидность email через регулярное выражение.
 * @param {string} email
 * @returns {boolean}
 * Сложность: O(n)
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Генерирует случайный пароль.
 * @param {number} length
 * @returns {string}
 * Сложность: O(n)
 */
function generatePassword(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}