import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Home, Search, BarChart3, Trophy, Menu, X, GraduationCap } from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { to: '/',        label: 'Dashboard',     icon: Home },
  { to: '/search',  label: 'Search Scores', icon: Search },
  { to: '/reports', label: 'Reports',       icon: BarChart3 },
  { to: '/top10',   label: 'Top 10',        icon: Trophy },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
      </aside>
    </>
  );
}
