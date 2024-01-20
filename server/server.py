from flask import Flask, request, jsonify
import praw
from praw.models import MoreComments
from markupsafe import escape
from dotenv import load_dotenv
import os
from os.path import join,dirname
from model import model, topic
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
dotenv_path = join(dirname(__file__), ".env")
load_dotenv(dotenv_path)
reddit = praw.Reddit(
    client_id=os.getenv("REDDITCLIENTID"),
    client_secret=os.getenv("REDDITCLIENTSECRET"),
    password=os.getenv("REDDITUSERPASS"),
    user_agent=os.getenv("REDDITUSERAGENT"),
    username=os.getenv("REDDITUSERNAME"),
) 

@app.post("/searchPost")
def search_post():
    searchString = request.json["searchString"]
    commentList = {"list": []}
    response = {
        "sentiments" : {},
        "topics" : {}
    }
    all = reddit.subreddit("all")
    for submission in all.search(searchString, limit=10):
        commentList["list"].append(submission.title)
        for comment in submission.comments[:5]:
            if not isinstance(comment, MoreComments):
                commentList["list"].append(comment.body)
    sentiments = model.get_sentiment(commentList["list"][:50])
    topics = topic.get_topics(searchString, commentList["list"], 25)
    response["sentiments"] = {key: str(value) for key, value in sentiments.items()}
    response["topics"] = {key: str(value) for key, value in topics.items()}
    return jsonify(response)

if __name__ == '__main__':
    app.run()
    
