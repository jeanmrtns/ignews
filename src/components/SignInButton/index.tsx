import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export function SignInButton() {

    const isUserLoggedIn = false;

    return isUserLoggedIn ? (
        <button className={styles.signInButton}>
            <FaGithub color="#04D361" />
            Jean Martins
            <FiX color="#737380" className={styles.closeButton} />
        </button>
    ): (
        <button className={styles.signInButton}>
            <FaGithub color="#EBA417" />
            Entrar com Github
        </button>
    )
}