/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  const statusIds = [
    "67caf3d2db2bc3ca3fc31a39",
    "67caf3d2db2bc3ca3fc31a3a",
    "67caf3d2db2bc3ca3fc31a3b",
    "67caf3d3db2bc3ca3fc31a3c",
    "67caf3d3db2bc3ca3fc31a3d",
  ];

  const jobs = Array.from({ length: 100 }, () => ({
    title: faker.person.jobTitle(),
    description: faker.lorem.paragraphs(10, "\n\n"),
    company: faker.company.name(),
    type: faker.helpers.arrayElement([
      "CDI",
      "CDD",
      "Freelance",
      "Télétravail",
    ]),
    location: faker.location.city() + ", " + faker.location.state(),
    contactEmail: faker.internet.email(),
    salary: `$${faker.number
      .int({ min: 40000, max: 150000 })
      .toLocaleString()} - $${faker.number
      .int({ min: 80000, max: 200000 })
      .toLocaleString()}`,
    statusId: faker.helpers.arrayElement(statusIds),
    userId: "user_2tqtcW1jp8nPS5L5lRClC8d36zB",
    createdAt: faker.date.recent().toISOString(),
  }));

  await prisma.job.createMany({ data: jobs });

  console.log("✅ Fake job data inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
