import { useState } from "react";
import "../styles/LoginRegister.css";

function TextField({ label, emailValue, giveInputUp }) {
    const [supportText, setSupportText] = useState("");

    function isInteger(string) {
        let num = Number(string);
        return !isNaN(num) && Number.isInteger(num);
    }

    function changeInput(event) {
        console.log("WERE HERE");
        const { value } = event.target;
        console.log(value);


        if (label === "Email") {

        } else if (label === "Numer indeksu tłumacza") {

        }
    }

    return (
        <div className="inputField">
            <label className="inputLabel">{label}</label>
            <input
                type="text"
                onChange={changeInput}
                className="inputBox"
                value={""}
            />
            <label className="supportText">{supportText}</label>
        </div>
    );
}

export default TextField;
