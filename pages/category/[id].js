import Link from "next/link";
import { getDatabase } from "./../../lib/notion";
import { Text } from "../post/[id].js";
import slugify from "slugify";
import Navbar from "../../components/main/Navbar";
import Header from "../../components/main/Header";

export const databaseId = process.env.NOTION_DATABASE_ID;

export default function Home({ logo, posts, id }) {
  return (
    <>
      <Header />
      {posts ? <Navbar posts={posts} logo={logo} /> : null}
      <div className="container">
        {console.log("dassd ", id)}
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
                  return id.includes("_") ? (
                    console.log("asd ", id),
                    id.replace("_", "/") ==
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
                          <div className="card-body">
                            {date}
                            {console.log("first ", post)}
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
                    ) : null
                  ) : id ==
                    post.properties.Status.select.name ? (
                      console.log("asd ", id),
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
                        <div className="card-body">
                          {date}
                          {console.log("first ", post)}
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
        id: page.properties.Status.select.name.replace("/", "_"),
      },
    })),
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const database = await getDatabase(databaseId);

  return {
    props: {
      posts: database,
      id: context.params.id,
      logo: process.env.LOGO_TEXT
    },
    revalidate: 1,
  };
};
