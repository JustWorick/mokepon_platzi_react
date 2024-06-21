

export class Habilidad{
    constructor(id, nombre, tipo, usos, efecto){
        this.id = id
        this.nombre = nombre
        this.tipo = tipo // para despues 
        this.dialogos = []
        this.usos = usos
        this.efecto = efecto;
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

    agregarHabilidades(globalHabilidades, idList){
        let skillsArray = []

        globalHabilidades.map((skill) => {
            for(i=0; i-)  
        })
        
    }
}

export function crearHabilidades(){
    const hab1 = new Habilidad(0, 'Tajear', 'Cortante', Infinity)
    const hab2 = new Habilidad(1, 'Intimidar', 'Normal', 3)
    const hab4 = new Habilidad(2, 'Puñala Maletera', 'Perforante', Infinity)
    const hab3 = new Habilidad(3, 'Pastita llica', 'Pasta', 3)
    const hab5 = new Habilidad(4, '')
    const hab6 = new Habilidad()
    const hab7 = new Habilidad()
    const hab8 = new Habilidad()
    let habilidadesList = [hab1,hab2,hab3,hab4,hab5,hab6,hab7,hab8]
    return habilidadesList;
}