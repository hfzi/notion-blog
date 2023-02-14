import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./[id].js";
// import styles from "./index.module.css";

import Navbar from "../components/main/Navbar";
import Header from "../components/main/Header";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <div>
      <Header />
      <Navbar posts={posts} />
      <main>
        <h2>All Posts</h2>
        <ol>
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            return (
              <>
                <li key={post.id}>
                  <img
                    src={post.properties.Image.files.map((x) => x.file.url)}
                    alt={post.properties.Image.files.map((x) => x.file.name)}
                    style={{ width: "100px" }}
                  />
                  <h3>
                    <Link href={`/${post.id}`}>
                      <Text text={post.properties.Name.title} />
                    </Link>
                  </h3>
                  <p>{date}</p>
                  <Link href={`/${post.id}`}>Read post →</Link>
                </li>
              </>
            );
          })}
        </ol>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
    },
    revalidate: 1,
  };
};
