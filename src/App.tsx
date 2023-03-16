import Navigation from "./components/Navigation/Navigation";
import { Outlet } from "react-router-dom";
import styles from "./App.module.css";

function App() {
    return (
        <div className={styles.app}>
            <Navigation />
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    );
}

export default App;
