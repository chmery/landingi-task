import styles from "./Navigation.module.css";

const Navigation = () => {
    return (
        <nav className={styles.navigation}>
            <div className={styles.item}>
                <span>All Carts</span>
                <div className={styles["active-bar"]} />
            </div>
            <div className={styles.item}>
                <span>Create New Cart</span>
                <div className={styles["active-bar"]} />
            </div>
        </nav>
    );
};

export default Navigation;
