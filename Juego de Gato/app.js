const tache = document.createElement('img');
tache.src = "tache.png";

const circulo = document.createElement('img');
circulo.src = "circulo.png";

const celdas = document.querySelectorAll('#Gato td');
const mensajeEstado = document.getElementById('status');
const botonReiniciar = document.getElementById('resetButton');
const radioJugador1 = document.getElementById('Jugador1');
const radioJugador2 = document.getElementById('Jugador2');

let juegoActivo = false;
let jugadorActual = 'X';
let tablero = ['', '', '', '', '', '', '', '', ''];

const condicionesVictoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function iniciarJuego() {
    jugadorActual = radioJugador1.checked ? 'X' : 'O';
    
    juegoActivo = true;
    tablero = ['', '', '', '', '', '', '', '', ''];
    mensajeEstado.textContent = `Turno del Jugador ${jugadorActual}`;

    celdas.forEach(celda => {
        celda.innerHTML = '';
    });
}

function manejarClicCelda(evento) {
    const celdaClickeada = evento.target;
    
    const indiceCeldaClickeada = parseInt(celdaClickeada.id) - 1;

    if (tablero[indiceCeldaClickeada] !== '' || !juegoActivo) {
        return;
    }

    colocarMarca(celdaClickeada, indiceCeldaClickeada);
    
    if (revisarVictoria()) {
        mensajeEstado.textContent = `¡El Jugador ${jugadorActual} ha ganado!`;
        juegoActivo = false;
    } else if (revisarEmpate()) {
        mensajeEstado.textContent = '¡Es un empate!';
        juegoActivo = false;
    } else {
        cambiarJugador();
    }
}

function colocarMarca(celda, indice) {
    tablero[indice] = jugadorActual;
    const imagenAColocar = (jugadorActual === 'X') ? tache.cloneNode(true) : circulo.cloneNode(true);
    celda.appendChild(imagenAColocar);
}

function cambiarJugador() {
    jugadorActual = (jugadorActual === 'X') ? 'O' : 'X';
    mensajeEstado.textContent = `Turno del Jugador ${jugadorActual}`;
}

function revisarVictoria() {
    for (let i = 0; i < condicionesVictoria.length; i++) {
        const condicion = condicionesVictoria[i];
        const a = tablero[condicion[0]];
        const b = tablero[condicion[1]];
        const c = tablero[condicion[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            return true;
        }
    }
    return false;
}

function revisarEmpate() {
    return !tablero.includes('');
}

botonReiniciar.addEventListener('click', iniciarJuego);

celdas.forEach(celda => {
    celda.addEventListener('click', manejarClicCelda);
});

iniciarJuego();