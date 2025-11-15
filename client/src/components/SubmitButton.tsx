import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { analyzeAsync } from '../store/analysisSlice';

export const SubmitButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const { inputText, loading } = useAppSelector((state) => state.analysis);

  const handleSubmit = () => {
    if (inputText.trim()) {
      dispatch(analyzeAsync(inputText));
    }
  };

  return (
    <button
      className="submit-button"
      onClick={handleSubmit}
      disabled={!inputText.trim() || loading}
    >
      {loading ? 'Analyzing...' : 'Analyze Text'}
    </button>
  );
};

