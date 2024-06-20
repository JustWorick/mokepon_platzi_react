

export class Invocacion {
    constructor(id, nombre, tipo, img, vida) {
      this.id = id;
      this.nombre = nombre;
      this.tipo = tipo;
      this.img = img;
      this.vidaMaxima = vida;
      this.vidaActual = null;
    }

    modificarVida(vida){
        this.vida += vida
    }
}

export function crearInvocaciones(){
    let brayan = new Invocacion(0, 'Brayan Anuel', 'pastero', 'src', 90)
    let paco = new Invocacion(1, 'Cabo Ramirez', 'jalero', 'src', 110)
    let invoList = [brayan, paco]
    return invoList
}