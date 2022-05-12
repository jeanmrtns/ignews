import styles from "./styles.module.scss";
import {SignInButton} from "../SignInButton";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news logo"/>
                <nav>
                    <a className={styles.active}>Início</a>
                    <a>Posts</a>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}