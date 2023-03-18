import styles from "./Heading.module.css";

type Props = {
    title: string;
    text: string;
};

const Heading = ({ title, text }: Props) => {
    return (
        <div className={styles.heading}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    );
};

export default Heading;
