const coordenates = {
    "A" : {
        "top" : "140px",
        "left" : "135px",
        "Node" : null
    },
    "B" : {
        "top" : "145px",
        "left" : "405px",
        "Node" : null
    },
    "C" : {
        "top" : "255PX",
        "left" : "85PX",
        "Node" : null
    },
    "D" : {
        "top" : "270PX",
        "left" : "285PX",
        "Node" : null
    }, 
    "E" : {
        "top" : "260PX",
        "left" : "530px",
        "Node" : null
    }
}

const main = () => {
    n1 = new Node("A");
    n2 = new Node("B");
    n3 = new Node("C");
    n4 = new Node("D");
    n5 = new Node("E");
    
    n1.setAdjacent(n2,10);
    n1.setAdjacent(n3,30);
    n1.setAdjacent(n4,20);
    coordenates["A"]["Node"] = n1;
    

    n2.setAdjacent(n1,10);
    n2.setAdjacent(n5,14);
    n2.setAdjacent(n4,12);
    coordenates["B"]["Node"] = n2;

    n3.setAdjacent(n1,30);
    n3.setAdjacent(n4,27);
    n3.setAdjacent(n5,65);
    coordenates["C"]["Node"] = n3;

    n4.setAdjacent(n1,20);
    n4.setAdjacent(n2,12);
    n4.setAdjacent(n3,27);
    n4.setAdjacent(n5,46);
    coordenates["D"]["Node"] = n4;

    n5.setAdjacent(n2,14);
    n5.setAdjacent(n4,46);
    n5.setAdjacent(n3,65);
    coordenates["E"]["Node"] = n5;


    const queue = [];
    let nextNode = coordenates[document.getElementById("origen").value]["Node"];
    while(nextNode !== null){
        const nAux = nextNode;
        nAux.setFinal(nAux.getTemporal());
        nAux.setVisited(true);
        nAux.getAdjacent().forEach(({node,distance}) => {
            if(!node.getVisited()){
                let d = nAux.getFinal() + distance;
                document.getElementById("area-ruta").value += "\n" + `Distancia entre ${nAux.getValue()} y ${node.getValue()} es de ${distance} y la suma es ${d}`;
                if((d < node.getTemporal()) || (node.getTemporal() === 0)){
                    node.setTemporal(d);
                    node.setFather(nAux);
                }
                queue.push(node);
            }
        });
        let min = Infinity;
        let index = -1;
        nextNode = null;
        queue.forEach((n,i) => {
            if(n.getTemporal() < min){                
                nextNode = n;
                index = i;
                min = n.getTemporal();
            }
        });
        queue.splice(index,1);
    }
    let bol = true;
    let nodeAux = coordenates[document.getElementById("destino").value]["Node"];;
    const route = [];
    while(bol){
        route.push(nodeAux.getValue());
        console.log(nodeAux.getValue() + " ---> ");
        nodeAux = nodeAux.getFather();
        if(!nodeAux)
            bol = false;
    }
    return route.reverse();
}



document.getElementById("button-seleccionar").addEventListener("click",(e) => {
    document.getElementById("carrito-imagen").style.left = coordenates[document.getElementById("origen").value]["left"];
    document.getElementById("carrito-imagen").style.top = coordenates[document.getElementById("origen").value]["top"];
});

document.getElementById("button-iniciar").addEventListener("click",(e) => {
    const route = main();
    document.getElementById("area-ruta").value += "\n" + `La mejor ruta es: ${route.map(r => r += " ----> ").join("")}`;
    route.shift()
    const c = route.shift();
    document.getElementById("carrito-imagen").style.left = coordenates[c]["left"];
    document.getElementById("carrito-imagen").style.top = coordenates[c]["top"];
    console.log("Mueve a "+c);

    route.forEach((r) => {
        console.log(r);
        setTimeout(() => {
            document.getElementById("carrito-imagen").style.left = coordenates[r]["left"];
            document.getElementById("carrito-imagen").style.top = coordenates[r]["top"];
        },4000)
    });
});

document.getElementById("button-reiniciar").addEventListener("click",(e) => {
    document.getElementById("carrito-imagen").style.left = 0;
    document.getElementById("carrito-imagen").style.top = 0;
    document.getElementById("area-ruta").value = "";
});