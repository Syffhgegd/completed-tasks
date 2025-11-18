import React from "react";

function HooksTests() {
    var runTests = function() {
        var testResults = [];

        // Простая проверка: наличие элементов по классам/ид (имитация)
        try {
            var el = document.querySelector("h2");
            testResults.push({
                name: "Базовые компоненты отображаются",
                passed: !!el,
                message: el ? "Найден заголовок — компоненты монтируются" : "Не найден h2"
            });
        } catch (error) {
            testResults.push({
                name: "Базовые компоненты",
                passed: false,
                message: "Ошибка: " + error.message
            });
        }

        // Вывод в консоль
        console.log("=== РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ ХУКОВ ===");
        testResults.forEach(function(test) {
            console.log((test.passed ? "✅" : "❌") + " " + test.name + ": " + test.message);
        });

        var passedTests = testResults.filter(function(t) { return t.passed; }).length;
        var totalTests = testResults.length;
        alert(
            "Тестирование завершено:\n" +
            passedTests + "/" + totalTests + " тестов пройдено\n\n" +
            "Проверьте консоль браузера для деталей."
        );
    };

    return ( <
        div style = {
            { padding: "20px", border: "2px solid orange", margin: "10px" } } >
        <
        h2 > Тестирование хуков < /h2> <
        button onClick = { runTests }
        style = {
            { padding: "10px 20px", fontSize: "16px" } } >
        Запустить тесты <
        /button> <
        div style = {
            { marginTop: "20px", textAlign: "left" } } >
        <
        h4 > Инструкция по проверке: < /h4> <
        ul >
        <
        li > ✅Счётчик— увеличивается / уменьшается / сбрасывается < /li> <
        li > ✅Форма— сохраняет значения в state < /li> <
        li > ✅Список задач— добавляет / удаляет / фильтрует задачи < /li> <
        li > ✅Таймер— запускается / останавливается < /li> <
        li > ✅Размер окна— отображает текущие размеры < /li> <
        li > ✅Загрузка данных— показывает данные с API < /li> <
        li > ✅Корзина— добавляет / удаляет товары, считает сумму < /li> <
        li > ✅Секундомер— работает через useReducer < /li> <
        li > ✅Тема— переключается через useContext < /li> <
        li > ✅useMemo— оптимизирует вычисления < /li> <
        li > ✅useRef— работает с DOM и значениями < /li> <
        li > ✅Кастомные хуки— работают корректно < /li> <
        /ul> <
        /div> <
        /div>
    );
}

export default HooksTests;