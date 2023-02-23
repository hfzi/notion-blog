import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "./post/[id]";
import slugify from "slugify";
import Navbar from "../components/main/Navbar";
import Header from "../components/main/Header";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts }) {
  return (
    <>
      <Header />
      <Navbar posts={posts} />
      <div className="container">
        <div className="row">
          {posts.map((post) => {
            const date = new Date(post.last_edited_time).toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            );
            if (post.properties.Status.select.name !== "KAPALI") {
              return (
                <div class="col-sm-3" style={{ marginTop: "20px" }}>
                  <div class="card" style={{ minHeight: "330px" }}>
                    <img
                      src={
                        post.properties.Image.files.map((x) => x.file.url)[0]
                      }
                      alt={post.properties.Image.files.map((x) => x.file.name)}
                      width="286"
                      height="180"
                      quality="30%"
                      class="card-img-top"
                    />
                    <div class="card-body">
                      {date}
                      <h5 class="card-title">
                        <Text text={post.properties.Name.title} />
                      </h5>
                      {/* <p class="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p> */}
                      <Link
                        href={`post/${slugify(
                          post.properties.Name.title[0].text.content
                        )
                          .toLowerCase()
                          .replace(/[.,\/#!$%\^'’&\*;:{}=\-_`~() ]/g, "-")
                          .replace("?", "")}-${post.id}`}
                      >
                        Read post →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
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
