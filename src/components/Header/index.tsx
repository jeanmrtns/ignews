import styles from "./styles.module.scss";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news logo"/>
                <nav>
                    <a className={styles.active}>Início</a>
                    <a>Posts</a>
                </nav>
            </div>
        </header>
    )
}