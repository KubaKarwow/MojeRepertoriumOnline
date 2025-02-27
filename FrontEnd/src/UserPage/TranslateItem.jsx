import React, {useState, useEffect} from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes, FaAngleDown, FaAngleUp} from "react-icons/fa";


// tu dostajesz translateId, documentName
function TranslateItem(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [isShowingDetails, setIsShowingDetails] = useState(false);
    const [editedDocName, setEditedDocName] = useState(props.translate.documentName);
    const [editedDate, setEditedDate] = useState(props.translate.date);
    const [editedOriginalLanguage, setEditedOriginalLanguage] = useState(props.translate.originalLanguage);
    const [editedTranslateLanguage, setEditedTranslateLanguage] = useState(props.translate.translateLanguage);
    const [languages, setLanguages] = useState([]);
    function handleSave(){

   }
    useEffect(() => {
        async function loadLanguages() {
            console.log("languages",props.languages);
            setLanguages(props.languages);
        }
        loadLanguages();
    })

     function deleteTranslate(translateId){
         props.delete(translateId);
    }
    function editTranslate() {
        const editedTranslate = {
            originalLanguage: editedOriginalLanguage,
            translateLanguage: editedTranslateLanguage,
            date: editedDate,
            name: editedDocName
        };

        console.log("wysylane:",editedTranslate);
        props.edit(props.translate.translateId,editedTranslate);
        setIsEditing(false);


    }
    function cancelEdit(){
        setIsEditing(false);
        setEditedDocName(props.translate.documentName);
        setEditedOriginalLanguage(props.translate.originalLanguage);
        setEditedTranslateLanguage(props.translate.translateLanguage);
        setEditedDate(props.translate.date);
    }

    return (
        <div className={isShowingDetails?"translateItemLarge":"translateItem"}>
            {!isEditing ? (
                <div className="userInfoPart">
                    <p className="userInfoP">ID: {props.translate.translateId}</p>
                    <p className="userInfoP">Nazwa dokumentu: {editedDocName}</p>
                    {isShowingDetails?(
                        <div className="translateDetails">
                            <p className="userInfoP"> Język dokumentu: {editedOriginalLanguage} </p>
                            <p className="userInfoP"> Język wykonania: {editedTranslateLanguage} </p>
                            <p className="userInfoP"> Data wykonania: {editedDate} </p>
                        </div>
                    ): (
                        <div className="translateDetails"></div>
                    )}
                </div>
            ) : (
                <div className="language-form-edit">
                    <select
                        className="edit-input-select"
                        value={editedOriginalLanguage}
                        onChange={(e) => setEditedOriginalLanguage(e.target.value)}
                    >
                        {languages.map((lang) => (
                            <option key={lang.id} value={lang.nazwa}>{lang.nazwa}</option>
                        ))}
                    </select>
                    <select
                        className="edit-input-select"
                        value={editedTranslateLanguage}
                        onChange={(e) => setEditedTranslateLanguage(e.target.value)}
                    >
                        {languages.map((lang) => (
                            <option key={lang.id} value={lang.nazwa}>{lang.nazwa}</option>
                        ))}
                    </select>
                    <input
                        type="date"
                        className="date-input"
                        placeholder="Wprowadź datę wykonania"
                        value={editedDate}
                        onChange={(e) => setEditedDate(e.target.value)}
                    />
                    <input
                        type="text"
                        className="edit-input2"
                        placeholder="Wprowadź nazwę dokumentu"
                        value={editedDocName}
                        onChange={(e) => setEditedDocName(e.target.value)}
                    />
                </div>
            )}
            <div className="buttonsPanelTranslator2">
                {!isShowingDetails ? (
                    <>
                        <button onClick={() => setIsShowingDetails(true)} className="edit-button2">
                            <FaAngleDown/></button>
                        <button onClick={() => deleteTranslate(props.translate.translateId)} className="delete-button2">
                            <FaTrash/></button>
                    </>
                ) : !isEditing ? (
                    <>
                        <button onClick={() => setIsShowingDetails(false)} className="edit-button2">
                            <FaAngleUp/></button>
                        <button onClick={() => deleteTranslate(props.translate.translateId)} className="delete-button2">
                            <FaTrash/></button>
                        <button onClick={() => setIsEditing(true)} className="edit-button2">
                            <FaEdit/></button>
                    </>
                ) : (
                    <div>
                        <button onClick={() => editTranslate()} className="save-button2">
                            <FaSave/></button>
                        <button onClick={cancelEdit} className="cancel-button">
                            <FaTimes/></button>
                        <button onClick={() => deleteTranslate(props.translate.translateId)} className="delete-button2">
                            <FaTrash/></button>

                    </div>
                )}
            </div>
        </div>
    );
}

export default TranslateItem;
