import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Search as SearchIcon } from 'lucide-react';
import { getScoreBySbd } from '../services/api';
import ScoreCard from '../components/ScoreCard';
import './SearchPage.css';

export default function SearchPage() {
  const { t } = useTranslation();
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
      const msg = err.response?.data?.error || t('errorDefault');
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1 className="page__title">{t('searchScores')}</h1>

      <div className="card search-card">
        <form onSubmit={handleSearch} className="search-form">
          <label htmlFor="sbd-input" className="search-form__label">
            {t('registrationNumber')}
          </label>
          <div className="search-form__row">
            <input
              id="sbd-input"
              type="text"
              className="search-form__input"
              placeholder={t('placeholderSbd')}
              value={sbd}
              onChange={(e) => setSbd(e.target.value)}
              maxLength={8}
            />
            <button
              type="submit"
              className="btn btn--primary"
              disabled={loading}
            >
              <SearchIcon size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
              {loading ? t('searching') : t('search')}
            </button>
          </div>
        </form>
      </div>

      {result && (
        <ScoreCard 
          sbd={result.sbd} 
          scores={result.scores} 
          ma_ngoai_ngu={result.ma_ngoai_ngu} 
        />
      )}

      {error && (
        <div className="card error-card">
          <AlertCircle size={18} className="error-icon" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
