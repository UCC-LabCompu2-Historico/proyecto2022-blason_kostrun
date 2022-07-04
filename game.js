
/**
 *
 * Para comenzar a dibujar, creamos una variable canvas a la cual hacemos referencia con el document.getElementById
 * Creamos la variable context ctx para poder acceder a todas los metodos particulares del canvas
 * **/
//
//

/**
 *
 * Funcion destinada al mensaje que ve el usuario cuando ingresa en la pagina de juego
 * @method welcome
 *
 */
function welcome(){

    if ( localStorage.getItem( "firstLogin" )  == 1 ){
        window.alert('Su puntaje anterior fue: ' + localStorage.getItem("userScore") + '. Utilice las teclas < > para mover la barra. Aceptar para empezar ');
    } else {
        window.alert('Bienvenido ' + localStorage.getItem("userName") + '. Utilice las teclas < > para mover la barra. Aceptar para empezar ');
        localStorage.setItem( "firstLogin", 1 );
    }
}



var canvas = document.getElementById("lienzo");

var ctx = canvas.getContext("2d");

var vidas = 3;

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
        ctx.fillRect(this.posicionX, canvas.height - 10, this.ancho, this.alto); // dibujamos el rectangulo
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


    vidas = vidas;

    localStorage.setItem("vidasRemaining", vidas);
    if (x + dx < pelota.radio || x + dx > canvas.width - pelota.radio) {
        dx = -dx;
    }
    if (y + dy < pelota.radio) {
        dy = -dy;
    }
    if (y + dy > canvas.height - pelota.radio) {
        if (x > barra.posicionX && x < barra.ancho + barra.posicionX) {
            dy = -dy;
        }
        else {
            if ( vidas > 0 ){
                dy = -dy;
                vidas--;
                localStorage.setItem("vidasRemaining", vidas);
            } else if( vidas == 0 ){
                location.reload();
                alert("Perdiste");
            }
        }

    }

    if (presionadoDerecho && barra.posicionX < canvas.width - barra.ancho) {
        barra.posicionX += 7;           // para que se mueva a la derecha
    } else if (presionadoIzquierdo && barra.posicionX > 0) {
        barra.posicionX -= 7;           // para moverse a la izquierda
    }

    pelota.dibujar();
    barra.dibujar();
    puntaje.dibujar1();
    lifeBAR.dibujar1();
    colision();
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

/**
 * Definimos un objeto ladrillo y dibujamos el cuadro donde guardaremos las filas y columnas de ladrillos
 * @type {{ancho: number, alto: number}}
 */


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
for (var i = 0; i < columnas; i++) {
    cuadroDLadrillos[i] = [];
    for (var j = 0; j < filas; j++) {
        cuadroDLadrillos[i][j] = {x: 0, y: 0, status: 1};
    }
}




/**
 * Dibujamos el cuadro para los ladrillos
 * @method dibujarCuadroDeLadrillos
 *
 */
function dibujarCuadroDeLadrillos() {

    for (var h = 0; h < columnas; h++) {
        for (var m = 0; m < filas; m++) {
            if (cuadroDLadrillos[h][m].status == 1 ){

                var ladrilloX = (h * (ladrillo.ancho + espacio)) + espadioIzquierdo;
                var ladrilloY = (m * (ladrillo.alto + espacio)) + espacioDerecho;
                cuadroDLadrillos[h][m].x = ladrilloX;
                cuadroDLadrillos[h][m].y = ladrilloY;
                ctx.beginPath();
                ctx.fillRect(ladrilloX, ladrilloY, ladrillo.ancho, ladrillo.alto);
                ctx.fill();
                ctx.closePath();
            }

        }
    }
}
/**
 *  vaidamos los datos previamente ingresados por eso usuario
 * @method validar
 *
 * **/
function validar(){
    let nombre;

    const pattern = new RegExp('[a-zA-Z]');

    nombre = document.getElementById('nombre').value;
    localStorage.setItem("userName",nombre);
    if(localStorage.getItem("userName" != nombre)){
        localStorage.setItem("firstLogin", 0);
    }
    if ( nombre.length == "" ){
        alert( " Porfavor, Ingrese su nombre ");
    }
     else if (!pattern.test(nombre)){
        alert("Porfavor ingrese su nombre con letras unicamente");
        nombre = "";
    } else{
        window.open('./pagina1.html', "_self");
    }
}

/**
 *
 * Armamos la funcion para detectar la colision de la bola en los ladrillos
 * @method colision
 *
 */

function colision(){

    for(var c=0; c<columnas; c++) {
        for(var r=0; r<filas; r++) {
            var b = cuadroDLadrillos[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+ladrillo.ancho && y > b.y && y < b.y+ladrillo.alto) {
                    dy = -dy;
                    b.status = 0;
                    puntaje.puntos++;
                    localStorage.setItem("userScore" , puntaje.puntos); // almacenamos en el local storage el puntaje del jugador
                    if(puntaje.puntos == filas*columnas) {
                        alert("GANASTE, FELICITACIONES!");
                        location.reload();
                    }
                }
            }
        }
    }
}

/**
 *
 * @method dibujar1
 * @type {{dibujar1: lifeBAR.dibujar1}}
 *
 */
var lifeBAR = {

    dibujar1: function () {

        ctx.font = "16px Arial";
        ctx.fillStyle = "#dc7497";
        if (vidas == 3) {
            ctx.fillText("Vidas: ♥ ♥ ♥ ", canvas.width - 95, 20);
        } else if (vidas == 2) {
            ctx.fillText("Vidas: ♥ ♥ ", canvas.width - 95, 20);
        } else if (vidas == 1) {
            ctx.fillText("Vidas: ♥ ", canvas.width - 95, 20);
        } else {
            ctx.fillText("Vidas:   ☠  ", canvas.width - 95, 20);
        }
    },


}

/**
 * @method dibujar1
 * @type {{puntos: number, dibujar1: puntaje.dibujar1}}
 */

var puntaje = {
    puntos: 0,

    dibujar1: function (){
        ctx.font = "16px Arial";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("Puntaje:" +this.puntos, 30, 20);

    }
}

