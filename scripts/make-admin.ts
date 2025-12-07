import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'victor.nguyen1326@gmail.com';
  console.log(`Looking for user with email: ${email}`);

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    console.error('User not found! Please sign in with this email first.');
    return;
  }

  console.log(`Found user: ${user.name} (${user.id}). Current role: ${user.role}`);

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { role: 'ADMIN' },
  });

  console.log(`SUCCESS: User role updated to: ${updatedUser.role}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
