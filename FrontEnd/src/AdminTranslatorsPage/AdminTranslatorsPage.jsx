import React, {useState, useEffect} from "react";
import axios from "axios";
import Title from "./Title";
import Button from "./Button";
import {useNavigate} from "react-router-dom";
import {FaEdit, FaTrash, FaSave, FaTimes} from 'react-icons/fa';
import UserItem from "./UserItem";
import TranslatorItem from "./TranslatorItem";
import Cookies from "js-cookie";

function AdminTranslatorsPage() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [users, setUsers] = useState([]);
    const itemsPerPage = 3;

    const [isEditing, setIsEditing] = useState(false);
    const [isEditingTranslator, setIsEditingTranslator] = useState(false);

    const [editedID, setEditedID] = useState(0);
    const [editedName, seteditedName] = useState("Imie");
    const [editedSurname, setEditedSurname] = useState("Nazwisko");
    const [editedEmail, setEditedEmail] = useState("Email");
    const [editedPassword, setEditedPassword] = useState("Hasło");
    const [editedRole, setEditedRole] = useState("Role");

    const [editedIndexNumber, setEditedIndexNumber] = useState(0);
    const [editedJoinDate, setEditedJoinDate] = useState("yyyy-mm-dd");
    const [editedLeaveDate, setEditedLeaveDate] = useState("yyyy-mm-dd");
    const token = Cookies.get("jwt");


    async function fetchUsers() {
        try {
            const response = await axios.get(
                'http://localhost:5253/MojeRep/admin/users/'+(currentPage - 1) * itemsPerPage+'/'+itemsPerPage,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
            );
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }

    useEffect(() => {


        async function fetchUsersCount() {
            try {
                const response = await axios.get(
                    "http://localhost:5253/MojeRep/admin/users/amount",
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
                );
                setTotalUsers(response.data);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        }
        fetchUsersCount();
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    function goToLanguages() {
        navigate("/admin");
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

    function deleteUser(userId) {
        console.log(userId);

        async function deleteU(userId) {
            console.log("GETTING INTO THE SHIT");
            try {
                console.log("przed wywolaniem delete");
                const response = await axios.delete(
                    "http://localhost:5253/MojeRep/admin/users/" + userId,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
                );
                console.log(response.data);
                if (response.data === true) {
                    setUsers((prevUsers) => prevUsers.filter(u => u.id !== userId));
                }
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        }

        deleteU(userId);
    }

    function editUser(userId) {


    }

    function editTranslator(userId) {
        async function editTranslator(userId) {

        }

        editTranslator(userId);
    }

    function handleSave(user) {
        console.log("OTRZYMANE DANE W FUNCKJI:",user);
        async function editUser(userId) {
            try {

                const response = await axios.put(
                    "http://localhost:5253/MojeRep/admin/users/" + userId,
                    user,
                    {
                        headers: {
                            Authorization: `Bearer ${token}` // Dodaj token do nagłówka
                        }
                    }
                );
                console.log(response.data);

                setUsers((prevUsers) =>
                    prevUsers.map((userr) =>
                        userr.id === userId
                            ? { ...userr,
                                imie: editedName,
                                nazwisko: editedSurname,
                                email: editedEmail,
                                hasło: response.data.hasło.length===60?"Zaszyfrowane(można zmienić)":response.data.hasło,
                                rola: editedRole }
                            : userr
                    )
                );
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        }

        editUser(user.id);
        setIsEditing(false);
    }

    function handleSaveTranslator(userId) {

        setIsEditingTranslator(false);
    }
    function logout(){
        navigate("/");
        Cookies.remove("jwt");
    }
    return (
        <div>
            <div className="TitlePageTranslatorsAdmin">
                <Title/>
                <Button className="buttonAdmin" onClick={goToLanguages} buttonName="Języki"/>
                <Button className="buttonAdmin" onClick={logout} buttonName="Wyloguj"/>
            </div>
            <div className="mainPanel">
                <div className="namesPart">
                    <h2 className="moduleName2">Użytkownicy</h2>
                    <h2 className="moduleName2">Tłumacze</h2>
                </div>
                {users.map((user) => (
                    <div className={"ItemsPart"} key={user.id}>
                        <UserItem delete={deleteUser} edit={handleSave}
                                 user={user}/>

                        <TranslatorItem delete={deleteUser} edit={handleSave}
                                        user={user}/>
                    </div>
                ))}

                <div className="PaginationPart">
                    <Button className="buttonAdmin" onClick={handlePreviousPage} buttonName="poprzednia"/>
                    <p className="userInfoP">{"Strona " + currentPage + " - " + totalPages}</p>
                    <Button className="buttonAdmin" onClick={handleNextPage} buttonName="następna"/>
                </div>
            </div>
        </div>
    );
};
export default AdminTranslatorsPage;

