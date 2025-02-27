import '../styles/LoginRegister.css';
import Title from './Title';
import ButtonList from './ButtonList';
import Icon from "../assets/Icon.ico"
function InformationPage(props) {
    return (
        <div className="InformationPage">
            <div className="headerPart">
                <img src={Icon} alt={"some shit"} width={84} height={84}/>
                <Title/>
            </div>
            <p className="InfoText">Moje Repertorium to aplikacja przeznaczona dla tłumaczy w polsce. Po pobraniu aplikacji podstawowe dane do śledzenia swojej pracy są wysyłane do tej strony internetowej. Aby móc z niej korzystać trzeba mieć założone konto. </p>
            <ButtonList />
        </div>
    );
}

export default InformationPage;
