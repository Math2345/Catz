import { useNavigate } from "react-router-dom"
import Button from "../components/UI/Button";
import SubTitle from "../components/UI/Subtitle";
import Title from "../components/UI/Title";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <Title>Вы не авторизованы!</Title>
            <SubTitle>Пожалуйста зайти снова</SubTitle>
            <div>
                <Button padding={"10px 15px"} onClick={goBack}>Войти</Button>
            </div>
        </section>
    )
}

export default Unauthorized