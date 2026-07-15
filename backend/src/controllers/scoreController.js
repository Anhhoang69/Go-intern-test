const { PrismaClient } = require('@prisma/client');
const SubjectManager = require('../services/scoreService');

const prisma = new PrismaClient();
const manager = new SubjectManager();

async function getScoreBySbd(req, res) {
  const { sbd } = req.params;

  if (!/^\d{8}$/.test(sbd)) {
    return res.status(400).json({ error: 'Invalid registration number. Please enter exactly 8 digits.' });
  }

  const student = await prisma.student.findUnique({ where: { sbd } });

  if (!student) {
    return res.status(404).json({ error: `Student with registration number ${sbd} not found.` });
  }

  return res.json(manager.formatStudent(student));
}

module.exports = { getScoreBySbd };
