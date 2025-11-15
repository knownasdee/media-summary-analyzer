import axios from 'axios';
import { AnalysisResult, AnalyzeRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  const response = await client.post<AnalysisResult>('/analyze', {
    text,
  } as AnalyzeRequest);
  return response.data;
};

export const checkHealth = async (): Promise<{ status: string }> => {
  const response = await client.get<{ status: string }>('/health');
  return response.data;
};

