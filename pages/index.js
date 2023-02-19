import Link from "next/link";
import slugify from "slugify";
import { getDatabase } from "../lib/notion";
// import { Text } from "../post/[id].js";
import { Text } from "./[id]";
// import styles{{from "./index."mod"}}e.css";

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
            return (
              <div class="col-sm-3" style={{ marginTop: "20px" }}>
                <div class="card" style={{ minHeight: "330px" }}>
                  <img
                    src={post.properties.Image.files.map((x) => x.file.url)[0]}
                    alt={post.properties.Image.files.map((x) => x.file.name)}
                    width="286"
                    height="180"
                    quality="30%"
                    class="card-img-top"
                  />
                  {console.log("post ", post)}
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
                      href={`/post/${slugify(
                        post.properties.Name.title[0].text.content
                      )}_${post.id}`}
                    >
                      Read post →
                    </Link>
                  </div>
                </div>
              </div>
              // <>
              //   <li key={post.id}>
              //     <img
              //       src={post.properties.Image.files.map((x) => x.file.url)}
              //       alt={post.properties.Image.files.map((x) => x.file.name)}
              //       style={{ width: "100px" }}
              //     />
              //     <h3>
              //       <Link
              //         href={`/${slugify(
              //           post.properties.Name.title[0].text.content
              //         )}_${post.id}`}
              //       >
              //         <Text text={post.properties.Name.title} />
              //       </Link>
              //     </h3>
              //     <p>{date}</p>
              //     <Link
              //       href={`/${slugify(
              //         post.properties.Name.title[0].text.content
              //       )}_${post.id}`}
              //     >
              //       Read post →
              //     </Link>
              //   </li>
              // </>
            );
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
