import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import InformationPage from "./InformationPage/InformationPage";
import AdminPage from "./AdminPage/AdminPage";
import UserPage from "./UserPage/UserPage";
import AdminTranslatorsPage from "./AdminTranslatorsPage/AdminTranslatorsPage";
import UserInfoPage from "./UserInfoPage/UserInfoPage";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>} />
                <Route path="/Rejestracja" element={<RegisterPage/>} />
                <Route path="/Informacje" element={<InformationPage/>} />
                <Route path="/admin" element={<AdminPage/>} />
                <Route path="/user" element={<UserPage/>} />
                <Route path="/info" element={<UserInfoPage/>} />
                <Route path="/admin/translators" element={<AdminTranslatorsPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
