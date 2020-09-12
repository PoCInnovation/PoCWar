import { PrismaClient, UserCreateInput } from '@prisma/client';
import { readFileSync } from 'fs';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const { password, email, ...seeds }: UserCreateInput = JSON.parse(readFileSync('./seeds/default.json').toString());

  await prisma.user.create({
    data: {
      role: process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD ? 'admin' : 'user',
      email: process.env.ADMIN_EMAIL || email,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD || password, 10),
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
