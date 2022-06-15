//Para comenzar a dibujar, creamos una variable canvas a la cual hacemos referencia con el document.getElementById
//Creamos la variable context ctx para poder acceder a todas los metodos particulares del canvas

var canvas = document.getElementById("lienzo");
var ctx = canvas.getContext("2d");


//Al dibujar la bola creamos dos variables x e y, comenzamos el dibujo con beginPath

var x = canvas.width / 2;
var y = canvas.height - 10;


//Para lograr el movimiento de la bola, generamos un diferencial para x e y. Esto es agregar un pequeño x e y despues de
// que cada fotograma se haya dibujado, para asi representar el movimiento de la bola. Entonces definimos un dx, dy
// para modificar los valores originales x, y respectivamente.

var dx = 2;
var dy = -2;        // -2 porque la bola va de abajo hacia arriba


//Generamos un objeto bola, agregamos atributos y un metodo (dibujar)

var pelota = {
    radio: 10,

    /**
     * Dibuja la bola (asignamos color, tamaño)
     * @method dibujar
     *
     */

    dibujar: function () {
        ctx.beginPath();
        ctx.arc(x, y, this.radio, 0, 2 * Math.PI); // puede llegar a tener 5 parametros, si yo quiero la pelota dibujada a la mitad de x y de y, this.radio es el radio declarado, y la pelota completa de 0 a 2*Math.PI
        ctx.fillStyle = "pink";             // para asignarle un color
        ctx.fill();                         // pintamos la pelota
        ctx.closePath();                    // termino el path de dibujo
    }
};

//Movimiento de la bola
//canvas.width =canvas.width --> Limpiamos el canvas
//Para que algo se dibuje repetitivamente cada cierto tiempo usamos la función setInterval()


//Creamos un objeto para la barra (tamaño, color, forma)


var barra = {
    ancho: 75,
    alto: 10,
    posicionX: (canvas.width - 75) / 2,

    /**
     * Dibuja la barra con la que se dirige la bola(asignamos color, tamaño)
     * @method dibujar
     *
     */
    dibujar: function () {
        ctx.beginPath();
        ctx.fillRect(this.posicionX, 450, this.ancho, this.alto); // dibujamos el rectangulo
        ctx.fillStyle = "#dc7497";
        ctx.fill();
        ctx.closePath();
    }
};


//rebote de la pelota, anidand if
//Creamos condicion para el movimiento de la barra

/**
 * Se encarga de llamar a las demas funciones (para dibujar bola, barra, cuadro de ladrillos)
 * @method dibujar
 *
 */

function dibujar() {
    canvas.width = canvas.width;

    if (x + dx < pelota.radio || x + dx > canvas.width - pelota.radio) {
        dx = -dx;
    }
    if (y + dy < pelota.radio) {
        dy = -dy;
    }
    if (y + dy > canvas.height - pelota.radio) {
        if (x > barra.posicionX && x < barra.ancho + barra.posicionX) {
            dy = -dy;
        } else {
            alert("Perdiste");
        }

    }

    if (presionadoDerecho && barra.posicionX < canvas.width - barra.ancho) {
        barra.posicionX += 7;           // para que se mueva a la derecha
    } else if (presionadoIzquierdo && barra.posicionX > 0) {
        barra.posicionX -= 7;           // para moverse a la izquierda
    }

    pelota.dibujar();
    barra.dibujar();
    dibujarCuadroDeLadrillos();

    x = x + dx;
    y = y + dy;
}

setInterval(dibujar, 10);


/**
 * Movemos la barra
 *document.addEvenListener - pulsado de teclas
 *keyDownHandler - Al pulsar cualquier tecla la funcion se ejecutará
 *keyUpHandler - cuando se libere el boton pulsado
 **/

var presionadoDerecho = false;          // para decir que no va a estar presionado inicialmente
var presionadoIzquierdo = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/**
 *Ejecuta la funcion al pulsar una tecla
 *@method keyDownHandler
 *@param {//tipo de parametro} event-
 */

function keyDownHandler(event) {
    if (event.keyCode === 39) {           // verificamos boton derecho cuyo keycode es 39
        presionadoDerecho = true;
    } else if (event.keyCode === 37) {  // verificamos boton izquierdo cuyo keycode es 39
        presionadoIzquierdo = true;
    }
}

// para detectar cuando la tecla se presionó:

/**
 * Indica cuando la tecla ya no esta pulsada
 * @method keyUpHandler
 * @param event
 */


function keyUpHandler(event) {
    if (event.keyCode === 39) {
        presionadoDerecho = false;
    } else if (event.keyCode === 37) {
        presionadoIzquierdo = false;
    }
}

//Definimos un objeto ladrillo y dibujamos el cuadro donde guardaremos las filas y columnas de ladrillos

var ladrillo = {
    alto: 20,
    ancho: 75,
};
var filas = 4;
var columnas = 4;
var espacio = 10;
var espacioDerecho = 30;
var espadioIzquierdo = 30;

//Pasamos por las filas / columnas y creamos los ladrillos
var cuadroDLadrillos = [];
for (i = 0; i < columnas; i++) {
    cuadroDLadrillos[i] = [];
    for (j = 0; j < filas; j++) {
        cuadroDLadrillos[i][j] = {x: 0, y: 0};
    }
}


/**
 * Dibujamos el cuadro para los ladrillos
 * @method dibujarCuadroDeLadrillos
 *
 */
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

function validar(){
    let nombre;
    const pattern = new RegExp('[a-zA-Z]');

    nombre = document.getElementById('nombre').value;
    if (!pattern.test(nombre)){
        alert("Porfavor ingrese su nombre con letras unicamente");
        nombre = "";
    } else{
        window.open('./pagina1.html');
    }
}


