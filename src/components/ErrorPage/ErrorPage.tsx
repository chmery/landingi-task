import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";

const ErrorPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles["error-page"]}>
            <h1>Oops!</h1>
            <p>It looks like this page doesn't exist or an unexpected error occurred 🤕</p>
            <button onClick={() => navigate("/")}>Home</button>
        </div>
    );
};

export default ErrorPage;
