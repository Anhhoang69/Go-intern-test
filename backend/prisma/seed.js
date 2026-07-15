require('dotenv').config();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const CSV_PATH = path.join(__dirname, '../../dataset/diem_thi_thpt_2024.csv');
const BATCH_SIZE = 500;

function toFloat(val) {
  if (!val || val.trim() === '') return null;
  return Number(val.trim());
}

async function seed() {
  console.log('Bắt đầu đọc CSV...');

  const records = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (row) => {
        records.push({
          sbd:          row.sbd?.trim(),
          toan:         toFloat(row.toan),
          ngu_van:      toFloat(row.ngu_van),
          ngoai_ngu:    toFloat(row.ngoai_ngu),
          vat_li:       toFloat(row.vat_li),
          hoa_hoc:      toFloat(row.hoa_hoc),
          sinh_hoc:     toFloat(row.sinh_hoc),
          lich_su:      toFloat(row.lich_su),
          dia_li:       toFloat(row.dia_li),
          gdcd:         toFloat(row.gdcd),
          ma_ngoai_ngu: row.ma_ngoai_ngu?.trim() || null,
        });
      })
      .on('end', resolve)
      .on('error', reject);
  });

  console.log(`Đọc xong: ${records.length} thí sinh`);

  await prisma.student.deleteMany();
  console.log('Đã xóa data cũ');

  let count = 0;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    await prisma.student.createMany({ data: batch });
    count += batch.length;

    if (count % 10000 === 0 || count === records.length) {
      console.log(`  -> ${count}/${records.length}`);
    }
  }

  console.log(`Seed xong. Tong: ${count} thi sinh`);
}

seed()
  .catch((err) => { console.error('Loi:', err); process.exit(1); })
  .finally(() => prisma.$disconnect());
