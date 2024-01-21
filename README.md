# Reddit Sentiment Analysis Project

Welcome to the Reddit Sentiment Analysis project! This project utilises state-of-the-art natural language processing techniques to analyse the sentiment of phrases within the Reddit community. Whether you're curious about the prevailing sentiments on a particular subreddit or want to gauge the mood surrounding a specific topic, this application has you covered.

## Overview

- **Frontend:** Developed with React JS, our user-friendly interface provides a seamless experience for users to input phrases and receive sentiment analysis results.

- **Backend:** Powered by Python Flask, the backend efficiently handles user requests, communicates with the sentiment analysis model, and orchestrates the overall functioning of the application.

- **Sentiment Analysis Model:** We leverage BERT (Bidirectional Encoder Representations from Transformers) for sentiment analysis, classifying phrases into Positive (POS), Neutral (NEU), or Negative (NEG) sentiments. BERT's contextual understanding ensures accurate sentiment predictions.

- **Topic Modeling:** The application also employs LdaModel from gensim for topic modeling, enabling users to explore and understand the prevailing themes within the Reddit community.

## Getting Started

1. **Clone the Repository:**
  ```
  git clone https://github.com/leezhanpeng/sentiment-analysis.git
  cd sentiment-analysis
  ```

2. **Install Dependencies:**
- Frontend (React JS):
  ```
  cd client
  npm install --legacy-peer-deps
  ```

- Backend (Python Flask):
  ```
  cd server
  pip install -r requirements.txt
  ```

3. **Run the Application:**
- Frontend (React JS):
  ```
  cd client
  npm start
  ```

- Backend (Python Flask):
  ```
  cd server
  flask --app server run
  ```

4. **Access the Application:**
Open your web browser and navigate to `http://localhost:8080` to use the Reddit Sentiment Analysis application.

## Usage

1. Enter a phrase in the provided input field.
2. Click the "Analyse" button to initiate sentiment analysis.
3. Explore the sentiment analysis results, including the sentiment classification and relevant topic information.

---

Thank you for using the Reddit Sentiment Analysis project! If you have any questions or encounter issues, please don't hesitate to reach out. Happy analysing!
