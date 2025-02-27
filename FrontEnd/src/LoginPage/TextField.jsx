import { useState } from "react";
import "../styles/LoginRegister.css";

function TextField(props) {
    const [newInput, setNewInput] = useState("");
    const [supportText, setSupportText] = useState("");

    function changeInput(event) {
        const { value } = event.target;
        setNewInput(value);


        const emailRegex = /.+@.+\..+/;

        if (value === "") {
            setSupportText("");
        } else if (!emailRegex.test(value)) {
            setSupportText("To nie jest poprawny adres email");
        } else {
            setSupportText("");
        }
    }

    return (
        <div className="inputField">
            <label className="inputLabel">{props.label}</label>
            <input
                type="text"
                onChange={changeInput}
                className="inputBox"
                value={newInput}
            />
            <label className="supportText">{supportText}</label>
        </div>
    );
}

export default TextField;
