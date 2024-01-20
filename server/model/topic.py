from datasets import load_dataset

dataset = load_dataset("sentence-transformers/reddit-title-body")
from bertopic import BERTopic
# Create a BERTopic model
model = BERTopic(embedding_model="all-MiniLM-L6-v2")

print(dataset)
# Fit the model on your paragraphs
# topics, probabilities = model.fit_transform(texts)

# print(model.reduce_outliers(texts, topics))
# print(model.get_topic_info())