const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "Alice Wonderland",
        email: "alice@example.com",
        password: await bcrypt.hash("wonderland", 10),
      },
      {
        fullName: "Willy Wonka",
        email: "ww@example.com",
        password: await bcrypt.hash("chocolate", 10),
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
