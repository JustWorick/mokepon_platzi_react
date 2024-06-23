

export class Invocacion {
    constructor(id, nombre, images, stats) {
      this.id = id;
      this.nombre = nombre;
      this.images = images;
      this.stats = stats;
      this.habilidades = [];
      this.estados = [];
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
    {id:0, invocacion: 'Brayan', saludMaxima: 90, saludActual: null, precision: 95, velocidad: 10, blindaje : 9, evasion: 16, probCritico: 12, multiCritico: 1.1},
    {id:1, invocacion: 'Ramirez', saludMaxima: 110, saludActual: null, precision: 95, velocidad: 10, blindaje : 18, evasion: 8, probCritico: 6, multiCritico: 1.1}
]

export function crearInvocaciones(){
    let brayan = new Invocacion(0, 'Brayan Anuel', brayanImages, statsInvoIniciales[0])
    let bairon = new Invocacion(1, 'Bairon', brayanImages, statsInvoIniciales[0])
    let kevin = new Invocacion(2, 'Kevin', brayanImages, statsInvoIniciales[0])
    let paco = new Invocacion(3, 'Cabo Ramirez', caboRamirezImages, statsInvoIniciales[1])
    let invoList = [brayan, bairon, kevin, paco]
    return invoList
}

export function findInvocacionById(id, contextoGlobal){
    let divInvoElegida = contextoGlobal.find((element) => element.id === id)
    return divInvoElegida
}