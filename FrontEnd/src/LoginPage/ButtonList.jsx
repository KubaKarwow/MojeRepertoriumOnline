import '../styles/LoginRegister.css';
import Button from "./Button";
function ButtonList(props) {

    return (
        <div className="ButtonList">
            <Button buttonName="Zaloguj"/>
            <Button buttonName="Rejestracja"/>
            <Button buttonName="Informacje"/>
        </div>
    );
}

export default ButtonList;
