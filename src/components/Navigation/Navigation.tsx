import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
    const { pathname } = useLocation();
    const parentPath = pathname.split("/")[1];

    return (
        <nav className={styles.navigation}>
            <div className={`${styles.item} ${parentPath === "carts" ? styles.active : ""}`}>
                <Link to={"carts"}>All Carts</Link>
                {parentPath === "carts" && <div className={styles["active-bar"]} />}
            </div>
            <div className={`${styles.item} ${parentPath === "creator" ? styles.active : ""}`}>
                <Link to={"creator"}>Create New Cart</Link>
                {parentPath === "creator" && <div className={styles["active-bar"]} />}
            </div>
        </nav>
    );
};

export default Navigation;
