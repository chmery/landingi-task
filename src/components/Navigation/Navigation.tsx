import { Link, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
    const { pathname } = useLocation();

    return (
        <nav className={styles.navigation}>
            <div className={styles.item}>
                <Link to={"carts"}>All Carts</Link>
                {pathname === "/carts" && <div className={styles["active-bar"]} />}
            </div>
            <div className={styles.item}>
                <Link to={"creator"}>Create New Cart</Link>
                {pathname === "/creator" && <div className={styles["active-bar"]} />}
            </div>
        </nav>
    );
};

export default Navigation;
