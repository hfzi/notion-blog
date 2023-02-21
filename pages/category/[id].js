import Link from "next/link";
import { getDatabase } from "./../../lib/notion";
import { Text } from "../[id].js";
// import styles{{from "./index."mod"}}e.css";
import slugify from "slugify";
import Navbar from "../../components/main/Navbar";
import Header from "../../components/main/Header";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ asd, dsa, posts, id }) {
  return (
    <>
      <Header />
      {posts ? <Navbar posts={posts} /> : null}
      <div className="container">
        <div className="row">
          {posts
            ? posts.map((post) => {
                const date = new Date(post.last_edited_time).toLocaleString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                );
                {
                  return id ? (
                    id.replace("-", "/") ==
                    post.properties.Status.select.name ? (
                      <div class="col-sm-3" style={{ marginTop: "20px" }}>
                        <div class="card" style={{ minHeight: "330px" }}>
                          <img
                            src={
                              post.properties.Image.files.map(
                                (x) => x.file.url
                              )[0]
                            }
                            alt={post.properties.Image.files.map(
                              (x) => x.file.name
                            )}
                            width="286"
                            height="180"
                            quality="30%"
                            class="card-img-top"
                          />
                          {console.log(
                            "post ",
                            post.properties.Status.select.name
                          )}
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
                              href={`post/${
                                post.properties.Name.title[0].text.content.toLowerCase().replace(/[.,\/#!$%\^'’&\*;:{}=\-_`~() ]/g, "-").replace("?", "")
                              }_${post.id}`}
                            >
                              Read post →
                            </Link>
                          </div>
                          {console.log("asd ", asd)}
                          {console.log("dsa ", dsa)}
                        </div>
                      </div>
                    ) : null
                  ) : null;
                }
                // {post.properties.Status.select.name == }
              })
            : null}
        </div>
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: database.map((page) => ({
      params: {
        id: page.properties.Status.select.name.replace("/", "-"),
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const database = await getDatabase(databaseId);
  
  console.log("first ", database);
  
  return {
    props: {
      posts: database,
      id: context.params.id,
      asd: database.map((page) => ({
        params: {
          id: page.properties.Status.select.name,
        },
      })),
      dsa: database.map((page) => ({
        params: {
          id: page.properties.Name.title[0].text.content,
        },
      })),
    },
    revalidate: 1,
  };
};
