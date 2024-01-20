from flask import Flask, request, jsonify

from markupsafe import escape

app = Flask(__name__)

@app.get("/testGet")
def test_get():
    return "testget hit"

@app.post("/testPost")
def test_post():
    data = request.json
    return jsonify(data)

if __name__ == '__main__':
    app.run()
    
