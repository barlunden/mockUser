// backend/scripts/seedUsers.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const mockUsers = require('../mockUsers');

(async () => {
  await prisma.post.deleteMany({});
  await prisma.user.deleteMany({});

  for (const user of mockUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
        password: hashedPassword,
      },
    });
  }
  console.log("Seeded users:", mockUsers.map(u => u.email).join(", "));
  await prisma.$disconnect();
})();
