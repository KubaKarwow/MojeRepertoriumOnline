import React from "react";
import "./userPageStyles.css";

function Button(props) {
    return (
        <button onClick={props.onClick} className={props.className}>
            {props.buttonName}
        </button>
    );
}

export default Button;
