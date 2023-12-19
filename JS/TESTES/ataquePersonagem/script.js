function roll(d) {
    return parseInt(Math.random() * d + 1)
}

let ca = 12           //document.getElementById("ca").innerText

class Personagem {
    constructor(forc, des, con, inte, sab, car) {
        this.for = parseInt(forc)
        this.dest = parseInt(des)
        this.con = parseInt(con)
        this.inte = parseInt(inte)
        this.sab = parseInt(sab)
        this.car = parseInt(car)
    }
    atacar(dest) {
        let d = roll(20)
        if (d + dest >= ca) {
            let danoArma = roll(8)
            let danoCausado = danoArma + dest
            document.getElementById("resultado").innerText = `Causou ${danoCausado}`
        }
        else {
            document.getElementById("resultado").innerText = `Errou o ataque
                Total: ${d + dest}
                Dado: ${d}
                Mod: ${dest}`
        }
    }
}

function click(){
    
}

const koda = new Personagem(-1, 4, 0, 1, 1, 5)
    const showAtq = document.getElementById("btnAtacar").onclick(koda.atacar(koda.dest))
    console.log(showAtq)