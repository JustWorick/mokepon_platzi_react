

export class Invocacion {
    constructor(id, nombre, tipo, imgChica, imgGrande, imgPelea, vida) {
      this.id = id;
      this.nombre = nombre;
      this.tipo = tipo;
      this.imgChica = imgChica;
      this.imgGrande = imgGrande;
      this.imgPelea = imgPelea;
      this.vidaMaxima = vida;
      this.vidaActual = null;
    }

    modificarVida(vida){
        this.vida += vida
    }
}

export function crearInvocaciones(){
    let brayan = new Invocacion(0, 'Brayan Anuel', 'pastero', '../../public/assets/personajes/bayanChico.png', '../../public/assets/personajes/brayanGrande.png', 'src', 90)
    let paco = new Invocacion(1, 'Cabo Ramirez', 'jalero', '../../public/assets/personajes/caboRamirezChico.png', '../../public/assets/personajes/caboRamirez.png', 'src', 110)
    let invoList = [brayan, paco]
    return invoList
}

export function findInvocacionById(id, contextoGlobal){
    let divInvoElegida = contextoGlobal.find((element) => element.id === id)
    return divInvoElegida
}