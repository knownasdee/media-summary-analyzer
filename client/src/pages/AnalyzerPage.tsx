import React from 'react';
import { TextInput } from '../components/TextInput';
import { SubmitButton } from '../components/SubmitButton';
import { Results } from '../components/Results';

export const AnalyzerPage: React.FC = () => {
  return (
    <div className="analyzer-page">
      <header className="header">
        <h1>Media Summary Analyzer</h1>
        <p className="subtitle">Analyze text for summary, sentiment, and word count</p>
      </header>

      <main className="main-content">
        <div className="input-section">
          <TextInput />
          <SubmitButton />
        </div>

        <Results />
      </main>
    </div>
  );
};

