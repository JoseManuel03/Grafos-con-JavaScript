let nodes = [];
let selectedNode = null;
let arcos = [];

function getNodeAt(x, y, nodes) { //calcula la distincia enter un nodo y otro
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    const a = x - node.x;
    const b = y - node.y;

    const c = Math.sqrt(a * a + b * b); //formula para calcular la distancia de una vertice a otra

    if (c < 90) {
      return node;
    }
  }
  return null;
}

function drawNodes(ctx, nodes) { //se cambia el color del numero del nodo al seleccionarlo
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];

    if (node === selectedNode) {
      ctx.strokeStyle = "#FF0000";
    } else {
      ctx.strokeStyle = "#000000";
    }

    ctx.beginPath(); //aqui se genera los circulos o vertices del grafo
    ctx.lineWidth = 5; // se cambia el grosor del vertice
    ctx.fillStyle = "#FFFFFF";
    ctx.arc(node.x, node.y, 40, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    if (node === selectedNode) { // cambiar el color de un nodo al seleccionarlo
      ctx.fillStyle = "#FF0000";
    } else {
      ctx.fillStyle = "#000000";
    }

    ctx.font = "30px Arial"; //escribe la numeracion de los nodos
    ctx.fillText(index, node.x - 5, node.y + 5);
  }
}

function drawArcos(ctx, arcos) { 
  for (let index = 0; index < arcos.length; index++) {
    const arco = arcos[index];
    ctx.moveTo(arco.node1.x, arco.node1.y);
    ctx.lineTo(arco.node2.x, arco.node2.y);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
  }
}

window.onload = async () => { //genera las aristas
  var canvas = document.getElementById("myCanvas");
  var context = canvas.getContext("2d");

  canvas.addEventListener("click", (e) => { //se genera el circulo al dar click
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;

    let tempNode = getNodeAt(x, y, nodes);

    if (selectedNode !== null && tempNode === null) {
      selectedNode = tempNode;
      tempNode = null;
    }

    if (selectedNode === null) {
      selectedNode = tempNode;
      tempNode = null;
    }

    if (selectedNode === null) { //esto es para no permitir dibijar un nodo sobre otro
      nodes.push({ x, y });
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (selectedNode !== null && tempNode !== null) { //dibuja el arco de un nodo al otro
      arcos.push({ node1: selectedNode, node2: tempNode });
      selectedNode = null;
      tempNode = null;
    }
    drawArcos(context, arcos);
    drawNodes(context, nodes);
  });
};
