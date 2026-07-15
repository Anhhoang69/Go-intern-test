import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, BarChart3, Trophy } from 'lucide-react';
import './DashboardPage.css';

const cards = [
  {
    to:      '/search',
    icon:    Search,
    titleKey: 'searchScores',
    descKey:  'searchDesc',
    color:   'blue',
  },
  {
    to:      '/reports',
    icon:    BarChart3,
    titleKey: 'reports',
    descKey:  'reportsDesc',
    color:   'green',
  },
  {
    to:      '/top10',
    icon:    Trophy,
    titleKey: 'top10',
    descKey:  'top10Desc',
    color:   'yellow',
  },
];

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="page">
      <h1 className="page__title">{t('dashboard')}</h1>
      <p className="page__subtitle">{t('subTitle')}</p>

      <div className="dashboard-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.to} to={card.to} className={`dash-card dash-card--${card.color}`}>
              <div className="dash-card__icon-wrapper">
                <Icon size={24} className="dash-card__icon" />
              </div>
              <h2 className="dash-card__title">{t(card.titleKey)}</h2>
              <p className="dash-card__desc">{t(card.descKey)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
