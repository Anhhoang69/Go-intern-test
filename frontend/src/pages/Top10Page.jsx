import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Medal } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { getTop10GroupA } from '../services/api';
import './Top10Page.css';

const BAR_COLORS = [
  '#f59e0b', '#fbbf24', '#fcd34d',
  '#3b82f6', '#60a5fa', '#93c5fd',
  '#22c55e', '#4ade80', '#86efac', '#bbf7d0'
];

export default function Top10Page() {
  const { t } = useTranslation();
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    getTop10GroupA()
      .then(({ data }) => setData(data))
      .catch(() => setError(t('errorDefault')))
      .finally(() => setLoading(false));
  }, [t]);

  const chartData = useMemo(() => {
    return data.map((s, i) => ({
      name:  `#${i + 1}`,
      sbd:   s.sbd,
      total: parseFloat(s.total.toFixed(2)),
    }));
  }, [data]);

  if (loading) return <div className="page"><p className="status-text">{t('loading')}</p></div>;
  if (error)   return <div className="page"><p className="status-text status-text--error">{error}</p></div>;

  return (
    <div className="page">
      <h1 className="page__title">{t('top10')}</h1>
      <p className="page__subtitle">{t('top10Title')}</p>

      <div className="top10-layout">
        <div className="card">
          <div className="score-table-wrapper">
            <table className="score-table">
            <thead>
              <tr>
                <th>{t('rank')}</th>
                <th>{t('registrationNumber')}</th>
                <th>{t('mathematics')}</th>
                <th>{t('physics')}</th>
                <th>{t('chemistry')}</th>
                <th>{t('total')}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s, i) => (
                <tr key={s.sbd} className={i < 3 ? 'top-row' : ''}>
                  <td className="rank-cell">
                    {i < 3 ? (
                      <Medal
                        size={20}
                        color={['#d97706', '#64748b', '#b45309'][i]}
                        fill={['#fbbf24', '#cbd5e1', '#d97706'][i]}
                        style={{ verticalAlign: 'middle' }}
                      />
                    ) : (
                      `#${i + 1}`
                    )}
                  </td>
                  <td className="score-value">{s.sbd}</td>
                  <td>{s.toan?.toFixed(2) ?? '-'}</td>
                  <td>{s.vat_li?.toFixed(2) ?? '-'}</td>
                  <td>{s.hoa_hoc?.toFixed(2) ?? '-'}</td>
                  <td className="score-value total-cell">{s.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        <div className="card chart-card">
          <h3 className="card__title">{t('top10Chart')}</h3>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis domain={[25, 30]} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip
                formatter={(value, name, props) => [value, props.payload.sbd]}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Bar
                dataKey="total"
                name={t('total')}
                shape={(props) => {
                  const { x, y, width, height, index } = props;
                  const fill = BAR_COLORS[index] ?? '#94a3b8';
                  return <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} ry={4} />;
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
