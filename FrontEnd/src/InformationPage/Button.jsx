import '../styles/LoginRegister.css';
import React from "react";
import { useNavigate } from "react-router-dom";

function Button(props) {
    const navigate = useNavigate();

    function OnClick() {
        if (props.buttonName === "Zaloguj") {
            navigate("/");
        }
        if(props.buttonName === "Rejestracja"){
            navigate("/Rejestracja");
        }
    }

    return (
        <button onClick={OnClick} className="button">
            {props.buttonName}
        </button>
    );
}

export default Button;
