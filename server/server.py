from flask import Flask, request, jsonify
import praw
from praw.models import MoreComments
from markupsafe import escape
from dotenv import load_dotenv
import os
from os.path import join,dirname
from model import model

app = Flask(__name__)
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
    for i in all.search(searchString, limit=5):
        for comment in i.comments[:10]:
            if not isinstance(comment, MoreComments):
                commentList["list"].append(comment.body)
    print(commentList["list"][:2])
    return jsonify(commentList)

if __name__ == '__main__':
    app.run()
    
