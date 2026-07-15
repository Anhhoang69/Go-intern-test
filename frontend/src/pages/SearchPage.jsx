import { useState } from 'react';
import { getScoreBySbd } from '../services/api';
import ScoreCard from '../components/ScoreCard';
import './SearchPage.css';

export default function SearchPage() {
  const [sbd, setSbd]       = useState('');
  const [result, setResult] = useState(null);
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();
    if (!sbd.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const { data } = await getScoreBySbd(sbd.trim());
      setResult(data);
    } catch (err) {
      const msg = err.response?.data?.error || 'An error occurred. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1 className="page__title">Search Scores</h1>

      <div className="card search-card">
        <form onSubmit={handleSearch} className="search-form">
          <label htmlFor="sbd-input" className="search-form__label">
            Registration Number
          </label>
          <div className="search-form__row">
            <input
              id="sbd-input"
              type="text"
              className="search-form__input"
              placeholder="Enter 8 digits (e.g. 01000001)"
              value={sbd}
              onChange={(e) => setSbd(e.target.value)}
              maxLength={8}
            />
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {result && <ScoreCard sbd={result.sbd} scores={result.scores} />}

      {error && (
        <div className="card error-card">
          <span className="error-icon">⚠️</span> {error}
        </div>
      )}
    </div>
  );
}
