const { PrismaClient } = require('@prisma/client');
const { Pool }         = require('pg');
const SubjectManager   = require('./scoreService');

const prisma  = new PrismaClient();
const pgPool  = new Pool({
  connectionString: process.env.PGPOOL_URL,
  ssl: { rejectUnauthorized: false },
});
const manager = new SubjectManager();

let statsCache = null;
let top10Cache = null;

async function getScoreStats() {
  if (statsCache) return statsCache;

  const { rows } = await pgPool.query(`
    SELECT
      COUNT(CASE WHEN toan      >= 8 THEN 1 END)::int AS toan_excellent,
      COUNT(CASE WHEN toan      >= 6 AND toan      < 8 THEN 1 END)::int AS toan_good,
      COUNT(CASE WHEN toan      >= 4 AND toan      < 6 THEN 1 END)::int AS toan_average,
      COUNT(CASE WHEN toan      IS NOT NULL AND toan      < 4 THEN 1 END)::int AS toan_weak,

      COUNT(CASE WHEN ngu_van   >= 8 THEN 1 END)::int AS ngu_van_excellent,
      COUNT(CASE WHEN ngu_van   >= 6 AND ngu_van   < 8 THEN 1 END)::int AS ngu_van_good,
      COUNT(CASE WHEN ngu_van   >= 4 AND ngu_van   < 6 THEN 1 END)::int AS ngu_van_average,
      COUNT(CASE WHEN ngu_van   IS NOT NULL AND ngu_van   < 4 THEN 1 END)::int AS ngu_van_weak,

      COUNT(CASE WHEN ngoai_ngu >= 8 THEN 1 END)::int AS ngoai_ngu_excellent,
      COUNT(CASE WHEN ngoai_ngu >= 6 AND ngoai_ngu < 8 THEN 1 END)::int AS ngoai_ngu_good,
      COUNT(CASE WHEN ngoai_ngu >= 4 AND ngoai_ngu < 6 THEN 1 END)::int AS ngoai_ngu_average,
      COUNT(CASE WHEN ngoai_ngu IS NOT NULL AND ngoai_ngu < 4 THEN 1 END)::int AS ngoai_ngu_weak,

      COUNT(CASE WHEN vat_li    >= 8 THEN 1 END)::int AS vat_li_excellent,
      COUNT(CASE WHEN vat_li    >= 6 AND vat_li    < 8 THEN 1 END)::int AS vat_li_good,
      COUNT(CASE WHEN vat_li    >= 4 AND vat_li    < 6 THEN 1 END)::int AS vat_li_average,
      COUNT(CASE WHEN vat_li    IS NOT NULL AND vat_li    < 4 THEN 1 END)::int AS vat_li_weak,

      COUNT(CASE WHEN hoa_hoc   >= 8 THEN 1 END)::int AS hoa_hoc_excellent,
      COUNT(CASE WHEN hoa_hoc   >= 6 AND hoa_hoc   < 8 THEN 1 END)::int AS hoa_hoc_good,
      COUNT(CASE WHEN hoa_hoc   >= 4 AND hoa_hoc   < 6 THEN 1 END)::int AS hoa_hoc_average,
      COUNT(CASE WHEN hoa_hoc   IS NOT NULL AND hoa_hoc   < 4 THEN 1 END)::int AS hoa_hoc_weak,

      COUNT(CASE WHEN sinh_hoc  >= 8 THEN 1 END)::int AS sinh_hoc_excellent,
      COUNT(CASE WHEN sinh_hoc  >= 6 AND sinh_hoc  < 8 THEN 1 END)::int AS sinh_hoc_good,
      COUNT(CASE WHEN sinh_hoc  >= 4 AND sinh_hoc  < 6 THEN 1 END)::int AS sinh_hoc_average,
      COUNT(CASE WHEN sinh_hoc  IS NOT NULL AND sinh_hoc  < 4 THEN 1 END)::int AS sinh_hoc_weak,

      COUNT(CASE WHEN lich_su   >= 8 THEN 1 END)::int AS lich_su_excellent,
      COUNT(CASE WHEN lich_su   >= 6 AND lich_su   < 8 THEN 1 END)::int AS lich_su_good,
      COUNT(CASE WHEN lich_su   >= 4 AND lich_su   < 6 THEN 1 END)::int AS lich_su_average,
      COUNT(CASE WHEN lich_su   IS NOT NULL AND lich_su   < 4 THEN 1 END)::int AS lich_su_weak,

      COUNT(CASE WHEN dia_li    >= 8 THEN 1 END)::int AS dia_li_excellent,
      COUNT(CASE WHEN dia_li    >= 6 AND dia_li    < 8 THEN 1 END)::int AS dia_li_good,
      COUNT(CASE WHEN dia_li    >= 4 AND dia_li    < 6 THEN 1 END)::int AS dia_li_average,
      COUNT(CASE WHEN dia_li    IS NOT NULL AND dia_li    < 4 THEN 1 END)::int AS dia_li_weak,

      COUNT(CASE WHEN gdcd      >= 8 THEN 1 END)::int AS gdcd_excellent,
      COUNT(CASE WHEN gdcd      >= 6 AND gdcd      < 8 THEN 1 END)::int AS gdcd_good,
      COUNT(CASE WHEN gdcd      >= 4 AND gdcd      < 6 THEN 1 END)::int AS gdcd_average,
      COUNT(CASE WHEN gdcd      IS NOT NULL AND gdcd      < 4 THEN 1 END)::int AS gdcd_weak
    FROM "Student"
  `);

  const r = rows[0];
  statsCache = manager.subjects.map(({ key, label }) => ({
    subject:   label,
    key,
    excellent: r[`${key}_excellent`] ?? 0,
    good:      r[`${key}_good`]      ?? 0,
    average:   r[`${key}_average`]   ?? 0,
    weak:      r[`${key}_weak`]      ?? 0,
  }));
  return statsCache;
}

async function getTop10GroupA() {
  if (top10Cache) return top10Cache;

  const { rows } = await pgPool.query(`
    SELECT sbd, toan, vat_li, hoa_hoc,
           (toan + vat_li + hoa_hoc) AS total
    FROM "Student"
    WHERE toan IS NOT NULL
      AND vat_li IS NOT NULL
      AND hoa_hoc IS NOT NULL
    ORDER BY total DESC
    LIMIT 10
  `);

  top10Cache = rows.map((s) => ({
    sbd:     s.sbd,
    toan:    Number(s.toan),
    vat_li:  Number(s.vat_li),
    hoa_hoc: Number(s.hoa_hoc),
    total:   Number(s.total),
  }));
  return top10Cache;
}

module.exports = { getScoreStats, getTop10GroupA };
