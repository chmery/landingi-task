import { Link, useLocation } from "react-router-dom";
import { CartIcon, PlusIcon } from "../Icons/Icons";
import styles from "./Navigation.module.css";

const Navigation = () => {
    const { pathname } = useLocation();
    const parentPath = pathname.split("/")[1];

    return (
        <nav className={styles.navigation}>
            <div className={`${styles.item} ${parentPath === "carts" ? styles.active : ""}`}>
                <Link to={"carts"} className={styles.link}>
                    <CartIcon />
                    <span className={styles.text}>All Carts</span>
                </Link>
                {parentPath === "carts" && <div className={styles["active-bar"]} />}
            </div>
            <div className={`${styles.item} ${parentPath === "creator" ? styles.active : ""}`}>
                <Link to={"creator"} className={styles.link}>
                    <PlusIcon />
                    <span className={styles.text}>Create New Car</span>
                </Link>
                {parentPath === "creator" && <div className={styles["active-bar"]} />}
            </div>
        </nav>
    );
};

export default Navigation;
