import { useState } from "react";
import '../styles/LoginRegister.css';

function PasswordField({ label, value, onChange }) {
    const [supportText, setSupportText] = useState("");

    function changeInput(event) {
        const { value } = event.target;
        onChange(value);

        if (value.length < 8) {
            setSupportText("Hasło musi mieć przynajmniej 8 znaków");
        } else {
            setSupportText("");
        }
    }

    return (
        <div className="inputField">
            <label className="inputLabel">{label}</label>
            <input
                type="password"
                className="inputBox"
            />
            <label className="supportText">{supportText}</label>
        </div>
    );
}

export default PasswordField;
