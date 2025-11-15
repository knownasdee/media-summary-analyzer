from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from textblob import TextBlob
import re

app = FastAPI(title="Media Summary Analyzer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class AnalyzeRequest(BaseModel):
    text: str


class AnalyzeResponse(BaseModel):
    summary: str
    sentiment: float
    word_count: int


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok"}


@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_text(request: AnalyzeRequest):
    """
    Analyze text and return summary, sentiment, and word count.
    
    - **text**: The input text to analyze
    """
    text = request.text.strip()
    
    if not text:
        return AnalyzeResponse(
            summary="No text provided.",
            sentiment=0.0,
            word_count=0
        )
    
    # Create TextBlob object
    blob = TextBlob(text)
    
    # Calculate word count
    words = re.findall(r'\b\w+\b', text.lower())
    word_count = len(words)
    
    # Calculate sentiment (-1 to 1)
    sentiment = blob.sentiment.polarity
    
    # Generate summary (first 2 sentences)
    sentences = blob.sentences
    if len(sentences) >= 2:
        summary = str(sentences[0]) + " " + str(sentences[1])
    elif len(sentences) == 1:
        summary = str(sentences[0])
    else:
        summary = text[:200] + "..." if len(text) > 200 else text
    
    return AnalyzeResponse(
        summary=summary.strip(),
        sentiment=round(sentiment, 3),
        word_count=word_count
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

