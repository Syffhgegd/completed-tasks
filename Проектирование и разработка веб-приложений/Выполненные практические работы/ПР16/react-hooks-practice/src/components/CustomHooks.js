import React, { useState, useEffect, useRef } from "react";

// 7.1 useLocalStorage
function useLocalStorage(key, initialValue) {
    var [value, setValue] = useState(function() {
        try {
            var item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error('Ошибка чтения из localStorage по ключу "' + key + '":', error);
            return initialValue;
        }
    });

    useEffect(function() {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Ошибка записи в localStorage по ключу "' + key + '":', error);
        }
    }, [key, value]);

    return [value, setValue];
}

// 7.2 useFetch
function useFetch(url) {
    var [data, setData] = useState(null);
    var [loading, setLoading] = useState(true);
    var [error, setError] = useState(null);

    useEffect(function() {
        var fetchData = async function() {
            try {
                setLoading(true);
                setError(null);
                var response = await fetch(url);
                if (!response.ok) throw new Error("Ошибка сети");
                var result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    return { data: data, loading: loading, error: error };
}

// 7.3 useToggle
function useToggle(initialValue) {
    var [value, setValue] = useState(initialValue === undefined ? false : initialValue);
    var toggle = useCallback(function() {
        setValue(function(prev) { return !prev; });
    }, []);
    return [value, toggle];
}

// 7.4 useDebounce
function useDebounce(value, delay) {
    var [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(function() {
        var handler = setTimeout(function() {
            setDebouncedValue(value);
        }, delay);
        return function() {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

// 7.5 useWindowSize (реализуем здесь, чтобы не зависеть от внешнего)
function useWindowSize() {
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

    return size;
}

// Демо-компоненты

function LocalStorageDemo() {
    var [name, setName] = useLocalStorage("username", "");
    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > useLocalStorage < /h3> <
        input value = { name }
        onChange = {
            function(e) { setName(e.target.value); } }
        placeholder = "Введите имя (сохранится в localStorage)" /
        >
        <
        div > Текущее имя: { name } < /div> <
        button onClick = {
            function() { setName(""); } } > Очистить < /button> <
        /div>
    );
}

function FetchDemo() {
    var { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");
    return ( <
            div style = {
                { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
            <
            h3 > useFetch < /h3> {
                loading && < div > Загрузка пользователей... < /div>} {
                    error && < div style = {
                            { color: "red" } } > Ошибка: { error } < /div>} {
                            data && ( <
                                div >
                                <
                                h4 > Пользователи(первые 3): < /h4> <
                                ul > {
                                    data.slice(0, 3).map(function(user) {
                                        return ( <
                                            li key = { user.id } > { user.name }({ user.email }) <
                                            /li>
                                        );
                                    })
                                } <
                                /ul> <
                                /div>
                            )
                        } <
                        /div>
                );
            }

            function ToggleDemo() {
                var [isVisible, toggleVisible] = useToggle(false);
                return ( <
                    div style = {
                        { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
                    <
                    h3 > useToggle < /h3> <
                    button onClick = { toggleVisible } > { isVisible ? "Скрыть" : "Показать" } <
                    /button> {
                        isVisible && ( <
                            div style = {
                                { marginTop: "10px", padding: "10px", background: "#f0fef0" } } >
                            Секретный контент:
                            <
                            br / >
                            React Hooks— мощный инструмент!
                            <
                            /div>
                        )
                    } <
                    /div>
                );
            }

            function DebounceDemo() {
                var [search, setSearch] = useState("");
                var debouncedSearch = useDebounce(search, 500);
                var [results, setResults] = useState([]);

                useEffect(function() {
                    if (debouncedSearch) {
                        var mockResults = [
                            "Результат 1 по запросу: " + debouncedSearch,
                            "Результат 2 по запросу: " + debouncedSearch,
                            "Результат 3 по запросу: " + debouncedSearch
                        ];
                        setResults(mockResults);
                    } else {
                        setResults([]);
                    }
                }, [debouncedSearch]);

                return ( <
                    div style = {
                        { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
                    <
                    h3 > useDebounce < /h3> <
                    input value = { search }
                    onChange = {
                        function(e) { setSearch(e.target.value); } }
                    placeholder = "Поиск (с debounce 500ms)" /
                    >
                    <
                    div > Текущий поиск: "{search}" < /div> <
                    div > Debounced поиск: "{debouncedSearch}" < /div> {
                        results.length > 0 && ( <
                            div >
                            <
                            h4 > Результаты: < /h4> <
                            ul > {
                                results.map(function(result, index) {
                                    return <li key = { index } > { result } < /li>;
                                })
                            } <
                            /ul> <
                            /div>
                        )
                    } <
                    /div>
                );
            }

            function WindowSizeDemo() {
                var { width, height } = useWindowSize();
                return ( <
                    div style = {
                        { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
                    <
                    h3 > useWindowSize < /h3> <
                    div > Ширина окна: { width }
                    px < /div> <
                    div > Высота окна: { height }
                    px < /div> <
                    /div>
                );
            }

            // Основной компонент раздела
            function CustomHooks() {
                return ( <
                    div style = {
                        { padding: "20px", border: "2px solid purple", margin: "10px" } } >
                    <
                    h2 > Кастомные хуки < /h2> <
                    p > Создайте и используйте собственные хуки для повторного использования логики. < /p> <
                    div >
                    <
                    h3 > Задание 7: Создание кастомных хуков < /h3> <
                    LocalStorageDemo / >
                    <
                    FetchDemo / >
                    <
                    ToggleDemo / >
                    <
                    DebounceDemo / >
                    <
                    WindowSizeDemo / >
                    <
                    /div> <
                    /div>
                );
            }

            export default CustomHooks;