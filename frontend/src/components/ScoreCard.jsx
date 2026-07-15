import './ScoreCard.css';

const levelMap = {
  excellent: { label: '>= 8 (Excellent)', cls: 'excellent' },
  good:      { label: '6-8 (Good)',       cls: 'good' },
  average:   { label: '4-6 (Average)',    cls: 'average' },
  weak:      { label: '< 4 (Weak)',       cls: 'weak' },
};

export default function ScoreCard({ sbd, scores }) {
  return (
    <div className="card">
      <h2 className="card__title">
        Results - Registration Number: <span className="highlight">{sbd}</span>
      </h2>

      <div className="score-table-wrapper">
        <table className="score-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((row) => {
              const level = levelMap[row.level];
              return (
                <tr key={row.key}>
                  <td>{row.subject}</td>
                  <td className="score-value">
                    {row.score !== null ? row.score.toFixed(2) : '-'}
                  </td>
                  <td>
                    {level ? (
                      <span className={`score-badge score-badge--${level.cls}`}>
                        {level.label}
                      </span>
                    ) : (
                      <span className="score-badge score-badge--null">Absent</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
