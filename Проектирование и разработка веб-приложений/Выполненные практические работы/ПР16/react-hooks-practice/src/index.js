// Полифиллы для старых браузеров (IE11+)
import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Используем ReactDOM.render (не createRoot!) — для IE11
ReactDOM.render( <
    React.StrictMode >
    <
    App / >
    <
    /React.StrictMode>,
    document.getElementById("root")
);