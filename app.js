let palabrita;
let cant_errores = 0;
let cant_aciertos = 0;

/**array de palabras */

const palabras = [
    'manzana', /*0*/
    'camiseta',/*1*/
    'caramelo', /*2*/
    'facebook', /*3*/
    'google'/*4*/
];

const btn = id('jugar');
const imagen = id ('imagen');
const btn_letras = document.querySelectorAll("#letras button");

/*click iniciar juego*/
btn.addEventListener('click', iniciar);

function id(str){ /*funcion para los getElementID*/
    return document.getElementById(str);
}


function obtenerRandom (num_min, num_max){
    const amplitud_valores = num_max - num_min;
    const valor_azar = Math.floor (Math.random( ) * amplitud_valores)/*random para redeondear, amplitud para que en vaya esta la dif del ultimo y el prime*/
     + num_min;
     return  valor_azar;
}

function iniciar(event){ /*para que busque entre 0 y 4*/
    imagen.src = 'img/img0.png'; /**para que cuando arranque el juego se restablezca img */
    btn.disabled = true;  /**esto es para que no se desactive una vez clickeado */
    cant_errores = 0;
    cant_aciertos = 0;
    const parrafo = id('palabra_a_adivinar');
    parrafo.innerHTML = '';
    const cant_palabras = palabras.length;
    const valor_azar = obtenerRandom(0, cant_palabras);
    palabrita = palabras[valor_azar]; 
    console.log(palabrita);
    const cant_letras = palabrita.length;

    for (let i = 0; i< btn_letras.length; i++){
        btn_letras[i].disabled = false;
    }

    for (let i=0; i < cant_letras; i++){ /**para crear spam */
        const span  = document.createElement( 'span' ); 
        parrafo.appendChild(span);
    }
}

    for (let i = 0; i< btn_letras.length; i++){
    btn_letras[i].addEventListener('click', click_letras);
    }

function click_letras (event){
    const spans = document.querySelectorAll('#palabra_a_adivinar span'); /*que busque todos los span dentro del id*/
    const button = event.target; /*a la variable le asigo el target de ese evento*/
    button.disabled = true /*activo el boton*/
    
    const letra = button.innerHTML;
    const palabra = palabrita.toLowerCase();

    let acierto = false
    for (let i = 0; i< palabra.length; i++){ /*bucle pora recorrer la palabra e ir comparando*/
        if (letra == palabra [i]){ //la variable i es la posicion de la letra en palabra
                                    //que coincide con el span al que hay que mostrar la letra
            spans[i].innerHTML = letra;
            cant_aciertos++;                        
            acierto = true;
        }

        
    }
    if (acierto == false){
        cant_errores++;
        const source = `img/img${cant_errores}.png`;
        const imagen = id ('imagen');
        imagen.src = source;
    }

    if (cant_errores == 7){
        id('resultado').innerHTML = "Perdiste, la palabra era: " + palabrita;
        gameOver();
    }else if (cant_aciertos == palabrita.length){
        id('resultado').innerHTML = "Ganaste ";
        gameOver ();

    }


    console.log("La letra "+ letra + " en la palabra" + palabra + " ¿existe?:" + acierto);
}


/*fin del juego*/
function gameOver () {
    for (let i = 0; i< btn_letras.length; i++){
        btn_letras[i].disabled = true;
    }
    btn.disabled = false;
}