import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setInputText } from '../store/analysisSlice';

export const TextInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const inputText = useAppSelector((state) => state.analysis.inputText);

  return (
    <div className="text-input-container">
      <label htmlFor="text-input" className="label">
        Enter text to analyze:
      </label>
      <textarea
        id="text-input"
        className="textarea"
        value={inputText}
        onChange={(e) => dispatch(setInputText(e.target.value))}
        placeholder="Paste or type your text here..."
        rows={8}
      />
    </div>
  );
};

