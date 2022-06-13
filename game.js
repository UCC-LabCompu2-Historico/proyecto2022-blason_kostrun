
var canvas = document.getElementById("lienzo");
var ctx = canvas.getContext("2d");

// dibujamos una Pelota

var x = canvas.width;
var y = canvas.height - 10;

var dx = 2;
var dy = -2;


var pelota = {
    radio : 10,
    dibujar: function (){
        ctx.beginPath();
        ctx.arc(x, y, this.radio, 0, 2*Math.PI); // radio de l bola = 10, la pelota completa es de 0 a 2*mathh.Pi
        ctx.fillStyle = "black";
        ctx.fill(); // pintamos la pelota
        ctx.closePath();
    }
};

const PADDLE_WIDTH = 100;

const PADDLE_MARGIN_BOTTOM = 50;

const PADDLE_HEIGHT = 20;

var barra = {
    x : canvas.width/2 - PADDLE_WIDTH/2,
    y : canvas.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx : 5,
    ancho:75,
    alto:10,
    posicionX: (canvas.width - 75)/2,
    draw: function (){
        ctx.beginPath();
        ctx.fillStyle = "#2e3548";
        ctx.fillRect(this.posicionX,462, this.ancho, this.alto);
        ctx.fill();
        ctx.closePath();
    }
}

  var presionadoDerecho = false;
  var presionadoIzquierdo = false;

  document.addEventListener("keydown",keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function keyDownHandler(event) {
      if (event.keyCode === 39){ // keyCode del boton derecho = 39
          presionadoDerecho = true;
      } else if (event.keyCode === 37){ // keyCode del boton izquierdo = 39
          presionadoIzquierdo = true;
      }
  }

function keyUpHandler(event) {
    if (event.keyCode === 39){ // keyCode del boton derecho = 39
        presionadoDerecho = false;
    } else if (event.keyCode === 37){ // keyCode del boton izquierdo = 39
        presionadoIzquierdo = false;
    }
}

var ladrillo = {
      alto:20,
      ancho:75,

};
  var filas = 3;
  var columnas = 5;
  var espacio = 10;
  var espacioSuperior = 30;
  var espacioIzquierdo =30;

  var cuadroLadrillos = []; // co este codigo hpasamos por todas filas/columnas y creamos los ladrillos
   for (i = 0; i < columnas; i++){
       cuadroLadrillos[i] = [];
       for (j=0; j < filas; j++){
           cuadroLadrillos[i][j] = { x: 0, y : 0};
       }
   }
   function drawCuadroLadrillos(){
       for (i = 0; i < columnas; i++){
           for (j=0; j < filas; j++){
               cuadroLadrillos[i][j].x = 0;
               cuadroLadrillos[i][j].y = 0;
               ctx.beginPath();
               // posicion de ladrillos
               var ladrilloX = (i * (ladrillo.ancho + espacio)) + espacioIzquierdo;
               var ladrilloY = ( j * (ladrillo.alto + espacio)) + espacioSuperior;
               ctx.fillRect(ladrilloX,ladrilloY, ladrillo.ancho, ladrill.alto);
               ctx.fill();
               ctx.closePath();
           }
       }
   }


function dibujar(){
    canvas.width = canvas.width;
    // rebotamos la pelota izquirda / derecha || arriba / abajo
     if (x + dx < 0 || x + dx > canvas.width){
         dx = -dx;
     }
    if (y + dy < 0 || y + dy > canvas.height){
        dy = -dy;
    }

    // movemos la barra a la derecha / izquierda
    if (presionadoDerecho && barra.posicionX < canvas.width - barra.ancho){
         barra.posicionX = barra.posicionX + 7;

    } else if (presionadoIzquierdo && barra.posicionX > 0){
        barra.posicionX = barra.posicionX - 7;
    }
    pelota.dibujar();
    barra.draw();


    x = x + dx;
    y = y + dy;
}
setInterval(dibujar, 10); // llamamos una funcioncada cierto tiempo


function ingreseSuNombre(id, valor){
    if (isNaN(valor)){
        alert(" Dato Invalido " + id);

    }
}
