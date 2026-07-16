import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar       from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import SearchPage    from './pages/SearchPage';
import ReportsPage   from './pages/ReportsPage';
import Top10Page     from './pages/Top10Page';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/"        element={<DashboardPage />} />
            <Route path="/search"  element={<SearchPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/top10"   element={<Top10Page />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
