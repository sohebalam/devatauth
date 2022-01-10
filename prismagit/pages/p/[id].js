import prisma from "../../prisma/prisma"

const Posts = () => {
  return (
    <div>
      <h1>Posts </h1>
    </div>
  )
}

export default Posts

export const getServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: post,
  }
}
