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

}

module.exports = SubjectManager;
