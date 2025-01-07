from flask import Flask, abort, request, render_template, redirect
from processing import processFile, executeMinizinc
app = Flask(__name__)


@app.route('/',methods=['POST','GET'])
def index():
    if request.method == "POST":
        resultado = ""
        temas = processFile(request)
        resultado = executeMinizinc(temas)
        return render_template("resultado.html", resultado=resultado)
    elif request.method == "GET":
        return render_template("index.html")


if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0')