import React, { useReducer, useContext, useCallback, useMemo, useRef, useState, useEffect } from "react";

// Контекст темы
var ThemeContext = React.createContext();

// 3.1 ShoppingCart (useReducer)
function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM":
            var existingItem = state.items.find(function(item) {
                return item.id === action.payload.id;
            });
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(function(item) {
                        return item.id === action.payload.id ?
                            {...item, quantity: item.quantity + 1 } :
                            item;
                    })
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, {...action.payload, quantity: 1 }]
                };
            }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(function(item) {
                    return item.id !== action.payload;
                })
            };
        case "UPDATE_QUANTITY":
            return {
                ...state,
                items: state.items.map(function(item) {
                    return item.id === action.payload.id ?
                        {...item, quantity: action.payload.quantity } :
                        item;
                })
            };
        case "CLEAR_CART":
            return { items: [] };
        default:
            return state;
    }
}

function ShoppingCart() {
    var [state, dispatch] = useReducer(cartReducer, { items: [] });

    var addItem = function(item) {
        dispatch({ type: "ADD_ITEM", payload: item });
    };

    var removeItem = function(id) {
        dispatch({ type: "REMOVE_ITEM", payload: id });
    };

    var updateQuantity = function(id, quantity) {
        if (quantity <= 0) {
            removeItem(id);
        } else {
            dispatch({
                type: "UPDATE_QUANTITY",
                payload: { id: id, quantity: quantity }
            });
        }
    };

    var total = state.items.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
    }, 0);

    var sampleItems = [
        { id: 1, name: "Товар 1", price: 100 },
        { id: 2, name: "Товар 2", price: 200 },
        { id: 3, name: "Товар 3", price: 300 }
    ];

    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > Корзина покупок < /h3> <
        div >
        <
        h4 > Добавить товары: < /h4> {
            sampleItems.map(function(item) {
                return ( <
                    button key = { item.id }
                    onClick = {
                        function() { addItem(item); } } >
                    Добавить { item.name } <
                    /button>
                );
            })
        } <
        /div> <
        div >
        <
        h4 > Товары в корзине: < /h4> {
            state.items.map(function(item) {
                return ( <
                    div key = { item.id }
                    style = {
                        {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            margin: "5px 0"
                        }
                    } >
                    <
                    span > { item.name } < /span> <
                    span > $ { item.price } < /span> <
                    button onClick = {
                        function() { updateQuantity(item.id, item.quantity - 1); } } > - < /button> <
                    span > { item.quantity } < /span> <
                    button onClick = {
                        function() { updateQuantity(item.id, item.quantity + 1); } } > + < /button> <
                    button onClick = {
                        function() { removeItem(item.id); } } > Удалить < /button> <
                    /div>
                );
            })
        } <
        /div> <
        div style = {
            { marginTop: "10px", fontWeight: "bold" } } >
        Общая сумма: $ { total } <
        /div> <
        button onClick = {
            function() { dispatch({ type: "CLEAR_CART" }); } } >
        Очистить корзину <
        /button> <
        /div>
    );
}

// 3.2 Stopwatch (useReducer + useEffect)
function stopwatchReducer(state, action) {
    switch (action.type) {
        case "START":
            return {...state, isRunning: true };
        case "STOP":
            return {...state, isRunning: false };
        case "RESET":
            return { isRunning: false, time: 0, laps: [] };
        case "TICK":
            return {...state, time: state.time + 1 };
        case "LAP":
            return {...state, laps: [...state.laps, state.time] };
        default:
            return state;
    }
}

