

export class Jugador {
    constructor (nombre){
        this.nombre = nombre;
        this.invocacionesJugador = [];
        this.invocacionElegida = null;
        this.items = null;
        this.dinero = null;
    }

    modificarNombre(newNombre){
        this.nombre = newNombre
    }

    addInvocaciones(invocacion){
        this.invocacionesJugador.push(invocacion)
    }

    modificarInvocacionElegida(invocacion){
        this.invocacionElegida = invocacion;
    }
}