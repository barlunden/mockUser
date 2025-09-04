// backend/scripts/seedUsers.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mockUsers = require('../mockUsers');

// Seed users to DB
(async () => {
  for (const user of mockUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
})();
