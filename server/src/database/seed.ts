import { PrismaClient } from '@prisma/client';
import { guestPswd, rootConfig } from '../config';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

export async function main() {
  const rootData = rootConfig;

  const rootUser = await prisma.user.findMany({
    where: {
      isConfigure: true,
    },
  });

  if (rootUser.length === 0) {
    await prisma.$transaction(async (_prisma) => {
      await _prisma.user.create({
        data: {
          ...rootData,
          password: hashSync(rootData.password, 10),
          isConfigure: true,
          roles: 'root',
        },
      });

      await _prisma.user.create({
        data: {
          email: 'guest@guest.com',
          name: 'Guest',
          roles: 'admin',
          username: 'guest',
          password: hashSync('TOPKI@AZ02', 10),
        },
      });
    });
  }

  return;
}

main()
  .catch(async (e) => {
    console.error('Error:', e);
    await prisma.$disconnect();
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
