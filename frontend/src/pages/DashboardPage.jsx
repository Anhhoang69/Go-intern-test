import { Link } from 'react-router-dom';
import { Search, BarChart3, Trophy } from 'lucide-react';
import './DashboardPage.css';

const cards = [
  {
    to:    '/search',
    icon:  Search,
    title: 'Search Scores',
    desc:  'Enter registration number to view detailed exam scores',
    color: 'blue',
  },
  {
    to:    '/reports',
    icon:  BarChart3,
    title: 'Statistics',
    desc:  'Score distribution charts across 4 performance levels',
    color: 'green',
  },
  {
    to:    '/top10',
    icon:  Trophy,
    title: 'Top 10 Group A',
    desc:  'View the list of 10 students with the highest Group A total scores',
    color: 'yellow',
  },
];

export default function DashboardPage() {
  return (
    <div className="page">
      <h1 className="page__title">Dashboard</h1>
      <p className="page__subtitle">
        High School Graduation Exam 2024 Score Portal
      </p>

      <div className="dashboard-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.to} to={card.to} className={`dash-card dash-card--${card.color}`}>
              <div className="dash-card__icon-wrapper">
                <Icon size={24} className="dash-card__icon" />
              </div>
              <h2 className="dash-card__title">{card.title}</h2>
              <p className="dash-card__desc">{card.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
