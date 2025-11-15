export interface AnalysisResult {
  summary: string;
  sentiment: number;
  word_count: number;
}

export interface AnalyzeRequest {
  text: string;
}

