import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  const user2Exist = await prisma.user.count({
    where: { id: 2 }
  });
  if (user2Exist === 0) {
    await prisma.user.create({
      data: {
        email: 'ariadne@prisma.io',
        name: 'Ariadne',
        posts: {
          create: [
            {
              title: 'My first day at Prisma',
            },
            {
              title: 'How to connect to a SQLite database',
            },
          ],
        },
      },
    })
  }

  const allUsers = await prisma.user.findMany({
    where: { id: 1 },
    include: { posts: true },
  })
  // use `console.dir` to print nested objects
  console.dir(allUsers, { depth: null })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
