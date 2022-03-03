import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AngularPicture from '../static/angular.png'

const App = () => (
    <div>
        <h1 className='app-heading'>
            My React and TypeScript App!!{" "}
            {new Date().toLocaleDateString()}
        </h1>
        <img src={AngularPicture}></img>
    </div>
);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);