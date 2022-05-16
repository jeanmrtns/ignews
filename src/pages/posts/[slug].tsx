import Head from "next/head";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import {createClient} from "../../../prismicio";
import {RichText} from "prismic-dom";

import styles from "./post.module.scss";

interface PostProps {
    post: {
        slug: string;
        title: string;
        content: string;
        first_publication_date: string;
    }
}

export default function Post({ post }: PostProps) {
    return (
        <>
            <Head>
                <title>ig.news | {post.title}</title>
            </Head>

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.first_publication_date}</time>

                    <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.content}} />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({req, params}) => {

    const session = await getSession({req});
    const { slug } = params;

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    if (!session?.activeSubscription) {
        return {
            redirect: {
                destination: `/posts/preview/${slug}`,
                permanent: false
            }
        }
    }

    const client = createClient({ req });

    const response = await client.getByUID('post', String(slug), {});

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        first_publication_date: new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }).format(new Date(response.first_publication_date)),
    }

    return {
        props: {
            post
        }
    }
}