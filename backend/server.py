from flask import Flask

app = Flask(__name__)

@app.route('/names')
def names():
    return {"names": ["zoey","hannah","barry","sophie"]}

if __name__ == '__main__':
    app.run(debug=True, host='localhost')
