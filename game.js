
/** Para comenzar a dibujar, primero creamos una variable llamada canvas la cual le haciamos refeerencia con el document.getElement.Id
 *  Creamos la variable de context ctx para poder axeder a todas los metodos particulares del canvas
 *
 * **/
var canvas = document.getElementById("lienzo");
var ctx = canvas.getContext("2d");
/**
 * Queremos dibujar la pelota.
 * Comenzamos el dibujo con un beginPath
 * Creamos dos variables x e y
 * **/
var x = canvas.width/2;
var y = canvas.height - 10;

/**
 * Para el movimiento de la pelota, al x e y , deberiamos generar un diferencial
 * osea, agregar un pequeño x e y despues de que cada fotograma se haya dibujado para que represente que la pelota
 * se esta moviendo
 * Definimos dx y dy para modificar x e y
 * **/
var dx = 2;
var dy = -2; // -2 porque la pelota va de abajo hacia arriba

/** Generamos un Objeto pelota
 *
 *  Agrego atributos, luego agrego un metodo( dibujar )
 * **/
var pelota = {
    radio: 10,
    dibujar: function (){
        ctx.beginPath();
        ctx.arc(x, y, this.radio,0 , 2*Math.PI); // puede llegar a tener 5 parametros, si yo quiero la pelota dibujada a la mitad de x y de y, this.radio es el radio declarado, y la peota completa de 0 a 2*Math.PI
        ctx.fillStyle = "pink";// para asignarle un color
        ctx.fill(); // pintamos la pelota
        ctx.closePath(); // termino el path de dibujo
    }
};


/**
 * Movimiento de la Pelota
 *
 * canvas.width =canvas.width - Limpiamos el canvas
 * #Para que algo se dibuje repetitivamente cada cierto tiempo usamas al funcion setInterval()
 * **/


/**
 * Creamos un objeto para la barra
 * **/

var barra = {
    ancho: 75,
    alto: 10,
    posicionX: (canvas.width - 75) / 2,
    dibujar: function (){
        ctx.beginPath();
        ctx.fillRect(this.posicionX, 450, this.ancho, this.alto); // dibujamos el rectangulo
        ctx.fillStyle = "#dc7497";
        ctx.fill();
        ctx.closePath();
    }
};

/**
 *
 * Rebote de la pelota, anidand if
 *
 * Creamos condicion para el moviento de la barra
 * **/
function  dibujar(){
    canvas.width =canvas.width;

    if (x + dx < pelota.radio || x + dx > canvas.width-pelota.radio){
        dx =- dx;
    }
    if (y + dy < pelota.radio || y + dy > canvas.height-pelota.radio) {
        dy =- dy;
    }

    if (presionadoDerecho && barra.posicionX < canvas.width - barra.ancho){
        barra.posicionX += 7; // para que se mueva a la derecha
    } else if (presionadoIzquierdo && barra.posicionX > 0){
        barra.posicionX -= 7; // para moverse a la izquierda
    }

    pelota.dibujar();
    barra.dibujar();
    dibujarCuadroDeLadrillos();

    x = x + dx;
    y = y + dy;
}
setInterval(dibujar, 10);

/**
 *
 * Movemos la paleta
 * document.addEventListener - pulsado de teclas
 *
 * keyDownHandler - Al pulsar cualquier tecla la funcion se ejecutará
 * keyUpHandler - Caundo se libere el boton que se pulsó
 * **/

var presionadoDerecho  = false; // para decir que no va a estar presionado inicialmente
var presionadoIzquierdo = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event){
    if (event.keyCode === 39){ // verificamos boton derecho cuyo keycode es 39
        presionadoDerecho = true;
    } else if ( event.keyCode === 37 ){ // verificamos boton izquierdo cuyo keycode es 39
        presionadoIzquierdo = true;
    }
}

// para detectar cuando la tecla se presionó:

function keyUpHandler(event){
    if (event.keyCode === 39){
        presionadoDerecho = false;
    } else if ( event.keyCode === 37 ){
        presionadoIzquierdo = false;
    }
}

/**
 *
 * -Definimos un objeto ladrillo.
 * -Cremos un especie de cuadro donde guardaremos las filas y columnas de ladrillos
 * -Dibujamos el cuadro
 * **/

var ladrillo = {
    alto: 20,
    ancho:75,
};
var filas = 4;
var columnas = 4;
var espacio = 10;
var espacioDerecho = 30;
var espadioIzquierdo = 30;

// pasamos por las filas / columnas y creamos los ladrillos
var cuadroDLadrillos = [];
for (i = 0; i < columnas ; i++){
    cuadroDLadrillos[i] = [];
    for (j = 0; j < filas; j++){
        cuadroDLadrillos[i][j] = {x: 0, y: 0 };
    }
}

function dibujarCuadroDeLadrillos() {
    for (i = 0; i < columnas; i++) {
        for (j = 0; j < filas; j++) {
            cuadroDLadrillos[i][j].x = 0;
            cuadroDLadrillos[i][j].y = 0;
            var ladrilloX = (i * (ladrillo.ancho + espacio)) + espadioIzquierdo;
            var ladrilloY = (j * (ladrillo.alto + espacio)) + espacioDerecho;
            ctx.beginPath();
            ctx.fillRect(ladrilloX, ladrilloY, ladrillo.ancho, ladrillo.alto);
            ctx.fill();
            ctx.closePath();
        }
    }
}
