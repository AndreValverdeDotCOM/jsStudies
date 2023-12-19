import { Atributes } from "./entities/Atributes.mjs"

class personagem {
    constructor(Des, For, Con, Car, Int, Sab) {
        this.des = new Atributes('Des', Des)
        this.for = new Atributes('For', For)
        this.con = new Atributes('Con', Con)
        this.car = new Atributes('Car', Car)
        this.int = new Atributes('Int', Int)
        this.sab = new Atributes('Sab', Sab)
    }
}

let res = document.getElementById('res')
let koda = new personagem(10, 12, 15, 20, 13, 9)

console.log(koda.car.Mod())



/* A se pensar

* progressão de batalha 
    - Mudança de turno
    - Atacar alguem

* Relacionamento armaXpersonagem
    - método atacar
    - select o mod do jogador
    - select o dado de dano da arma

    */