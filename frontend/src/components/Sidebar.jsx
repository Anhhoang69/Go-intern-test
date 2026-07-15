import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Search, BarChart3, Trophy, Menu, X, GraduationCap, Globe } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navItems = [
    { to: '/',        label: t('dashboard'),     icon: Home },
    { to: '/search',  label: t('searchScores'), icon: Search },
    { to: '/reports', label: t('reports'),       icon: BarChart3 },
    { to: '/top10',   label: t('top10'),        icon: Trophy },
  ];

  return (
    <>
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__top">
          <div className="sidebar__logo">
            <GraduationCap className="sidebar__logo-icon" size={28} />
            <span className="sidebar__logo-text">G-Scores</span>
          </div>

          <nav className="sidebar__nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="sidebar__icon" size={18} />
                  <span className="sidebar__label">{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="sidebar__lang-toggle">
          <Globe size={16} className="sidebar__lang-icon" />
          <button 
            className={`sidebar__lang-btn ${i18n.language === 'en' ? 'sidebar__lang-btn--active' : ''}`}
            onClick={() => i18n.changeLanguage('en')}
          >
            EN
          </button>
          <span className="sidebar__lang-divider">|</span>
          <button 
            className={`sidebar__lang-btn ${i18n.language === 'vi' ? 'sidebar__lang-btn--active' : ''}`}
            onClick={() => i18n.changeLanguage('vi')}
          >
            VI
          </button>
        </div>
      </aside>
    </>
  );
}
