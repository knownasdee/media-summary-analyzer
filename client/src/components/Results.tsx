import React from 'react';
import { useAppSelector } from '../store/hooks';

export const Results: React.FC = () => {
  const { result, error, loading } = useAppSelector((state) => state.analysis);

  if (loading) {
    return (
      <div className="results-container">
        <div className="loading">Analyzing text...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="results-container">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const getSentimentLabel = (score: number): string => {
    if (score > 0.1) return 'Positive';
    if (score < -0.1) return 'Negative';
    return 'Neutral';
  };

  const getSentimentColor = (score: number): string => {
    if (score > 0.1) return '#4caf50';
    if (score < -0.1) return '#f44336';
    return '#ff9800';
  };

  return (
    <div className="results-container">
      <h2 className="results-title">Analysis Results</h2>
      
      <div className="result-section">
        <h3 className="result-label">Summary:</h3>
        <p className="result-value">{result.summary}</p>
      </div>

      <div className="result-section">
        <h3 className="result-label">Sentiment:</h3>
        <div className="sentiment-display">
          <span
            className="sentiment-badge"
            style={{ backgroundColor: getSentimentColor(result.sentiment) }}
          >
            {getSentimentLabel(result.sentiment)} ({result.sentiment.toFixed(3)})
          </span>
        </div>
      </div>

      <div className="result-section">
        <h3 className="result-label">Word Count:</h3>
        <p className="result-value">{result.word_count} words</p>
      </div>
    </div>
  );
};

