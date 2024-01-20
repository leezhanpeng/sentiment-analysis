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



@app.get("/testGet")
def test_get():
    
    return "testget hit"

@app.post("/testPost")
def test_post():
    data = request.json
    return jsonify(data)

@app.post("/searchPost")
def search_post():
    searchString = request.json["searchString"]
    commentList = {"list": []}
    all = reddit.subreddit("all")
    count = 0
    for submission in all.search(searchString, limit=10):
        #submission.comments.replace_more(limit=None)
        #print(submission.title)
        commentList["list"].append(submission.title)
        #count += submission.num_comments
        for comment in submission.comments[:5]:
            if not isinstance(comment, MoreComments):
                commentList["list"].append(comment.body)
    # print(commentList["list"])
    # print(len(commentList["list"]))
    # print(count)
    sentiments = model.get_sentiment(commentList["list"][:50])
    topics = topic.get_topics(commentList["list"], 5)
    print(sentiments)
    print(topics)
    return jsonify(commentList)

if __name__ == '__main__':
    app.run()
    
