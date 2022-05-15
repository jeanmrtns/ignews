import styles from "./styles.module.scss";
import {SignInButton} from "../SignInButton";
import {ActiveLink} from "../ActiveLink";

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news logo"/>
                <nav>
                    <ActiveLink href="/" activeClassName={styles.active}>
                        <a>Início</a>
                    </ActiveLink>
                    <ActiveLink href="/posts" prefetch={true} activeClassName={styles.active}>
                        <a>Posts</a>
                    </ActiveLink>
                </nav>
                <SignInButton />
            </div>
        </header>
    )
}