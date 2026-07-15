import { useTranslation } from 'react-i18next';
import './ScoreCard.css';

const levelMap = {
  excellent: 'excellent',
  good:      'good',
  average:   'average',
  weak:      'weak',
};

export default function ScoreCard({ sbd, scores, ma_ngoai_ngu }) {
  const { t } = useTranslation();

  return (
    <div className="card">
      <h2 className="card__title">
        {t('results')}: <span className="highlight">{sbd}</span>
      </h2>

      <div className="score-table-wrapper">
        <table className="score-table">
          <thead>
            <tr>
              <th>{t('subject')}</th>
              <th>{t('score')}</th>
              <th>{t('grade')}</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((row) => {
              const levelKey = levelMap[row.level];
              const isForeignLanguage = row.key === 'ngoai_ngu';
              
              return (
                <tr key={row.key}>
                  <td>
                    {t(row.key)}
                    {isForeignLanguage && ma_ngoai_ngu ? ` (${ma_ngoai_ngu})` : ''}
                  </td>
                  <td className="score-value">
                    {row.score !== null ? row.score.toFixed(2) : '-'}
                  </td>
                  <td>
                    {levelKey ? (
                      <span className={`score-badge score-badge--${levelKey}`}>
                        {t(levelKey)}
                      </span>
                    ) : (
                      <span className="score-badge score-badge--null">{t('absent')}</span>
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
