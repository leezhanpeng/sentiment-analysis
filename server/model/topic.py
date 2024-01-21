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
        - result (dict): Topic probability pairs represented in a dictionary.
    """
    texts = [
        [lemmatizer.lemmatize(word) if len(word) > 3 else word for word in word_tokenize(document.lower()) if word.isalnum() and word not in stop_words] for document in input if "/" not in document
    ]

    keywords = [
        lemmatizer.lemmatize(word) if len(word) > 3 else word for word in word_tokenize(search_string.lower()) if word.isalnum() and word not in stop_words 
    ]

    texts = list(map(lambda x: [word for word in x if word not in keywords], texts))

    dictionary = corpora.Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]
    lda_model = LdaModel(corpus, num_topics=10, id2word=dictionary, passes=15, random_state=69)

    topics = []
    words = set()
    for topic_id in range(lda_model.num_topics):
        topic_words = lda_model.show_topic(topic_id)
        for word, probability in topic_words:
            if word not in words and len(word) != 1:
                topics.append((word, probability))
                words.add(word)

    topics.sort(key=lambda x: x[1], reverse=True)

    result = {}
    for topic, prob in topics[:num_topics]:
        result[topic] = prob
    
    return result
