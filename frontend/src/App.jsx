import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar       from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import SearchPage    from './pages/SearchPage';
import './App.css';

function ReportPlaceholder() {
  const { t } = useTranslation();
  return (
    <div className="page">
      <h1>{t('reports')}</h1>
      <p>{t('underConstruction')}</p>
    </div>
  );
}

function Top10Placeholder() {
  const { t } = useTranslation();
  return (
    <div className="page">
      <h1>{t('top10')}</h1>
      <p>{t('underConstruction')}</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/"        element={<DashboardPage />} />
            <Route path="/search"  element={<SearchPage />} />
            <Route path="/reports" element={<ReportPlaceholder />} />
            <Route path="/top10"   element={<Top10Placeholder />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
