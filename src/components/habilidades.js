

export class Habilidad{
    constructor(id, nombre, tipo, usos, descripcion, efecto){
        this.id = id
        this.nombre = nombre
        this.tipo = tipo // para despues 
        this.descripcion = descripcion
        this.dialogos = []
        this.usos = usos
        this.efecto = efecto.bind(this);
        this.caster = null;
        this.objetivo = null;
    }


    usarHabilidad(){
        if(this.caster != this.objetivo){  // significa que es una habilidad ofensiva
            this.efecto(this.objetivo)
        } else {
            this.efecto(this.caster)
        }
    }
}

export function agregarHabilidades(globalHabilidades, habilidadesToLearn, invocacion){
    //let skillsArray = []
    const skillsArray = habilidadesToLearn.map(id => globalHabilidades.get(id))
    // globalHabilidades.map((skill) => {
    //     habilidadesToLearn.forEach((id) => {
    //         if(skill.id === id){
    //             skillsArray.push(skill)
    //         } 
    //     } )
    // })
    invocacion.habilidades = skillsArray
}

export function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
function probSangrado(objetivo){
    let num = getRandomNumber(0,100)
     if(num < 15) {
        objetivo.estados.push('Sangrado')
     } else{
        console.log('No se logro el sangrado : ' + num);
     }
}

function probExito(casterPre, skillPre, evasionObjetivo){
    let precisionFinal = casterPre * skillPre / 100
    let numRandomEvasion = getRandomNumber(0,100)
    let numRandomGolpe = getRandomNumber(0,100)

    if(precisionFinal >= numRandomGolpe &&  evasionObjetivo < numRandomEvasion){
        console.log('el ataque tuvo exito');
        return true
    } else {
        return false
    }
}

function propCritico(caster){
    let num = getRandomNumber(0,100)
    if(num < caster.stats.propCritico){
        return true
    } else {
        console.log('El ataque no es critico');
        return false
    }
}

export function crearHabilidades(){
    const hab1 = new Habilidad(0, 'Tajear', 'Cortante', Infinity, 'Corta a sus Enemigos con movimientos que vio en peliculas, tiene posibilidad de golpear 2 veces',
        () => {
            let exito = probExito(this.caster.stats.precision, 82, this.objetivo.stats.evasion)
            let numAtaques = 1;
            if(getRandomNumber(0,100) < 10) {
                numAtaques++
            }
            for (let index = 0; index < numAtaques; index++) {
                if(exito === true){
                    let critico = propCritico(this.caster)
                    let damage = getRandomNumber(-12,-6)
                    if(critico === true) {
                        damage *= this.caster.stats.multiCritico
                    }
                    damage -= (damage * this.objetivo.stats.blindaje / 100)  
                    this.objetivo.stats.saludActual += damage
                    console.log(damage);
                    probSangrado(this.objetivo)
                } else {
                    console.log('El ataque Fallo');
                }
                console.log('Uso Tajear');
            }
        })
    const hab2 = new Habilidad(1, 'Cogotear', 'Cortante', Infinity, 'Ataca y tiene la probabilidad de bajar la defenza',
        () => {
            let exito = probExito(this.caster.stats.precision, 82, this.objetivo.stats.evasion)
            if(exito === true){
                let critico = propCritico(this.caster)

            }
        }
    )
    // const hab3 = new Habilidad(2, 'Intimidar', 'Normal', 3)
    // const hab4 = new Habilidad(3, 'Puñala Maletera', 'Perforante', Infinity)
    // const hab5 = new Habilidad(4, 'Pastita llica', 'Pasta', 3)
    // const hab6 = new Habilidad(5, 'Apuntar', 'Normal', Infinity)
    // const hab7 = new Habilidad(6, 'Tiro Preciso', 'Perforante', Infinity)
    // const hab8 = new Habilidad(7, 'Lumazo Tactico', 'Contundente', Infinity)
    // const hab9 = new Habilidad(8, 'Jale Medicinal', 'Merca', 3)
    // const hab10 = new Habilidad(9, 'Revisar Antecedentes', 'Normal', 1)
    // const hab11 = new Habilidad(10, 'Confiscar Sustancias', 'Normal', 1)
    // const hab12 = new Habilidad()
    // let habilidadesList = [hab1,hab2,hab3,hab4,hab5,hab6,hab7,hab8,hab9,hab10,hab11]
    let habilidadesList = [hab1,hab2]
    return habilidadesList;
}