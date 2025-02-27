import React, { useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

function UserItem(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedID, setEditedID] = useState(props.user.id);
    const [editedName, seteditedName] = useState(props.user.imie);
    const [editedSurname, setEditedSurname] = useState(props.user.nazwisko);
    const [editedEmail, setEditedEmail] = useState(props.user.email);
    const [editedPassword, setEditedPassword] = useState(props.user.hasło);
    const [editedRole, setEditedRole] = useState(props.user.rola);


   function handleSave(){

   }

    const deleteUser = async (userId) => {
       props.delete(userId);
    };

    function editUser() {
        const editedUser = {
            id: props.user.id,
            imie: editedName,
            nazwisko: editedSurname,
            email: editedEmail,
            hasło: editedPassword,
            rola: editedRole,
            numerIndeksuTłumacza: props.user.numerIndeksuTłumacza,
            dataDołaczenia: props.user.dataDołaczenia,
            dataOdejścia: props.user.dataOdejścia,
        };
        console.log("wysylane:",editedUser);
        props.edit(editedUser);
        setIsEditing(false);

        setEditedID(props.user.id);
        seteditedName(editedName);
        setEditedSurname(editedSurname);
        setEditedEmail(editedEmail);
        setEditedPassword(editedPassword);
        setEditedRole(editedRole);
    }
    function cancelEdit(){
        setEditedID(props.user.id);
        seteditedName(props.user.imie);
        setEditedSurname(props.user.nazwisko);
        setEditedEmail(props.user.email);
        setEditedPassword(props.user.hasło);
        setEditedRole(props.user.rola);
        setIsEditing(false);
    }

    return (
        <div className="userItem">
            {!isEditing ? (
                <div className="userInfoPart">
                    <p className="userInfoP">ID: {editedID}</p>
                    <p className="userInfoP">Imie: {editedName}</p>
                    <p className="userInfoP">Nazwisko: {editedSurname}</p>
                    <p className="userInfoP">Email: {editedEmail}</p>
                    <p className="userInfoP">Hasło: {editedPassword.length === 60 ? "Zaszyfrowane (można zmienic)" : editedPassword}</p>
                    <p className="userInfoP">Rola: {editedRole}</p>
                </div>
            ) : (
                <div className="forms">

                    <label htmlFor="Imię" className="userInfoP"> Imię</label>
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => seteditedName(e.target.value)}
                        className="edit-input"
                        name="Imię"
                    />
                    <label htmlFor="Nazwisko" className="userInfoP"> Nazwisko</label>
                    <input
                        type="text"
                        value={editedSurname}
                        onChange={(e) => setEditedSurname(e.target.value)}
                        className="edit-input"
                        name="Nazwisko"
                    />
                    <label htmlFor="Email" className="userInfoP"> Email</label>
                    <input
                        type="text"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="edit-input"
                        name="Email"
                    />
                    <label htmlFor="Hasło" className="userInfoP"> Hasło</label>
                    <input
                        type="text"
                        value={editedPassword.length === 60 ? "zaszyfrowane" : editedPassword}
                        onChange={(e) => setEditedPassword(e.target.value)}
                        className="edit-input"
                        name="Hasło"
                    />
                    <label htmlFor="Rola" className="userInfoP"> Rola</label>
                    <input
                        type="text"
                        value={editedRole}
                        onChange={(e) => setEditedRole(e.target.value)}
                        className="edit-input"
                        name="Rola"
                    />
                </div>
            )}
            <div className="buttonsPanelUser">
                {isEditing ? (
                    <>
                        <button onClick={() => editUser()} className="save-button2">
                            <FaSave/></button>
                        <button onClick={cancelEdit} className="cancel-button">
                            <FaTimes/></button>
                        <button onClick={() => deleteUser(props.user.id)} className="delete-button2">
                            <FaTrash/></button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setIsEditing(true)} className="edit-button2">
                            <FaEdit/></button>
                        <button onClick={() => deleteUser(props.user.id)} className="delete-button2">
                            <FaTrash/></button>
                    </>
                )}
            </div>
        </div>
    );
}

export default UserItem;
