import Head from "next/head";
import Link from "next/link";
import slugify from "slugify";
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
      <div className="container">
        <div className="row">
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
                  <div className="col-sm-3" style={{ marginTop: "20px" }}>
                    <div className="card" style={{ minHeight: "330px" }}>
                      <img
                        src={
                          post.properties.Image.files.map((x) => x.file.url)[0]
                        }
                        alt={post.properties.Image.files.map(
                          (x) => x.file.name
                        )}
                        width="286"
                        height="180"
                        quality="30%"
                        className="card-img-top"
                      />
                      {console.log("post ", post)}
                      <div className="card-body">
                        {date}
                        <h5 className="card-title">
                          <Text text={post.properties.Name.title} />
                        </h5>
                        {/* <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p> */}
                        <Link
                          href={`/post/${slugify(
                            post.properties.Name.title[0].text.content
                          )}_${post.id}`}
                        >
                          Read post →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ol>
          </main>
        </div>
      </div>
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
