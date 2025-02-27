import './AdminPageStyles.css';
import React from "react";

function Button(props) {
    return (
        <button onClick={props.onClick} className={props.className}>
            {props.buttonName}
        </button>
    );
}

export default Button;
