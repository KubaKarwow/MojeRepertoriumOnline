import React, { useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

function TranslatorItem(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedIndexNumber, setEditedIndexNumber] = useState(props.user.numerIndeksuTłumacza);
    const [editedJoinDate, setEditedJoinDate] = useState(props.user.dataDołaczenia);
    const [editedLeaveDate, setEditedLeaveDate] = useState(props.user.dataOdejścia);


    function handleSave(){

    }

    const deleteUser = async (userId) => {
        props.delete(userId);
    };

    function editUser() {
        const editedUser = {
            id: props.user.id,
            imie: props.user.imie,
            nazwisko: props.user.nazwisko,
            email: props.user.email,
            hasło: props.user.hasło,
            rola: props.user.rola,
            numerIndeksuTłumacza: editedIndexNumber,
            dataDołaczenia: editedJoinDate,
            dataOdejścia: editedLeaveDate,
        };
        console.log("wysylane:",editedUser);
        props.edit(editedUser);
        setIsEditing(false);

        setEditedIndexNumber(editedIndexNumber);
        setEditedJoinDate(editedJoinDate);
        setEditedLeaveDate(editedLeaveDate);
    }
    function cancelEdit(){

        setEditedIndexNumber(props.user.numerIndeksuTłumacza);
        setEditedJoinDate(props.user.dataDołaczenia);
        setEditedLeaveDate(props.user.dataOdejścia);
        setIsEditing(false);
    }

    return (
        <div className="userItem">
            {!isEditing ? (
                <div className="userInfoPart">
                    <p className="userInfoP">Numer indeksu tłumacza: {editedIndexNumber}</p>
                    <p className="userInfoP">Data dołaczenia: {editedJoinDate}</p>
                    <p className="userInfoP">Data odejścia: {editedLeaveDate===null?"Brak":editedLeaveDate}</p>
                    <p className="userInfoP">User ID: {props.user.id}</p>
                </div>
            ) : (
                <div className="forms">
                    <label htmlFor="Index" className="userInfoP"> Numer indeksu</label>
                    <input
                        type="text"
                        value={editedIndexNumber}
                        onChange={(e) => setEditedIndexNumber(e.target.value)}
                        className="edit-input"
                        name="Index"
                    />
                    <label htmlFor="Join" className="userInfoP"> Data dołączenia</label>
                    <input
                        type="text"
                        value={editedJoinDate}
                        onChange={(e) => setEditedJoinDate(e.target.value)}
                        className="edit-input"
                        name="Join"
                    />
                    <label htmlFor="Leave" className="userInfoP"> Data odejścia</label>
                    <input
                        type="text"
                        value={editedLeaveDate}
                        onChange={(e) => setEditedLeaveDate(e.target.value)}
                        className="edit-input"
                        name="Leave"
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

export default TranslatorItem;
