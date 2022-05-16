import Head from "next/head";

import {GetStaticProps} from "next";
import { RichText } from "prismic-dom";
import { createClient } from '../../../prismicio';

import styles from "./styles.module.scss";
import Link from "next/link";

interface Post {
    slug: string;
    first_publication_date: string;
    title: string;
    excerpt: string;
}

interface PostsProps {
    posts: Post[]
}

export default function Posts({posts}: PostsProps) {
    return (
        <>
            <Head>
                <title>ig.news | Posts</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {
                        posts && posts.map(post => {
                            return (
                                <Link href={`/posts/${post.slug}`}  key={post.slug}>
                                    <a>
                                        <time>{post.first_publication_date}</time>
                                        <strong>{post.title}</strong>
                                        <p>{post.excerpt || ''}</p>
                                    </a>
                                </Link>
                            )
                        })
                    }
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ previewData }) => {
    const client = createClient({ previewData })

    const page = await client.getAllByType('post', {
            fetch: ['post.title', 'post.content'],
            pageSize: 100
        }
    );

    const posts = page.map(post => {
       return {
           first_publication_date: new Intl.DateTimeFormat('pt-BR', {
               year: 'numeric',
               month: 'long',
               day: '2-digit'
           }).format(new Date(post.first_publication_date)),
           title: RichText.asText(post.data.title),
           excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
           slug: post.uid,
       }
    });

    return {
        props: {
            posts
        }, // Will be passed to the page component as props
    }
}