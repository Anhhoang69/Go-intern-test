const { PrismaClient } = require('@prisma/client');
const SubjectManager = require('./scoreService');

const prisma = new PrismaClient();
const manager = new SubjectManager();

async function getScoreStats() {
  const stats = [];

  for (const { key, label } of manager.subjects) {
    const [excellent, good, average, weak] = await Promise.all([
      prisma.student.count({ where: { [key]: { gte: 8 } } }),
      prisma.student.count({ where: { [key]: { gte: 6, lt: 8 } } }),
      prisma.student.count({ where: { [key]: { gte: 4, lt: 6 } } }),
      prisma.student.count({ where: { [key]: { lt: 4 } } }),
    ]);

    stats.push({ subject: label, key, excellent, good, average, weak });
  }

  return stats;
}

async function getTop10GroupA() {
  const students = await prisma.student.findMany({
    where: {
      toan:    { not: null },
      vat_li:  { not: null },
      hoa_hoc: { not: null },
    },
    select: { sbd: true, toan: true, vat_li: true, hoa_hoc: true },
  });

  return students
    .map((s) => ({ ...s, total: manager.calcGroupATotal(s) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 10);
}

module.exports = { getScoreStats, getTop10GroupA };
