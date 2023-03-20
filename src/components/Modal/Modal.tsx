import styles from "./Modal.module.css";

type Props = {
    title: string;
    text: string;
    type: string;
    isClosing: boolean;
    setIsClosing: (boolean: boolean) => void;
};

const Modal = ({ title, text, type, isClosing, setIsClosing }: Props) => {
    return (
        <div
            className={styles.backdrop}
            onClick={() => setIsClosing(true)}
            data-testid="modal-backdrop"
        >
            <div className={`${styles.modal} ${isClosing ? styles.exit : ""}`}>
                <div
                    className={`${styles.accent} ${type === "succes" ? styles.green : styles.red}`}
                ></div>
                <div className={styles.content}>
                    <h4>{title}</h4>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;
