function roll(d) {
    parseInt(Math.random() * d + 1)
}

let mod = 4
let vida = 100
let ca = 12

function atacar() {
    let dado = roll(20)
    if (dado + mod > ca) {
        //Acertou o ataque e deu dano
        let dano = roll(8) + mod
        vida -= dano
    } else {
        //Errou o ataque
    }
}