import warnings
from typing import Union, List

from transformers import pipeline

warnings.filterwarnings("ignore", category=UserWarning, module="xformers")

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

    return pipe(input)

def 
