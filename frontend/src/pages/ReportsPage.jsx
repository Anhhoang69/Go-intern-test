import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { getReportStats } from '../services/api';
import './ReportsPage.css';

const COLORS = {
  excellent: '#22c55e',
  good:      '#3b82f6',
  average:   '#f59e0b',
  weak:      '#ef4444',
};

export default function ReportsPage() {
  const { t } = useTranslation();
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');

  useEffect(() => {
    getReportStats()
      .then(({ data }) => setRawData(data))
      .catch(() => setError(t('errorDefault')))
      .finally(() => setLoading(false));
  }, []);

  const chartData = useMemo(() => {
    return rawData.map((row) => ({
      name:      t(row.key),
      excellent: row.excellent,
      good:      row.good,
      average:   row.average,
      weak:      row.weak,
    }));
  }, [rawData, t]);

  if (loading) return <div className="page"><p className="status-text">{t('loading')}</p></div>;
  if (error)   return <div className="page"><p className="status-text status-text--error">{error}</p></div>;

  return (
    <div className="page">
      <h1 className="page__title">{t('reports')}</h1>
      <p className="page__subtitle">{t('scoreDistribution')}</p>

      <div className="card chart-card">
        <div className="chart-legend-row">
          {Object.entries(COLORS).map(([key, color]) => (
            <span key={key} className="legend-item">
              <span className="legend-dot" style={{ background: color }} />
              {t(`${key}Label`)}
            </span>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={420}>
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: '#64748b' }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
            <Tooltip
              formatter={(value) => [value.toLocaleString(), '']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Bar dataKey="excellent" name={t('excellentLabel')} fill={COLORS.excellent} radius={[4,4,0,0]} />
            <Bar dataKey="good"      name={t('goodLabel')}      fill={COLORS.good}      radius={[4,4,0,0]} />
            <Bar dataKey="average"   name={t('averageLabel')}   fill={COLORS.average}   radius={[4,4,0,0]} />
            <Bar dataKey="weak"      name={t('weakLabel')}      fill={COLORS.weak}      radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
