import Head from "next/head";
import styles from "./home.module.scss";
import {SubscribeButton} from "../components/SubscribeButton";

export default function Home() {
  return (
    <>
      <Head>
        <title>ig.news | Home</title>
      </Head>
        <main className={styles.contentContainer}>
            <section className={styles.hero}>
                <h4>🖐️ Hey, bem-vindo!</h4>
                <h1>
                    Novidades sobre o <br />
                    mundo do <span>React</span>.
                </h1>
                <p>
                    Tenha acesso a todas as novidades
                    <span> por apenas R$9,90 ao mês</span>
                </p>
                <SubscribeButton />
            </section>
            <img src="/images/avatar.svg" alt="Mulher de cabelo preto amarrado codando com uma xicara de cafe ao lado"/>
        </main>
    </>
  )
}
