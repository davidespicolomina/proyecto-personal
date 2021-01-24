import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";

// This map must contain all main react components, which can be rendered from the HTML page
const COMPONENTS = {
    'App': App,
};

ReactDOM.render(
    React.createElement(COMPONENTS[window.react_component], window.react_props),
    window.react_mount,
);
