import { PrismaClient } from '@prisma/client';
import { rootConfig } from '../config';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function main() {
  const rootData = rootConfig;

  const rootUser = await prisma.user.findMany({
    where: {
      isConfigure: true,
    },
  });

  if (rootUser.length === 0) {
    await prisma.user.create({
      data: {
        ...rootData,
        password: bcrypt.hashSync(rootData.password, 10),
        isConfigure: true,
        roles: 'root',
      },
    });
  }

  return;
}

main()
  .catch(async (e) => {
    await prisma.$disconnect();
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
