from typing import List, Tuple
import nltk
from nltk.tokenize import word_tokenize
from stop_words import get_stop_words
from nltk.stem import WordNetLemmatizer
from gensim import corpora
from gensim.models import LdaModel

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

stop_words = set(get_stop_words('en'))
lemmatizer = WordNetLemmatizer()


def get_topics(search_string: str, input: List[str], num_topics: int) -> List[Tuple[str, int]]:
    """
    Generates the topics of given input.

    Parameters:
        - search_string (string): The keyword used as initial input in frontend.
        - input (list[string]): The text(s) to derive topics from.
        - num_topics (int): The number of topics to return.

    Returns:
        - topics (dict): List of tuples that contain the topic probability pair.
    """
    texts = [
        [lemmatizer.lemmatize(word) if len(word) > 3 else word for word in word_tokenize(document.lower()) if word.isalnum() and word not in stop_words] for document in input
    ]

    keywords = [
        [lemmatizer.lemmatize(word) if len(word) > 3 else word for word in word_tokenize(document.lower()) if word.isalnum() and word not in stop_words] for document in search_string.split(" ")
    ]

    texts = [string for string in texts if string not in keywords]

    dictionary = corpora.Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]
    lda_model = LdaModel(corpus, num_topics=10, id2word=dictionary, passes=15)

    topics = []
    for topic_id in range(lda_model.num_topics):
        topic_words = lda_model.show_topic(topic_id)
        for word, probability in topic_words:
            topics.append((word, probability))

    topics.sort(key=lambda x: x[1], reverse=True)

    return topics[:num_topics]
