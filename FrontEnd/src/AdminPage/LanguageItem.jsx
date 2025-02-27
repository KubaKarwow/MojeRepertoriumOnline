import React, { useState } from "react";
import './AdminPageStyles.css';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';

function LanguageItem({ id, name, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);

    const handleSave = () => {
        console.log("HANDLE SAVE WYWOLANE")
        onEdit(id, editedName);
        setIsEditing(false);
    };

    return (
        <div className="language-item">
            {isEditing ? (
                <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="edit-input"
                />
            ) : (
                <span className="language-text">
                    Nazwa: {name} <br />
                    ID: {id}
                </span>
            )}
            <div className="language-actions">
                {isEditing ? (
                    <button onClick={handleSave} className="save-button">
                        <FaSave />
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="edit-button">
                        <FaEdit />
                    </button>
                )}
                <button onClick={onDelete} className="delete-button">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

export default LanguageItem;
