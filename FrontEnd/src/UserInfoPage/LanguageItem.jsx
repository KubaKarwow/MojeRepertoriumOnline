import React, {useEffect, useState} from "react";
import {FaEdit, FaTrash, FaSave, FaTimes, FaAngleDown, FaAngleUp} from "react-icons/fa";
import axios from 'axios';

function LanguageItem({langId,name,level,amountOfTranslates, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);

    const [editedName, setEditedName] = useState(name);
    const [editedLevel, setEditedLevel] = useState(level);
    const [editedAmountOfTranslates, setEditedAmountOfTranslates] = useState(amountOfTranslates);
    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        async function getLanguages() {
            const response = await axios.get(
                "http://localhost:5253/MojeRep/admin/Languages"
            )
            setLanguages(response.data);
        }

        getLanguages();
    }, []);
    function handleSave(){
        console.log("HANDLE SAVE WYWOLANE");
        console.log(editedName);
        onEdit({
            name: editedName,
            level: editedLevel,
            amountOfTranslatesDone: editedAmountOfTranslates,
            id:langId
        });
        setIsEditing(false);
    };

    return (
        <div className={isEditing?"language-item2-large":"language-item2"}>
            {isEditing ? (
                    <div>
                        <label className="label" htmlFor="name-input">Język</label>
                        <select
                            className="edit-input-select"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        >
                            {languages.map((lang) => (
                                <option key={lang.id} value={lang.nazwa}>{lang.nazwa}</option>
                            ))}
                        </select>
                        <label className="label" htmlFor="name-input">Poziom</label>
                        <input
                            type="text"
                            className="edit-input2"
                            placeholder="Wprowadź nazwę dokumentu"
                            value={editedLevel}
                            onChange={(e) => setEditedLevel(e.target.value)}
                        />
                        <label className="label" htmlFor="name-input">Ilość tłumaczeń</label>
                        <input
                            type="text"
                            className="edit-input2"
                            placeholder="Wprowadź nazwę dokumentu"
                            value={editedAmountOfTranslates}
                            onChange={(e) => setEditedAmountOfTranslates(e.target.value)}
                        />
                    </div>
                )
                :
                (
                    <span className="language-text">
                    Nazwa: {name} <br/>
                    Poziom: {level} <br/>
                    Ilość tłumaczeń: {amountOfTranslates} <br/>
                </span>
                )
            }
            <div className="language-actions">
                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="save-button">
                            <FaSave/>
                        </button>
                        <button onClick={() => setIsEditing(false)} className="edit-button">
                            <FaTimes/>
                        </button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="edit-button">
                        <FaEdit/>
                    </button>

                )}
                <button onClick={() => onDelete(langId)} className="delete-button">
                    <FaTrash/>
                </button>
            </div>
        </div>
    )
        ;
}

export default LanguageItem;
