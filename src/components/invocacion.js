import { getRandomNumber } from "./habilidades";

export class Invocacion {
    constructor(id, nombre, images, stats) {
      this.id = id;
      this.nombre = nombre;
      this.images = images;
      this.stats = stats;
      this.habilidades = [];
      this.estados = [];
    }

    modificarSalud(cantidad){
        if(this.stats.saludActual + cantidad > this.stats.saludMaxima){
            this.stats.saludActual = this.stats.saludMaxima
        }else if(this.stats.saludActual + cantidad < 0){
            this.stats.saludActual = 0
        }else {
            this.stats.saludActual += cantidad
        }
    }

    modificarIdRandom(){
        this.id = getRandomNumber(1,1000)
    }
    
}

const brayanImages = {
    imgChica: '../../assets/personajes/bayanChico.png',
    imgGrande: '../../assets/personajes/brayanGrande.png',
    imgPelea: 'src'
}
const caboRamirezImages = {
    imgChica: '../../assets/personajes/caboRamirezChico.png',
    imgGrande: '../../assets/personajes/caboRamirez.png',
    imgPelea: 'src'
}

const statsInvoIniciales = [
    {id:0, invocacion: 'Brayan', saludMaxima: 90, saludActual: 90, precision: 95, velocidad: 11, blindaje : 19, evasion: 16, probCritico: 12, multiCritico: 1.5},
    {id:1, invocacion: 'Ramirez', saludMaxima: 110, saludActual: 110, precision: 95, velocidad: 10, blindaje : 38, evasion: 8, probCritico: 6, multiCritico: 1.5}
]

export function crearInvocaciones(){
    let brayan = new Invocacion(0, 'Brayan Anuel', brayanImages, statsInvoIniciales[0])
    let paco = new Invocacion(1, 'Cabo Ramirez', caboRamirezImages, statsInvoIniciales[1])
    let invoList = [brayan, paco]
    return invoList
}

export function findInvocacionById(id, listaDeInvocaciones){
    let divInvoElegida = listaDeInvocaciones.find((element) => element.id === id)
    return divInvoElegida
}