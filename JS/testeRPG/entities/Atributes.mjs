export class Atributes {
    #Mod
    constructor(tipo, valor) {
        this.Tipo = tipo
        this.Valor = Number(valor)
        this.#Mod = (this.Valor - 10) / 2
    }

    get Mod(){
        const rMod = this.#Mod
        return rMod
    }
}