import Head from "next/head";
import styles from "./home.module.scss";
import {SubscribeButton} from "../components/SubscribeButton";
import {GetStaticProps} from "next";
import {stripe} from "../services/stripe.service";

interface HomeProps {
    product: {
        priceId: string;
        amount: number;
    }
}

export default function Home({product}: HomeProps) {
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
                    <span> por apenas {product.amount} ao mês</span>
                </p>
                <SubscribeButton
                    priceId={product.priceId}
                />
            </section>
            <img src="/images/avatar.svg" alt="Mulher de cabelo preto amarrado codando com uma xicara de cafe ao lado"/>
        </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

    const price = await stripe.prices.retrieve(
        'price_1KycdoJuibejeR6WGUMIjrpJ',
    // expand retrieves all informations from product, not only its id
    //  {
    //     expand: ['product']
    //  }
    );

    const product = {
        priceId: price.id,
        amount: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price.unit_amount / 100) // stripe retrieves value in cents
    };

    return {
        props: {
            product
        },
        revalidate: 60 * 60 * 24 * 30 // 30 days
    }
}