function Stopwatch() {
    var [state, dispatch] = useReducer(stopwatchReducer, {
        isRunning: false,
        time: 0,
        laps: []
    });

    useEffect(function() {
        var interval;
        if (state.isRunning) {
            interval = setInterval(function() {
                dispatch({ type: "TICK" });
            }, 1000);
        }
        return function() {
            clearInterval(interval);
        };
    }, [state.isRunning]);

    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > Секундомер: { state.time }
        сек. < /h3> <
        button onClick = {
            function() {
                dispatch({ type: state.isRunning ? "STOP" : "START" });
            }
        } >
        { state.isRunning ? "Стоп" : "Старт" } <
        /button> <
        button onClick = {
            function() { dispatch({ type: "RESET" }); } } >
        Сброс <
        /button> <
        button onClick = {
            function() { dispatch({ type: "LAP" }); } } >
        Круг <
        /button> {
            state.laps.length > 0 && ( <
                div >
                <
                h4 > Круги: < /h4> <
                ul > {
                    state.laps.map(function(lap, index) {
                        return ( <
                            li key = { index } > Круг { index + 1 }: { lap }
                            сек. < /li>
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

// 4. ThemeToggle (useContext)
function ThemeToggle() {
    var { theme, toggleTheme } = useContext(ThemeContext);
    return ( <
        div style = {
            {
                border: "1px solid #ccc",
                padding: "20px",
                margin: "10px",
                background: theme === "dark" ? "#333" : "#fff",
                color: theme === "dark" ? "#fff" : "#000"
            }
        } >
        <
        h3 > Тема: { theme } < /h3> <
        button onClick = { toggleTheme } > Переключить тему < /button> <
        /div>
    );
}

// 5. ExpensiveCalculation (useMemo + useEffect)
function ExpensiveCalculation() {
    var [number, setNumber] = useState(1);
    var [renderCount, setRenderCount] = useState(0);

    var expensiveResult = useMemo(function() {
        console.log("Выполняются сложные вычисления...");
        var result = 0;
        for (var i = 0; i < 100000000; i++) {
            result += number;
        }
        return result;
    }, [number]);

    useEffect(function() {
        setRenderCount(function(prev) { return prev + 1; });
    });

    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > Сложные вычисления < /h3> <
        div > Число: { number } < /div> <
        div > Результат: { expensiveResult } < /div> <
        div > Количество рендеров: { renderCount } < /div> <
        button onClick = {
            function() { setNumber(function(prev) { return prev + 1; }); } } >
        Увеличить число <
        /button> <
        button onClick = {
            function() { setRenderCount(0); } } >
        Сбросить счётчик рендеров <
        /button> <
        /div>
    );
}

// 6.1 FocusInput (useRef)
function FocusInput() {
    var inputRef = useRef(null);
    var focusInput = function() {
        inputRef.current.focus();
    };
    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > Фокус на input < /h3> <
        input ref = { inputRef }
        placeholder = "Нажмите кнопку для фокуса" / >
        <
        button onClick = { focusInput } > Фокус на input < /button> <
        /div>
    );
}

// 6.2 PreviousValue (useRef + useEffect)
function PreviousValue() {
    var [value, setValue] = useState("");
    var previousValue = useRef();

    useEffect(function() {
        previousValue.current = value;
    }, [value]);

    return ( <
        div style = {
            { border: "1px solid #ccc", padding: "20px", margin: "10px" } } >
        <
        h3 > Текущее и предыдущее значение < /h3> <
        input value = { value }
        onChange = {
            function(e) { setValue(e.target.value); } }
        placeholder = "Введите текст" /
        >
        <
        div > Текущее: { value } < /div> <
        div > Предыдущее: { previousValue.current } < /div> <
        /div>
    );
}

// ThemeProvider (useContext обёртка)
function ThemeProvider(props) {
    var [theme, setTheme] = useState("light");
    var toggleTheme = useCallback(function() {
        setTheme(function(prev) {
            return prev === "light" ? "dark" : "light";
        });
    }, []);

    var value = useMemo(function() {
        return { theme: theme, toggleTheme: toggleTheme };
    }, [theme, toggleTheme]);

    return ( <
        ThemeContext.Provider value = { value } > { props.children } <
        /ThemeContext.Provider>
    );
}

// Основной компонент раздела
function AdvancedHooks() {
    return ( <
        ThemeProvider >
        <
        div style = {
            { padding: "20px", border: "2px solid green", margin: "10px" } } >
        <
        h2 > Продвинутые хуки < /h2> <
        div >
        <
        h3 > Задание 3: useReducer < /h3> <
        ShoppingCart / >
        <
        Stopwatch / >
        <
        /div> <
        div >
        <
        h3 > Задание 4: useContext < /h3> <
        ThemeToggle / >
        <
        /div> <
        div >
        <
        h3 > Задание 5: useCallback и useMemo < /h3> <
        ExpensiveCalculation / >
        <
        /div> <
        div >
        <
        h3 > Задание 6: useRef < /h3> <
        FocusInput / >
        <
        PreviousValue / >
        <
        /div> <
        /div> <
        /ThemeProvider>
    );
}

export default AdvancedHooks;