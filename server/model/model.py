from typing import Union, List, Dict
from transformers import pipeline

# Set up pipeline for sentiment analysis
pipe = pipeline("text-classification", model="finiteautomata/bertweet-base-sentiment-analysis", top_k=None, truncation=True)

def get_sentiment(input: Union[str, List[str]]) -> Dict[str, int]:
    """
    Generates the sentiment of given input.

    Parameters:
        - input (string/list[string]): The text(s) to derive sentiment from.
    Returns:
        - result (dict): Dictionary that contains the significance of the three possible sentiments (POS, NEU, NEG).
    """

    classifications = pipe(input)
    result = {}
    for output in classifications:
        for sentiment in output:
            sentiment_type = sentiment["label"]
            result[sentiment_type] = result.get(sentiment_type, 0) + sentiment["score"]
    
    result = {key: value / len(classifications) for key, value in result.items()}
    return result
