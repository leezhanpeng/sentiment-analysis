import os

from typing import Union, List
from transformers import pipeline

# Disable info and warning messages
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# Set up pipeline for sentiment analysis
pipe = pipeline("text-classification", model="finiteautomata/bertweet-base-sentiment-analysis", top_k=None)

def get_sentiment(input: Union[str, List[str]]) -> (int):
    """
    Generates the sentiment of given input.

    Parameters:
            input (string/list[string]): The text(s) to derive sentiment from.
    Returns:
            binary_sum (str): Binary string of the sum of a and b
    """

    classifications = pipe(input)
    result = {}
    for output in classifications:
        for sentiment in output:
            sentiment_type = sentiment["label"]
            result[sentiment_type] = result.get(sentiment_type, 0) + sentiment["score"]
    
    result = {key: value / len(classifications) for key, value in result.items()}
    return result


print(get_sentiment("Hi i am very happy."))