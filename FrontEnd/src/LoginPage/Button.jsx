import '../styles/LoginRegister.css';
import React from "react";

function Button(props) {
    return (
        <button onClick={props.onClick} className="button">
            {props.buttonName}
        </button>
    );
}

export default Button;
