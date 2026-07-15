class SubjectManager {
  constructor() {
    this.subjects = [
      { key: 'toan',      label: 'Toan' },
      { key: 'ngu_van',   label: 'Ngu Van' },
      { key: 'ngoai_ngu', label: 'Ngoai Ngu' },
      { key: 'vat_li',    label: 'Vat Li' },
      { key: 'hoa_hoc',   label: 'Hoa Hoc' },
      { key: 'sinh_hoc',  label: 'Sinh Hoc' },
      { key: 'lich_su',   label: 'Lich Su' },
      { key: 'dia_li',    label: 'Dia Li' },
      { key: 'gdcd',      label: 'GDCD' },
    ];

    this.groupAKeys = ['toan', 'vat_li', 'hoa_hoc'];
  }

  getLabel(key) {
    const found = this.subjects.find((s) => s.key === key);
    return found ? found.label : key;
  }

  classifyScore(score) {
    if (score === null || score === undefined) return null;
    if (score >= 8) return 'excellent';
    if (score >= 6) return 'good';
    if (score >= 4) return 'average';
    return 'weak';
  }

  formatStudent(student) {
    const scores = this.subjects.map(({ key, label }) => ({
      subject: label,
      key,
      score: student[key],
      level: student[key] !== null ? this.classifyScore(student[key]) : null,
    }));
    return { sbd: student.sbd, scores };
  }

  calcGroupATotal(student) {
    return this.groupAKeys.reduce((sum, key) => sum + (student[key] ?? 0), 0);
  }
}

module.exports = SubjectManager;
