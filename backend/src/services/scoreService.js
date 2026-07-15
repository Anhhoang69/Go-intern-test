class SubjectManager {
  constructor() {
    this.subjects = [
      { key: 'toan',      label: 'Mathematics' },
      { key: 'ngu_van',   label: 'Literature' },
      { key: 'ngoai_ngu', label: 'Foreign Language' },
      { key: 'vat_li',    label: 'Physics' },
      { key: 'hoa_hoc',   label: 'Chemistry' },
      { key: 'sinh_hoc',  label: 'Biology' },
      { key: 'lich_su',   label: 'History' },
      { key: 'dia_li',    label: 'Geography' },
      { key: 'gdcd',      label: 'Civic Education' },
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
    return {
      sbd: student.sbd,
      ma_ngoai_ngu: student.ma_ngoai_ngu,
      scores
    };
  }

  calcGroupATotal(student) {
    return this.groupAKeys.reduce((sum, key) => sum + (student[key] ?? 0), 0);
  }
}

module.exports = SubjectManager;
