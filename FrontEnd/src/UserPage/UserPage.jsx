import React, {useState, useEffect} from "react";
import Title from './Title';
import Button from './Button';
import {useNavigate} from "react-router-dom";
import "./userPageStyles.css";
import axios from 'axios';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import TranslateItem from "./TranslateItem";
function UserPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [languages, setLanguages] = useState([]); // Lista języków pobrana z API lub innego źródła
    const [editedID, setEditedID] = useState(0);
    const [editedSourceLang, setEditedSourceLang] = useState("");
    const [editedTranslateLang, setEditedTranslateLang] = useState("");
    const [editedDate, setEditedDate] = useState("");
    const [editedName, setEditedName] = useState("");
    const [allowed, setAllowed] = useState(true);

    const [refresh, setRefresh] = useState(false);

    const [totalTranslates, setTotalTranslates] = useState(0);
    const [translates, setTranslates] = useState([]);
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const token = Cookies.get("jwt");
    function getCookieValue(cookieName) {
        const cookies = document.cookie.split("; ");
        const cookie = cookies.find((row) => row.startsWith(`${cookieName}=`));
        return cookie ? cookie.split("=")[1] : null;
    }

    useEffect(() => {
       async function setUp(){
           if(token){
               const decoded = jwtDecode(token);
               //console.log(decoded);
               setUser({id:decoded.id,role:decoded.role});
               const response = await axios.get(
                   "http://localhost:5253/MojeRep/tlumacz/"+decoded.id+"/tlumaczenia/Ilosc",
                   {
                       headers: {
                           Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                       }
                   }
               )
               setTotalTranslates(response.data);
               setTotalPages(Math.ceil(response.data / itemsPerPage));

               const response2 = await axios.get(
                   "http://localhost:5253/MojeRep/tlumacz/"+decoded.id+"/tlumaczenia/"+(currentPage-1)*3+"/3",
                   {
                       headers: {
                           Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                       }
                   }
               )
               console.log((currentPage-1)*3);
               console.log("RESPONSE",response2.data);
               setTranslates(response2.data);
               console.log("TRANS",translates);
           } else{
               setAllowed(false);
           }
           try {
               const response = await axios.get(
                   "http://localhost:5253/MojeRep/admin/Languages",
                   {
                       headers: {
                           Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                       }
                   }
               )
               setLanguages(response.data);
           } catch (error) {
               console.log(error);
           }
           try {

           } catch (error) {
               console.log(error);
           }
       }
       setUp();
    }, [currentPage,refresh]);

    function goToInfo() {
        navigate("/info");
    }
    function handlePreviousPage() {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    }

    function handleNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }
    function addLanguage() {
        // Funkcjonalność dodawania tłumaczenia
        async function add() {
            try {
                const response = await axios.post(
                    "http://localhost:5253/MojeRep/tlumacz/"+user.id+"/"+"tlumaczenia"

                ,{originalLanguage:editedSourceLang, translateLanguage:editedTranslateLang,date:editedDate, name:editedName },
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    })
                console.log("ODP NA API CALLA "+response);

                setRefresh( (prevRefresh) => !prevRefresh);

            } catch (error) {
                console.log(error);
            }
        }
        add();

        // Wyczyszczenie pól formularza po dodaniu
        setEditedSourceLang("");
        setEditedTranslateLang("");
        setEditedDate("");
        setEditedName("");
    }

    function deleteTranslate(tId){
        async function deleteT(tId) {
            try {
                const response = await axios.delete(
                    "http://localhost:5253/MojeRep/tlumacz/"+user.id+"/tlumaczenia/"+tId,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
                );
                console.log(response.data);
                setTranslates((prevTranslates) => prevTranslates.filter(t => t.translateId !== tId));
                setTotalTranslates((prevTotalTranslates) => prevTotalTranslates-1);
                setRefresh( (prevRefresh) => !prevRefresh);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        }

        deleteT(tId);
    }
    function saveTranslate(translateId, newTranslate){
        async function editT(tId) {
            try {
                const response = await axios.put(
                    "http://localhost:5253/MojeRep/tlumacz/"+user.id+"/tlumaczenia/"+tId,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
                , newTranslate);
                setRefresh( (prevRefresh) => !prevRefresh);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        }
            editT(translateId);
    }
    function logout(){
        navigate("/");
        Cookies.remove("jwt");
    }
    return (
        <div>
            <div className="TitlePageTranslatorsAdmin">
                <Title/>
                <Button className="buttonUser" onClick={goToInfo} buttonName="Informacje konta"/>
                <Button className="buttonUser" onClick={logout} buttonName="Wyloguj"/>
            </div>
            <div className="LabelAndAddButton">
                <h2 className="moduleName">Dodaj tłumaczenie</h2>
                <div className="language-form3">
                    <select
                        className="edit-input-select"
                        value={editedSourceLang}
                        onChange={(e) => setEditedSourceLang(e.target.value)}
                    >
                        <option value="">Wybierz język dokumentu</option>
                        {languages.map((lang) => (
                            <option key={lang.id} value={lang.nazwa}>{lang.nazwa}</option>
                        ))}
                    </select>
                    <select
                        className="edit-input-select"
                        value={editedTranslateLang}
                        onChange={(e) => setEditedTranslateLang(e.target.value)}
                    >
                        <option value="">Wybierz język tłumaczenia</option>
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
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                    <button className="addTranslateButton" onClick={addLanguage}>Dodaj tłumaczenie</button>
                </div>
                <div className="userItems">
                    {translates.map((translate) => (
                        <div className={"ItemsPart"} key={translate.translateId}>
                            <TranslateItem languages = {languages} delete={deleteTranslate} edit={saveTranslate}
                                      translate={translate} userId={user.id}/>
                        </div>
                    ))}
                </div>
                <div className="PaginationPart2">
                    <Button className="buttonAdmin" onClick={() => handlePreviousPage()} buttonName="poprzednia"/>
                    <p className="userInfoP">{"Strona " + currentPage + " - " + totalPages}</p>
                    <Button className="buttonAdmin" onClick={() => handleNextPage()} buttonName="następna"/>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
