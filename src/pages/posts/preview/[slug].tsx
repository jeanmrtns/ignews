import Head from "next/head";
import {GetStaticPaths, GetStaticProps} from "next";
import {getSession, useSession} from "next-auth/react";
import {createClient} from "../../../../prismicio";
import {RichText} from "prismic-dom";

import styles from "../post.module.scss";
import Link from "next/link";
import {useEffect} from "react";
import {useRouter} from "next/router";

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        first_publication_date: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {

    const session = useSession();
    const router = useRouter();

    useEffect(() => {

        async function redirect() {
            return await router.push(`/posts/${post.slug}`);
        }

        if (session.data?.activeSubscription) {
            redirect();
        }
    }, [session]);

    return (
        <>
            <Head>
                <title>ig.news | {post.title}</title>
            </Head>

            <main className={styles.container}>
                <article className={`${styles.post}`}>
                    <h1>{post.title}</h1>
                    <time>{post.first_publication_date}</time>

                    <div className={`${styles.postContent} ${styles.postPreviewContent}`} dangerouslySetInnerHTML={{__html: post.content}} />
                </article>

                <div className={styles.continueReading}>
                    Quer continuar lendo?
                    <Link href="/">
                        <a>Inscreva-se agora 🤗</a>
                    </Link>
                </div>
            </main>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params}) => {
    const { slug } = params;

    const client = createClient();

    const response = await client.getByUID('post', String(slug), {});

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        first_publication_date: new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }).format(new Date(response.first_publication_date)),
    }

    return {
        props: {
            post
        },
        revalidate: 60 * 60 // 1hour
    }
}