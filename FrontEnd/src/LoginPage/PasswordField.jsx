import { useState } from "react";
import '../styles/LoginRegister.css';
function PasswordField(props) {
    const [newInput, setNewInput] = useState("");
    const [supportText, setSupportText] = useState("");
    document.body.className = "body";
    function changeInput(event) {
        const { value } = event.target;
        setNewInput(value);

        if (value === "") {
            setSupportText("");
        } else if (value.length < 8) {
            setSupportText("Hasło musi mieć przynajmniej 8 znaków");
        }
        else if(value.length === 8) {
            setSupportText("");
        }
    }

    return (
        <div className="inputField">
            <label className="inputLabel">{props.label}</label>
            <input
                type="password"
                onChange={changeInput}
                className="inputBox"
                value={newInput}
            />
            <label className="supportText">{supportText}</label>
        </div>
    );
}

export default PasswordField;
