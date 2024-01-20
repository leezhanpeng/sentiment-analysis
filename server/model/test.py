from gensim.models import Word2Vec
from gensim.models import KeyedVectors
import warnings
import nltk
from nltk.tokenize import word_tokenize

# Suppress warnings for brevity
warnings.filterwarnings("ignore")

# Load pre-trained Word2Vec model
# Replace this with the path to your downloaded Word2Vec model file
word2vec_model = KeyedVectors.load_word2vec_format('path/to/GoogleNews-vectors-negative300.bin', binary=True)

def associate_topics_paragraph(paragraph):
    # Tokenize the paragraph into words
    words = word_tokenize(paragraph.lower())  # Lowercasing for consistency

    # Filter out non-alphabetic words
    words = [word for word in words if word.isalpha()]

    if not words:
        return "No valid words found in the paragraph."

    # Calculate the average vector representation of words
    average_vector = sum(word2vec_model[word] for word in words) / len(words)

    # Find most similar words (topics) to the average vector
    similar_topics = word2vec_model.similar_by_vector(average_vector, topn=5)

    return similar_topics

if __name__ == "__main__":
    # Example usage
    paragraph = input("Enter a paragraph: ")
    result = associate_topics_paragraph(paragraph)
    
    print(f"\nRelated topics for the paragraph:")
    for topic, similarity_score in result:
        print(f"{topic}: {similarity_score:.4f}")
