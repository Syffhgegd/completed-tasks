import React, { useState, useEffect } from "react";

// 1.1 Counter
function Counter() {
    var [count, setCount] = useState(0);
    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > Счётчик: { count } < /h3> <
        button onClick = {
            function() { setCount(count + 1); } } > +1 < /button> <
        button onClick = {
            function() { setCount(count - 1); } } > -1 < /button> <
        button onClick = {
            function() { setCount(0); } } > Сброс < /button> <
        /div>
    );
}

// 1.2 UserForm
function UserForm() {
    var [user, setUser] = useState({ name: "", email: "", age: "" });
    var handleChange = function(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > Форма пользователя < /h3> <
        input name = "name"
        placeholder = "Имя"
        value = { user.name }
        onChange = { handleChange }
        /> <
        input name = "email"
        placeholder = "Email"
        value = { user.email }
        onChange = { handleChange }
        /> <
        input name = "age"
        placeholder = "Возраст"
        value = { user.age }
        onChange = { handleChange }
        /> <
        div >
        <
        strong > Текущие значения: < /strong> <
        div > Имя: { user.name } < /div> <
        div > Email: { user.email } < /div> <
        div > Возраст: { user.age } < /div> <
        /div> <
        /div>
    );
}

// 1.3 TodoList
function TodoList() {
    var [todos, setTodos] = useState([]);
    var [input, setInput] = useState("");
    var [filter, setFilter] = useState("all");

    var addTodo = function() {
        if (input.trim()) {
            setTodos([
                ...todos,
                { id: Date.now(), text: input, completed: false }
            ]);
            setInput("");
        }
    };

    var toggleTodo = function(id) {
        setTodos(
            todos.map(function(todo) {
                return todo.id === id ?
                    {...todo, completed: !todo.completed } :
                    todo;
            })
        );
    };

    var filteredTodos = todos.filter(function(todo) {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > Список задач < /h3> <
        input value = { input }
        onChange = {
            function(e) { setInput(e.target.value); } }
        placeholder = "Новая задача" /
        >
        <
        button onClick = { addTodo } > Добавить < /button> <
        div style = {
            { margin: "10px 0" } } >
        <
        button onClick = {
            function() { setFilter("all"); } } > Все < /button> <
        button onClick = {
            function() { setFilter("active"); } } > Активные < /button> <
        button onClick = {
            function() { setFilter("completed"); } } > Завершённые < /button> <
        /div> <
        ul > {
            filteredTodos.map(function(todo) {
                return ( <
                    li key = { todo.id }
                    style = {
                        {
                            textDecoration: todo.completed ? "line-through" : "none"
                        }
                    } >
                    <
                    span onClick = {
                        function() { toggleTodo(todo.id); } } > { todo.text } <
                    /span> <
                    /li>
                );
            })
        } <
        /ul> <
        /div>
    );
}

// 2.1 Timer
function Timer() {
    var [time, setTime] = useState(0);
    var [isRunning, setIsRunning] = useState(false);

    useEffect(function() {
        var interval;
        if (isRunning) {
            interval = setInterval(function() {
                setTime(function(prev) { return prev + 1; });
            }, 1000);
        }
        return function() {
            clearInterval(interval);
        };
    }, [isRunning]);

    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > Таймер: { time }
        сек. < /h3> <
        button onClick = {
            function() { setIsRunning(!isRunning); } } > { isRunning ? "Пауза" : "Старт" } <
        /button> <
        button onClick = {
            function() {
                setTime(0);
                setIsRunning(false);
            }
        } >
        Сброс <
        /button> <
        /div>
    );
}

// 2.2 WindowSize
function WindowSize() {
    var [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(function() {
        var handleResize = function() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };
        window.addEventListener("resize", handleResize);
        return function() {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > Размер окна < /h3> <
        div > Ширина: { size.width }
        px < /div> <
        div > Высота: { size.height }
        px < /div> <
        /div>
    );
}

// 2.3 DataFetcher
function DataFetcher() {
    var [data, setData] = useState(null);
    var [loading, setLoading] = useState(false);
    var [error, setError] = useState(null);

    useEffect(function() {
        var fetchData = async function() {
            setLoading(true);
            setError(null);
            try {
                var response = await fetch("https://jsonplaceholder.typicode.com/users/1");
                if (!response.ok) throw new Error("Ошибка сети");
                var userData = await response.json();
                setData(userData);
            } catch (err) {
                setError("Ошибка загрузки данных");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return ( <
            div style = {
                { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
            <
            h3 > Загрузка данных < /h3> {
                loading && < div > Загрузка... < /div>} {
                    error && < div style = {
                            { color: "red" } } > { error } < /div>} {
                            data && ( <
                                div >
                                <
                                div > Имя: { data.name } < /div> <
                                div > Email: { data.email } < /div> <
                                div > Телефон: { data.phone } < /div> <
                                /div>
                            )
                        } <
                        /div>
                );
            }

            // Основной компонент раздела
            function BasicHooks() {
                return ( <
                    div style = {
                        { padding: "20px", border: "2px solid blue", margin: "10px" } } >
                    <
                    h2 > Базовые хуки: useState, useEffect < /h2> <
                    div >
                    <
                    h3 > Задание 1: useState < /h3> <
                    Counter / >
                    <
                    UserForm / >
                    <
                    TodoList / >
                    <
                    /div> <
                    div >
                    <
                    h3 > Задание 2: useEffect < /h3> <
                    Timer / >
                    <
                    WindowSize / >
                    <
                    DataFetcher / >
                    <
                    /div> <
                    /div>
                );
            }

            export default BasicHooks;