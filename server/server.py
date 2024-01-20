from flask import Flask 

from markupsafe import escape

app = Flask(__name__)

@app.get("/testGet")
def test_get():
    return "testget hit"

@app.post("/testPost")
def test_post():
    return "testpost hit"
