import Link from "next/link";
import { getDatabase } from "../lib/notion";
import { Text } from "../pages/[id].js";
// import styles{{from "./index."mod"}}e.css";
import slugify from "slugify";
import Navbar from "../components/main/Navbar";
import Header from "../components/main/Header";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ posts, id }) {
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
                      <div className="col-sm-3" style={{ marginTop: "20px" }}>
                        <div className="card" style={{ minHeight: "330px" }}>
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
                            className="card-img-top"
                          />
                          {console.log(
                            "post ",
                            post.properties.Status.select.name
                          )}
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
                              href={`/post/${
                                post.properties.Name.title[0].text.content.toLowerCase().replace(/[.,\/#!$%\^'’&\*;:{}=\_`~() ]/g, "-").replace("?", "")
                              }-${post.id}`}
                            >
                              Read post →
                            </Link>
                          </div>
                          {console.log("id ", id)}
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
        id: `${slugify(page.properties.Name.title[0].text.content.toLowerCase().replace(/[.,\/#!$%\^'’&\*;:{}=\_`~() ]/g, "-").replace("?", ""))}-${
          page.id
        }`,
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const database = await getDatabase(databaseId);
  const idurl = context.params.id
  console.log("first ", database);

  return {
    props: {
      posts: database,
      // id: idurl.split("-")[idurl.split("-").length -5] + "-" + idurl.split("-")[idurl.split("-").length -4] + "-" + idurl.split("-")[idurl.split("-").length -3] + "-" + idurl.split("-")[idurl.split("-").length -2] + "-" + idurl.split("-")[idurl.split("-").length -1]
      id: context.params.id
    },
    revalidate: 1,
  };
};
