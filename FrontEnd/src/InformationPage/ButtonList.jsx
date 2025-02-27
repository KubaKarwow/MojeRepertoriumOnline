import '../styles/LoginRegister.css';
import Button from "./Button";
function ButtonList(props) {

    return (
        <div className="ButtonListInfo">
            <Button buttonName="Zaloguj"/>
            <Button buttonName="Rejestracja"/>
        </div>
    );
}

export default ButtonList;
