import React, {useEffect, useState} from "react";
import Title from "./Title";
import Button from "./Button";
import {useNavigate} from "react-router-dom";
import {FaEdit, FaTrash, FaSave, FaTimes, FaAngleDown, FaAngleUp} from "react-icons/fa";
import axios from 'axios';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import LanguagesPart from "./LanguagesPart";

function UserInfoPage() {
    const navigate = useNavigate();

    const [editedName, setEditedName] = useState("");
    const [editedSurname, setEditedSurname] = useState("");
    const [editedJoinDate, setEditedJoinDate] = useState("");
    const [editedEmail, setEditedEmail] = useState("");
    const [editedPassword, setEditedPassword] = useState("");
    const [editedIndexNumber, setEditedIndexNumber] = useState("");
    const [isEditing, setIsEditing] = useState("");
    const [allowed, setAllowed] = useState(true);
    const [userId, setUserId] = useState();
    const [refresh, setRefresh] = useState(false);
    const token = Cookies.get("jwt");
    useEffect(() => {
        async function getUserData() {
            try {
                if (token) {
                    const decoded = jwtDecode(token);
                    //console.log(decoded);
                    const response = await axios.get(
                        `http://localhost:5253/MojeRep/tlumacz/${decoded.id}/Credentials`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                            }
                        }
                    );
                    setUserId(decoded.id);
                    setEditedName(response.data.name);
                    setEditedSurname(response.data.surname);
                    setEditedEmail(response.data.email);
                    setEditedPassword(response.data.password.length===60?"Zaszyfrowane można zmienić":response.data.password);
                    setEditedIndexNumber(response.data.translatorNumber);
                    setEditedJoinDate(response.data.joinDate);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
        getUserData();
    },[refresh])

    function cancelEdit() {

    }

    function goToUser() {
        navigate("/user");
    }

    function handleSave() {
        async function sendEditedUser(){
            var editedUser = {
                name: editedName,
                surname: editedSurname,
                email: editedEmail,
                password: editedPassword,
                translatorNumber: editedIndexNumber,
                joinDate: editedJoinDate
            };
            console.log(editedUser);

            const response = await axios.put(
                "http://localhost:5253/MojeRep/tlumacz/"+userId+
                "/Credentials"
            ,editedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                    }
                });
            setRefresh((p) => !p);
        }
        sendEditedUser();
        setIsEditing(false);
    }
    function logout(){
        navigate("/");
        Cookies.remove("jwt");
    }
    return (<div>
        <div className="TitlePageTranslatorsAdmin">
            <Title/>
            <Button className="buttonUser" onClick={goToUser} buttonName="Tłumaczenia"/>
            <Button className="buttonUser" onClick={logout} buttonName="Wyloguj"/>
        </div>
        <div className="LabelAndAddButton2">
            <h2 className="moduleName">Informacje konta</h2>
            {isEditing ? (
                <div className="language-form4">
                    <div className="labelPart">
                        <label className="label" htmlFor="name-input">Imię</label>
                        <input
                            type="text"
                            id="name-input"
                            className="edit-input2"
                            placeholder="Imię"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                    </div>

                    <div className="labelPart">
                        <label className="label" htmlFor="doc-name-1">Nazwisko</label>
                        <input
                            type="text"
                            id="doc-name-1"
                            className="edit-input2"
                            placeholder="Wprowadź nazwę dokumentu"
                            value={editedSurname}
                            onChange={(e) => setEditedSurname(e.target.value)}
                        />
                    </div>

                    <div className="labelPart">
                        <label className="label" htmlFor="date-input">Data dołączenia</label>
                        <input
                            type="date"
                            id="date-input"
                            className="date-input"
                            placeholder="Wprowadź datę wykonania"
                            value={editedJoinDate}
                            onChange={(e) => setEditedJoinDate(e.target.value)}
                        />
                    </div>
                    <div className="labelPart">
                        <label className="label" htmlFor="doc-name-2">Email</label>
                        <input
                            type="text"
                            id="doc-name-2"
                            className="edit-input2"
                            placeholder="Wprowadź nazwę dokumentu"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                        />
                    </div>

                    <div className="labelPart">
                        <label className="label" htmlFor="doc-name-3">Hasło</label>
                        <input
                            type="text"
                            id="doc-name-3"
                            className="edit-input2"
                            placeholder="Wprowadź nazwę dokumentu"
                            value={editedPassword}
                            onChange={(e) => setEditedPassword(e.target.value)}
                        />
                    </div>

                    <div className="labelPart">
                        <label className="label" htmlFor="doc-name-4">Numer indeksu tłumacza</label>
                        <input
                            type="text"
                            id="doc-name-4"
                            className="edit-input2"
                            placeholder="Wprowadź nazwę dokumentu"
                            value={editedIndexNumber}
                            onChange={(e) => setEditedIndexNumber(e.target.value)}
                        />
                    </div>

                    <div className="buttonsPanelUser2">
                        {!isEditing ? (
                            <>
                                <button onClick={() => setIsEditing(true)} className="edit-button2">
                                    <FaEdit/></button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => handleSave()} className="edit-button2">
                                    <FaSave/></button>
                                <button onClick={() => setIsEditing(false)} className="edit-button2">
                                    <FaTimes/></button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div className="language-form4">
                        <p className="userInfoP">Imię: {editedName}</p>
                        <p className="userInfoP">Nazwisko: {editedSurname}</p>
                        <p className="userInfoP"> Email: {editedEmail} </p>
                        <p className="userInfoP"> Hasło: {editedPassword} </p>
                        <p className="userInfoP"> Numer indeksu tłumacza: {editedIndexNumber} </p>
                        <p className="userInfoP"> Data dołączenia: {editedJoinDate} </p>
                        <div className="buttonsPanelUser2">
                            {!isEditing ? (
                                <>
                                    <button onClick={() => setIsEditing(true)} className="edit-button2">
                                        <FaEdit/></button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleSave()} className="edit-button2">
                                        <FaSave/></button>
                                    <button onClick={() => setIsEditing(false)} className="edit-button2">
                                        <FaTimes/></button>
                                </>
                            )}
                        </div>
                </div>
            )}
        </div>
        <LanguagesPart />

    </div>)
}

export default UserInfoPage;