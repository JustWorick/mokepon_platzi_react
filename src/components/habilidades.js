

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


    modificarCasterAndObjetivo(caster, objetivo) {
        this.caster = caster;
        this.objetivo = objetivo;
    }

    usarHabilidad() {
        if (this.caster && this.objetivo) {
            this.efecto(this.caster,this.objetivo);
        } else {
            console.error('Caster u objetivo no establecidos');
        }
    }
}

export function agregarHabilidades(globalHabilidades, habilidadesToLearn, invocacion){
    const skillsArray = habilidadesToLearn.map(id => globalHabilidades[id]);
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

function probCritico(caster){
    let num = getRandomNumber(0,100)
    if(num < caster.stats.probCritico){ 
        console.log('El Ataque Fue Critico');
        return true
    } else {
        console.log('El ataque no es critico');
        return false
    }
}

function probCriticoModificado(caster, aumentoCRIT){
    let num = getRandomNumber(0,100)
    if(num < (caster.stats.probCritico + aumentoCRIT)){
        console.log(`El Ataque Fue Critico, la probabilidad a superar es de: ${num} y la del caster es de: ${(caster.stats.probCritico + aumentoCRIT)} y antes era: ${caster.stats.probCritico}`);
        return true
    } else {
        console.log('El ataque no es critico');
        return false
    }
}

function probStun(){
    let num = getRandomNumber(0,100)
    if(num <= 15){
        console.log('El Enemigo se logro Aturdir');
        return true
    } else {
        console.log('El Aturdimiento Fallo');
        return false
    }
}

function getHistorial(caster, objetivo = '', exito = '', critico = '', estados = '') {
    return { caster, objetivo, exito, critico, estados };
}


export function crearHabilidades(){
    const hab1 = new Habilidad(0, 'Tajear', 'Cortante', Infinity, 'Corta a sus Enemigos con movimientos aprendio en cana, tiene posibilidad de golpear 2 veces',
        function(caster, objetivo) {
            console.log('========================================TAJEAR========================================');
            let exito = probExito(caster.stats.precision, 82, objetivo.stats.evasion)
            let numAtaques = 1;
            let critico = probCritico(caster)
            let damage = getRandomNumber(-12,-6)
            
            if(getRandomNumber(0,100) < 15) {
                console.log('Ataco De Nuevo')
                numAtaques++
            }
            for (let index = 0; index < numAtaques; index++) {
                if(exito === true){
                    console.log('damage Antes del Blindage : ' + damage);
                    if(critico === true) {
                        damage *= caster.stats.multiCritico
                        console.log('damage fue critico : ' + damage);
                    }
                    damage -= (damage * objetivo.stats.blindaje / 100)  
                    objetivo.modificarSalud(damage)
                    console.log('damage despues del blindage : ' + damage);
                    probSangrado(objetivo)
                    
                    console.log('Uso Tajear')  
                } else {
                    console.log('El ataque Fallo');
                }
                console.log('la vida actual del objetivo es : ' + objetivo.stats.saludActual);
            }

        })
    // const hab2 = new Habilidad(1, 'Cogotear', 'Cortante', Infinity, 'Ataca y tiene la probabilidad de bajar la defenza',
    //     () => {
    //         let exito = probExito(this.caster.stats.precision, 82, this.objetivo.stats.evasion)
    //         if(exito === true){
    //             let critico = probCritico(this.caster)

    //         }
    //     }
    // )
    const hab3 = new Habilidad(2, 'Intimidar', 'Normal', 2, 'Intenta intimidar a su oponente y baja su blindaje por 2 turnos',
        function(caster, objetivo){
            let exito = probExito(caster.stats.precision, 70, objetivo.stats.evasion)
            console.log('========================================INTIMIDAR========================================');

            if(exito === true){
                objetivo.estados.push('-defensa')
                console.log('El objetivo pierde Blindaje por 2 turnos, el blindaje actual del objetivo es: ' + objetivo.stats.blindaje);
            } else {
                console.log('Intimidar Fallo');
            }
        }
    )
    const hab4 = new Habilidad(3, 'Puñala Maletera', 'Perforante', Infinity, 'Intenta apuñalar a su enemigo cuando le pide la hora, tiene baja PRE pero mas P.CRIT',
        function(caster, objetivo){
            let exito = probExito(caster.stats.precision, 70, objetivo.stats.evasion)
            console.log('========================================PUÑALADA MALETERA========================================');

            if(exito === true){
                let critico = probCriticoModificado(caster, 30)
                let damage = getRandomNumber(-18,-10)

                if(critico === true){
                    damage *= caster.stats.multiCritico
                    console.log(`El ataque fue critico, el daño fue: ${damage}`);
                }
                
                console.log(`Blindaje del objetivo es: ${objetivo.stats.blindaje}`);
                console.log('damage Antes del Blindage : ' + damage);
                damage -= (damage * ((objetivo.stats.blindaje / 100) /2))  
                objetivo.modificarSalud(damage)
                console.log('damage despues del blindage : ' + damage); 
                
            } else{
                console.log('Puñalada Maletera Fallo');
            }
            
            console.log('la vida actual del objetivo es : ' + objetivo.stats.saludActual);  
        }
    )
    const hab5 = new Habilidad(4, 'Pastita llica', 'Pasta', 1, 'Se pega un Pipaso con lo que le compro a su amigo el Tadeo, aumenta BLIN, CRIT por 2 turnos y se cura una cantidad Aleatoria de Salud',
        function(caster, objetivo){
            let numCuracion = getRandomNumber(10,30)
            console.log('========================================PASTITA LLICA========================================');

            caster.modificarSalud(numCuracion)
            caster.estados.push('+Blindaje','+ProbCritico')
            console.log(`Los estados del Caster Son:`+ caster.estados);
            console.log('la vida actual del Caster es : ' + caster.stats.saludActual); 
        }
    )
    const hab6 = new Habilidad(5, 'Apuntar', 'Normal', Infinity, 'Apunta el revolver, Asegura "Tiro Preciso"',
        function(caster, objetivo){
            console.log('========================================APUNTAR========================================');
            caster.estados.push('Apuntando')
            console.log(`se añadio el estado de apuntado: ` + caster.estados); 
        }
    )
    const hab7 = new Habilidad(6, 'Tiro Preciso', 'Perforante', Infinity, 'Dispara asegurando un golpe Critico',
        function(caster, objetivo){
            let exito = probExito(caster.stats.precision, 150, objetivo.stats.evasion)
            console.log('========================================TIRO PRECISO========================================');
    
            if(exito === true){
                let critico = probCriticoModificado(caster, 100)
                let damage = getRandomNumber(-15,-8)

                if(critico === true){
                    damage *= caster.stats.multiCritico
                    console.log(`El ataque fue critico, el daño fue: ${damage}`);
                }
                
                console.log(`Blindaje del objetivo es: ${objetivo.stats.blindaje}`);
                console.log('damage Antes del Blindage : ' + damage);
                damage -= (damage * ((objetivo.stats.blindaje / 100) /2))  // Cuando es perforante el blindaje se divide por 2
                objetivo.modificarSalud(damage)
                console.log('damage despues del blindage : ' + damage); 
                
            } else{
                console.log('Tiro Preciso Fallo... de alguna manera ._.');
            }
            
            console.log('la vida actual del objetivo es : ' + objetivo.stats.saludActual); 

        }
    )
    const hab8 = new Habilidad(7, 'Lumazo Tactico', 'Contundente', Infinity, 'Golpeas a tu enemigo con un palo, Tiene chance',
        function(caster, objetivo){
            let exito = probExito(caster.stats.precision, 70, objetivo.stats.evasion)
            console.log('========================================Lumazo Tactico========================================');
            
            if(exito === true){
                let critico = probCriticoModificado(caster, 30)
                let damage = getRandomNumber(-12,-6)
                let stun = probStun()

                if(stun === true){
                    objetivo.estados.push('Aturdido')
                }

                if(critico === true){
                    damage *= caster.stats.multiCritico
                    console.log(`El ataque fue critico, el daño fue: ${damage}`);
                }
                
                console.log(`Blindaje del objetivo es: ${objetivo.stats.blindaje}`);
                console.log('damage Antes del Blindage : ' + damage);
                damage -= (damage * (objetivo.stats.blindaje / 100))  
                objetivo.modificarSalud(damage)
                console.log('damage despues del blindage : ' + damage); 
                
            } else{
                console.log('Lumazo Tactico Fallo');
            }
            
            console.log('la vida actual del objetivo es : ' + objetivo.stats.saludActual); 
        }
    )
    const hab9 = new Habilidad(8, 'Jale Medicinal', 'Merca', 2, 'Te "untas" una raya de "Mentholatum", aumenta EVA, VEL y M.CRIT',
        function(caster,objetivo){
            console.log('========================================Lumazo Tactico========================================');
            caster.estados.push('Durisimo')
            console.log('Los estados del personaje son: ' + caster.estados);
        }
    )
    const hab10 = new Habilidad(9, 'Disparo Rapido', 'Perforante', Infinity, 'Dispara sin apuntar, puede golpear varias veces, pero tiene baja PRE',
        function(caster, objetivo){
            let exito = probExito(caster.stats.precision, 82, objetivo.stats.evasion)
            let numAtaques = 1;
            console.log('=====================================DISPARO RAPIDO========================================');
            if(getRandomNumber(0,100) > 50) {
                console.log('Ataco De Nuevo')
                numAtaques++
            }
            for (let index = 0; index < numAtaques; index++) {
                if(exito === true){
                    let critico = probCritico(caster)
                    let damage = getRandomNumber(-10,-6)
                    console.log('damage Antes del Blindage : ' + damage);
                    if(critico === true) {
                        damage *= caster.stats.multiCritico
                        console.log('damage fue critico : ' + damage);
                    }
                    damage -= (damage * ((objetivo.stats.blindaje / 100)/2))  
                    objetivo.modificarSalud(damage)
                    console.log('damage despues del blindage : ' + damage);
                    
                    
                    console.log('Uso Disparo Rapido')  
                } else {
                    console.log('El ataque Fallo');
                }
                console.log('la vida actual del objetivo es : ' + objetivo.stats.saludActual);
            }
        }
    )
    // const hab10 = new Habilidad(9, 'Revisar Antecedentes', 'Normal', 1)
    // const hab11 = new Habilidad(10, 'Confiscar Sustancias', 'Normal', 1)
    // let habilidadesList = [hab1,hab2,hab3,hab4,hab5,hab6,hab7,hab8,hab9,hab10,hab11]
    let habilidadesList = [hab1,hab3,hab4,hab5,hab6,hab7,hab8,hab9,hab10]
    return habilidadesList;
}