import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
// import prisma from "../prisma/prisma"
// import Layout from "../components/layout/Layout"

const Blog = (props) => {
  return (
    <>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {/* {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))} */}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }
        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }
        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </>
  )
}

export default Blog
