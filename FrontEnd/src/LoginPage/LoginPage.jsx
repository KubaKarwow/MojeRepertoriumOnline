import '../styles/LoginRegister.css';
import Title from "./Title";
import TextField from "./TextField";
import Button from "./Button";
import PasswordField from "./PasswordField";
import React, {useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';


function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailSupportText, setEmailSupportText] = useState("");
    const [passwordSupportText, setPasswordSupportText] = useState("");
    const navigate = useNavigate(); // Użycie poprawnego hooka

    function changeEmail(event) {
        let emailVal = event.target.value;
        setEmail(emailVal);
        const emailRegex = /.+@.+\..+/;
        if (!emailRegex.test(emailVal)) {
            setEmailSupportText("To nie jest poprawny adres email");
        } else {
            setEmailSupportText("");
        }
    }

    async function loginUser() {
        const userData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.put('http://localhost:5253/MojeRep/login', userData);
            alert("Zalogowano pomyślnie");

            const token = response.data;

            document.cookie = `jwt=${token}; path=/; max-age=${24 * 60 * 60}`;

            const decodedToken = jwtDecode(token);

            console.log('Decoded Token:', decodedToken);

            if (decodedToken.role === "2") {
                navigate("/admin");
            } else if (decodedToken.role === "1") {
                navigate("/user");
            }
        } catch (error) {
            if (error.response) {
                console.error('Błąd odpowiedzi:', error.response.data);
                console.error('Kod błędu:', error.response.status);
                alert(`Błąd: ${error.response.data}`);
            } else if (error.request) {
                console.error('Błąd zapytania:', error.request);
                alert('Błąd połączenia z serwerem!');
            } else {
                console.error('Błąd:', error.message);
                alert(`Błąd: ${error.message}`);
            }
        }
    }

    function login() {
        let isValid = true;
        console.log("we get in there")
        console.log(password);
        const emailRegex = /.+@.+\..+/;
        if (!emailRegex.test(email)) {
            isValid = false;
            alert("To nie jest poprawny adres email");
            setEmailSupportText("To nie jest poprawny adres email");
        } else {
            setEmailSupportText("");
        }
        if (password.length < 8) {
            isValid = false;
            alert("Hasło musi mieć przynajmniej 8 znaków");
        }
        if (isValid) {
            loginUser();
        }
    }

    function changePassword(event) {
        let pasVal = event.target.value;
        setPassword(pasVal);
        if (pasVal.length < 8) {
            setPasswordSupportText("Hasło musi mieć przynajmniej 8 znaków");
        } else {
            setPasswordSupportText("");
        }
    }

    function goToRegister(event) {
        navigate("/Rejestracja"); // Programowe przekierowanie
    }

    function goToInfo(event) {
        navigate("/Informacje");
    }

    return (
        <div className="LoginPage">
            <Title/>
            <div className="inputField">
                <label className="inputLabel">Email</label>
                <input
                    type="text"
                    onChange={changeEmail}
                    className="inputBox"
                    value={email}
                />
                <label className="supportText">{emailSupportText}</label>
            </div>
            <div className="inputField">
                <label className="inputLabel">Hasło</label>
                <input
                    type="password"
                    onChange={changePassword}
                    className="inputBox"
                    value={password}
                />
                <label className="supportText">{passwordSupportText}</label>
            </div>
            <div className="ButtonList">
                <Button onClick={login} buttonName="Zaloguj"/>
                <Button onClick={goToRegister} buttonName="Rejestracja"/>
                <Button onClick={goToInfo} buttonName="Informacje"/>
            </div>
        </div>
    )

}

export default LoginPage;
