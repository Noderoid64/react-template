import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = () => (
    <h1 className='app-heading'>
        My React and TypeScript App!!{" "}
        {new Date().toLocaleDateString()}
    </h1>
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);