// AdminPage.js
import Title from './Title';
import Button from './Button';
import './AdminPageStyles.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import LanguageItem from './LanguageItem';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


function AdminPage() {
    const [languages, setLanguages] = useState([]);
    const [newLanguageName, setNewLanguageName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const token = Cookies.get("jwt");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const languageResponse = await axios.get('http://localhost:5253/MojeRep/admin/Languages',
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    });
                setLanguages(languageResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Błąd ładowania danych", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Ładowanie...</div>;
    }

    function deleteLanguage(id) {
        const fetchData = async () => {
            try {
                await axios.delete(`http://localhost:5253/MojeRep/admin/Languages/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    });
                setLanguages((prevLanguages) => prevLanguages.filter((l) => l.id !== id));
            } catch (error) {
                console.error("Błąd podczas usuwania języka", error);
            }
        };

        fetchData();
    }

    function addLanguage() {
        if (!newLanguageName.trim()) {
            alert("Nazwa języka nie może być pusta.");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5253/MojeRep/admin/Languages', { nazwa: newLanguageName },
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    });
                setLanguages((prevLanguages) => [...prevLanguages, response.data]);
                setNewLanguageName("");
            } catch (error) {
                console.error("Błąd podczas dodawania języka", error);
            }
        };

        fetchData();
    }

    function editLanguage(id, newName) {
        console.log("EDITLANGUAGE WYWOLANE");
        const fetchData = async () => {
            try {
                await axios.put(`http://localhost:5253/MojeRep/admin/Languages/${id}`, { nazwa: newName },
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    });
                setLanguages((prevLanguages) =>
                    prevLanguages.map((language) =>
                        language.id === id ? { ...language, nazwa: newName } : language
                    )
                );
            } catch (error) {
                console.error("Błąd podczas edytowania języka", error);
            }
        };

        fetchData();
    }

    function goToTranslators(){
        navigate("/admin/translators");
    }
    function logout(){
        navigate("/");
        Cookies.remove("jwt");
    }
    return (
        <div className="adminPage">
            <div className="TitlePageAdmin">
                <Title/>
                <Button className="buttonAdmin" onClick={goToTranslators} buttonName="Tłumacze"/>
                <Button className="buttonAdmin" onClick={logout} buttonName="Wyloguj"/>
            </div>
            <div className="LabelAndAddButton">
                <h2 className="moduleName">Języki</h2>
                <div className="language-form">
                    <input
                        type="text"
                        className="language-input"
                        placeholder="Wprowadź nazwę języka"
                        value={newLanguageName}
                        onChange={(e) => setNewLanguageName(e.target.value)}
                    />
                    <button className="addButton" onClick={addLanguage}>Dodaj język</button>
                </div>
            </div>
            <div className="languagesPart">
                {languages.map((language) => (
                    <LanguageItem
                        key={language.id}
                        id={language.id}
                        name={language.nazwa}
                        onEdit={editLanguage}
                        onDelete={() => deleteLanguage(language.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminPage;