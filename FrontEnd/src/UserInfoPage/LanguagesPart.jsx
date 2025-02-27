import React from "react";
import {FaEdit, FaTrash, FaSave, FaTimes, FaAngleDown, FaAngleUp} from "react-icons/fa";
import axios from 'axios';
import Button from "./Button";
import {useEffect, useState} from "react";
import LanguageItem from "./LanguageItem";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

function LanguagesPart(props) {
    const [newLanguageName, setNewLanguageName] = useState("");
    const [newLanguageLevel, setNewLanguageLevel] = useState("");
    const [languages, setLanguages] = useState([]);
    const [userId, setUserId] = useState(0);

    const [totalLanguages, setTotalLanguages] = useState("");
    const [userLanguageRecords, setUserLanguageRecords] = useState([]);
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const token = Cookies.get("jwt");

    const [needRefresh, setNeedRefresh] = useState(false);
    useEffect(() => {
        async function getAvailableLanguages() {
            try {

                const response = await axios.get(
                    "http://localhost:5253/MojeRep/admin/Languages",
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                    }
                }
                );
                setLanguages(response.data);

            } catch
                (error) {
                console.error("Error fetching users:", error);
            }
        }

        const token = Cookies.get("jwt");
        if (!token) {
            return;
        }
        const decoded = jwtDecode(token);
        console.log(decoded);
        setUserId(decoded.id);

        async function getRecords() {
            try {

                const response = await axios.get(
                    "http://localhost:5253/MojeRep/tlumacz/" + decoded.id + "/Languages/" + (currentPage - 1) * itemsPerPage + "/" + itemsPerPage,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
                );
                setUserLanguageRecords(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        async function getAmountOfLanguages() {
            try {
                const response = await axios.get(
                    "http://localhost:5253/MojeRep/tlumacz/" + decoded.id + "/Languages/amount",
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
                );
                setTotalLanguages(response.data);
                setTotalPages(Math.ceil(response.data / itemsPerPage));
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        }

        getAmountOfLanguages();
        getRecords();
        getAvailableLanguages();

    }, []);

    useEffect(() => {
        async function getAmountOfLanguages() {
            try {
                const response = await axios.get(
                    "http://localhost:5253/MojeRep/tlumacz/" + userId + "/Languages/amount",
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
                );
                setTotalLanguages(response.data);
                setTotalPages(Math.ceil(response.data / itemsPerPage));
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        }

        async function getRecords() {
            try {
                console.log("Z TEJ FUNKCJI CO JEST PROBLEM");
                console.log(token);
                const response = await axios.get(
                    "http://localhost:5253/MojeRep/tlumacz/" + userId + "/Languages/" + (currentPage - 1) * itemsPerPage + "/" + itemsPerPage,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
                );
                setUserLanguageRecords(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        getRecords();
        getAmountOfLanguages();
    }, [totalLanguages,needRefresh]);

    function addLanguage() {
        async function addLanguageRecord() {
            try {
                let languageRecord = {
                    name: newLanguageName,
                    level: newLanguageLevel
                };
                const response = await axios.post(
                    "http://localhost:5253/MojeRep/tlumacz/" + userId + "/Languages",
                     languageRecord,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    });
                setNeedRefresh((prevVal) => !prevVal);

            } catch (error) {
                alert(`Błąd: Taki jezyk jest juz przypisany do uzytkownika`);
            }
        }

        setNeedRefresh((prevVal) => !prevVal);
        addLanguageRecord();
    }

    function editLanguage(record) {
        console.log(record);

        async function editLanguageRecord() {
            try {
                const response = await axios.put(
                    "http://localhost:5253/MojeRep/tlumacz/" + userId + "/Languages",
                     record,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    });
                console.log(response);
                setNeedRefresh((prevVal) => !prevVal);

            } catch (error) {
                alert(`Błąd: Taki jezyk jest juz przypisany do uzytkownika`);
            }
        }

        editLanguageRecord();
    }

    function deleteLanguage(langId) {
        console.log("FROM THE ACTUAL FUNCTION", langId);

        async function deleteLanguageRecord() {
            try {
                console.log("http://localhost:5253/MojeRep/tlumacz/" + userId + "/Languages/" + langId);
                const response = await axios.delete(
                    "http://localhost:5253/MojeRep/tlumacz/" + userId + "/Languages/" + langId,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
                );
                console.log(response);
                setNeedRefresh((prevVal) => !prevVal);
            } catch (error) {
                console.error(error);
                alert(`Błąd: Taki język jest już przypisany do użytkownika`);
            }
        }

        deleteLanguageRecord();
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
        setNeedRefresh((prevVal) => !prevVal);

    }

    function handleNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
        setNeedRefresh((prevVal) => !prevVal);

    }

    return (
        <div>
            <div className="LabelAndAddButton">
                <h2 className="moduleName">Języki</h2>
                <div className="language-form5">
                    <div className="labelPart">
                        <label className="label" htmlFor="name-edit-input-select">Nazwa języka</label>
                        <select
                            id="lan-name-input"
                            className="edit-input-select"
                            value={newLanguageName}
                            onChange={(e) => setNewLanguageName(e.target.value)}
                        >
                            {languages.map((lang) => (
                                <option key={lang.id} value={lang.nazwa}>{lang.nazwa}</option>
                            ))}
                        </select>
                    </div>
                    <div className="labelPart">
                        <label className="label" htmlFor="doc-name-1">Poziom</label>
                        <input
                            type="text"
                            id="doc-name-1"
                            className="edit-input2"
                            placeholder="Wprowadź nazwę dokumentu"
                            value={newLanguageLevel}
                            onChange={(e) => setNewLanguageLevel(e.target.value)}
                        />
                    </div>
                    <button className="addButton" onClick={addLanguage}>Dodaj język</button>
                </div>
            </div>
            <div className="languagesPart">
                {
                    userLanguageRecords.map((record) => (
                        <LanguageItem
                            key={record.id}
                            langId={record.id}
                            name={record.name}
                            level={record.level}
                            amountOfTranslates={record.amountOfTranslatesDone}
                            onEdit={editLanguage}
                            onDelete={() => deleteLanguage(record.id)}
                        />
                    ))}
            </div>
            <div className="PaginationPart">
                <Button className="buttonAdmin" onClick={handlePreviousPage} buttonName="poprzednia"/>
                <p className="userInfoP">{"Strona " + currentPage + " - " + totalPages}</p>
                <Button className="buttonAdmin" onClick={handleNextPage} buttonName="następna"/>
            </div>
        </div>
    )
}

export default LanguagesPart;