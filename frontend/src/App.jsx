import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar       from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import SearchPage    from './pages/SearchPage';
import './App.css';

function ReportPlaceholder() {
  return <div className="page"><h1>Report Statistics</h1><p>Chart configuration is in progress...</p></div>;
}

function Top10Placeholder() {
  return <div className="page"><h1>Top 10 Group A</h1><p>Top list analysis is in progress...</p></div>;
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
