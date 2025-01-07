import os

def executeMinizinc(temas):
    command = "snap run minizinc ../Periodico/PeriodicoGenerico.mzn ../Periodico/PeriodicoDatos.dzn"
    myCmd = os.popen(command).read()
    
    responseMin = myCmd.split(";\n")
    paginas = responseMin[0].split("[")[1].split(",")
    booleanos = responseMin[1].split("[")[1].split(",")
    utilidad = responseMin[2].split("= ")[1]
    pags = []
    bools = []
    for pag in paginas:
        pags.append(int(pag.strip().strip("])")))
    
    for boolean in booleanos:
        bools.append(int(boolean.strip().strip("])")))
    
    response = {
        "temas" : [],
        "utilidad" : utilidad
    }
    for i in range(len(temas)):
        tema = {
            "nombre" : temas[i],
            "paginas": bools[i]*pags[i]
        }
        response["temas"].append(tema)

    return response    
def processFile(request):
    temas = request.form.getlist('tema')
    temasA = []
    minA = []
    maxA = []
    potencialA = []

    capacidad = request.form.get("capacidad", 10)
    for tema in temas:
        if tema == "":
            continue
        minVal = request.form.get("min"+tema, "0")
        maxVal = request.form.get("max"+tema, "0")
        potencialVal = request.form.get("potencial"+tema, "0")
        temasA.append(tema)
        minA.append(minVal)
        maxA.append(maxVal)
        potencialA.append(potencialVal)

    file = open("../Periodico/PeriodicoDatos.dzn", "w")
    cantidad = len(temasA)
    file.write("n = " + str(cantidad) + "; \n")
    file.write("P = " + capacidad + "; \n")

    textMin = "minP = ["
    for minP in minA:
        textMin += minP+", "
    textMin = textMin.strip(", ")
    textMin += "];\n"
    file.write(textMin)

    textMax = "maxP = ["
    for maxP in maxA:
        textMax += maxP+", "
    textMax = textMax.strip(", ")
    textMax += "];\n"
    file.write(textMax)

    textPot = "readers = ["
    for potP in potencialA:
        textPot += potP+", "
    textPot = textPot.strip(", ")
    textPot += "];"
    file.write(textPot)
    file.close()

    return temasA
