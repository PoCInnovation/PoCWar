import { PrismaClient, UserCreateInput } from '@prisma/client';
import { readFileSync } from 'fs';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const { password, ...seeds }: UserCreateInput = JSON.parse(readFileSync('./seeds/default.json').toString());

  await prisma.user.create({
    data: {
      password: await bcrypt.hash(password, 10),
      ...seeds,
    },
  });

  console.log('Successfully seeded database');
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
