const { PrismaClient } = require('@prisma/client');
const SubjectManager = require('../services/scoreService');

const prisma = new PrismaClient();
const manager = new SubjectManager();

async function getScoreBySbd(req, res) {
  const { sbd } = req.params;

  if (!/^\d{8}$/.test(sbd)) {
    return res.status(400).json({ error: 'So bao danh khong hop le. Nhap dung 8 chu so.' });
  }

  const student = await prisma.student.findUnique({ where: { sbd } });

  if (!student) {
    return res.status(404).json({ error: `Khong tim thay thi sinh voi SBD ${sbd}.` });
  }

  return res.json(manager.formatStudent(student));
}

module.exports = { getScoreBySbd };
