

export function crearEstados(){
    const estados = new Map()
    
    estados.set('Aturdido', 1) // STUNEADO POR 1 TURNO
    estados.set('Apuntando', 1) // DESBLOQUEA 'TIRO CERTERO' POR UN TURNO
    estados.set('Sangrando', 2) // -15% DE VIDA POR TURNO, POR 2 TURNOS
    estados.set('Durisimo', 2) // EVASION, VELOCIDAD, MULTICRITICO POR 2 TURNOS
    estados.set('+Blindaje', 2) // +50% BLINDAJE O +30 BLINDAJE POR 2 TURNOS
    estados.set('+ProbCritico', 2) // +25% PROBCRITICO POR 2 TURNOS
    return estados
}