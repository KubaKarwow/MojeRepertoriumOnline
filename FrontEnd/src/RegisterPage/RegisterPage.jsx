import '../styles/LoginRegister.css';
import Title from "./Title";
import TextField from "./TextField";
import PasswordField from "./PasswordField";
import Button from "./Button";
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RegisterPage(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [translatorId, setTranslatorId] = useState(0);


    const [emailSupportText, setEmailSupportText] = useState("");
    const [passwordSupportText, setPasswordSupportText] = useState("");
    const [numerIndeksuTłumaczaSupportText, setNumerIndeksuTłumaczaSupportText] = useState("");

    const  navigate = useNavigate();

    async function registerUser(){
        const userData = {
            email: email,
            password: password,
            name: firstName,
            surname: lastName,
            translatorNumber: translatorId
        };
        try{
            const response = await axios.post('http://localhost:5253/MojeRep/login', userData);
            alert("Wysłano załącznik na maila do potwierdzenia konta.");

        }catch (error) {
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
    function register() {
        let isValid = true;

        const emailRegex = /.+@.+\..+/;
        if (!emailRegex.test(email)) {
            isValid = false;
            setEmailSupportText("To nie jest poprawny adres email");
        } else {
            setEmailSupportText("");
        }
        if (password.length < 8) {
            isValid = false;
            alert("Hasło musi mieć przynajmniej 8 znaków");
        }
        if (!Number.isInteger(Number(translatorId))) {
            isValid = false;
            alert("Numer indeksu tłumacza musi być liczbą");
        }

        if (isValid) {
           registerUser();

        }
    }
    function goToLogin(){
        navigate("/");
    }
    function changeEmail(event){
        let emailVal = event.target.value;
        setEmail(emailVal);
        const emailRegex = /.+@.+\..+/;
        if (!emailRegex.test(emailVal)) {
            setEmailSupportText("To nie jest poprawny adres email");
        } else {
            setEmailSupportText("");
        }
    }
    function changePassword(event){
        let pasVal = event.target.value;
        setPassword(pasVal);
        if (pasVal.length < 8) {
            setPasswordSupportText("Hasło musi mieć przynajmniej 8 znaków");
        } else {
            setPasswordSupportText("");
        }
    }
    function changeFirstName(event){
        let newName = event.target.value;
        setFirstName(newName);
    }
    function changeLastName(event){
        let newLastName = event.target.value;
        setLastName(newLastName);
    }
    function isInteger(string) {
        let num = Number(string);
        return !isNaN(num) && Number.isInteger(num);
    }
    function changeTranslatorId(event){
        let newTranslatorId = event.target.value;
        setTranslatorId(newTranslatorId);
        if (!isInteger(newTranslatorId)) {
            setNumerIndeksuTłumaczaSupportText("Wpis w tym polu musi być liczbą");
        } else {
            setNumerIndeksuTłumaczaSupportText("");
        }
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
            <div className="inputField">
                <label className="inputLabel">Imię</label>
                <input
                    type="text"
                    onChange={changeFirstName}
                    className="inputBox"
                    value={firstName}
                />
            </div>
            <div className="inputField">
                <label className="inputLabel">Nazwisko</label>
                <input
                    type="text"
                    onChange={changeLastName}
                    className="inputBox"
                    value={lastName}
                />
            </div>
            <div className="inputField">
                <label className="inputLabel">Numer indeksu tłumacza</label>
                <input
                    type="text"
                    onChange={changeTranslatorId}
                    className="inputBox"
                    value={translatorId}
                />
                <label className="supportText">{numerIndeksuTłumaczaSupportText}</label>
            </div>
            <div className="ButtonListRegister">
                <Button buttonName={"Zarejestruj"} onClick={register}/>
                <Button buttonName={"Logowanie"} onClick={goToLogin}/>
            </div>
        </div>
    );
}

export default RegisterPage;
