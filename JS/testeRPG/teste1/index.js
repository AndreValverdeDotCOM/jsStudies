function roll(d) {
    return parseInt(Math.random() * d + 1)
}

class Atributes {
    #Mod
    constructor(tipo, valor) {
        this.Tipo = tipo
        this.Valor = Number(valor)
        this.#Mod = (this.Valor - 10) / 2
    }

    get Mod() {
        const rMod = this.#Mod
        return rMod
    }
}

class Personagem {
    #nome
    #life
    #ac
    constructor(nome, Des, For, Con, Car, Int, Sab) {
        this.#nome = nome
        this.des = new Atributes('Des', Des)
        this.for = new Atributes('For', For)
        this.con = new Atributes('Con', Con)
        this.car = new Atributes('Car', Car)
        this.int = new Atributes('Int', Int)
        this.sab = new Atributes('Sab', Sab)
        this.#life = roll(60) + 20
        this.#ac = roll(10) + 8
    }

    get life() {
        const rlife = this.#life
        return rlife
    }
    set life(newValue) {
        this.#life = newValue
    }

    get ac() {
        const rac = this.#ac
        return rac
    }

    attack(enemy) {
        const dice = roll(20)
        if (dice + this.des.Mod() > enemy.ac()) {
            //Successful attack
            const damage = roll(8)
            enemy.life(enemy.life() -= (damage + des.Mod()))

            return `Dano causado: ${damage + this.des.Mod()}<br>
            Dado arma: ${damage}<br>
            Mod: ${this.des.Mod()}`
        }
    }
}

var num = 1
const ordem = []

function addPersonagem() {
    var personagem = new Personagem("Personagem: " + num, roll(10) + 8, roll(10) + 8, roll(10) + 8, roll(10) + 8, roll(10) + 8, roll(10) + 8)
    ordem.push({ nome: personagem.nome, iniciativa: Number(personagem.des.Mod) })

    // Cria um novo parágrafo NOME
    var pNome = document.createElement("p");
    var pText = document.createTextNode(personagem.nome);
    pNome.appendChild(pText);
    pNome.id = "n" + num

    // Cria um novo parágrafo INICIATIVA
    var pINICIATIVA = document.createElement("p");
    var pText = document.createTextNode(personagem.des.Mod);
    pINICIATIVA.appendChild(pText);
    pINICIATIVA.id = "i" + num

    // Adiciona o novo parágrafo à div
    var div = document.getElementById("myDiv");
    div.appendChild(pNome);
    div.appendChild(pINICIATIVA);


    //Adiciona o atributo 'valorIniciativa' para cada personagem no Array ordem, sendo o valor dele = roll(20) + perso.iniciativa
    ordem.forEach(perso => {
        perso['valorIniciativa'] = roll(20) + perso.des.Mod
    })

    num++
}

function compare(a, b) {
    if (a.valorIniciativa < b.valorIniciativa) {
        return -1
    }
    else if (a.valorIniciativa > b.valorIniciativa) {
        return 1;
    }
    else if (a.valorIniciativa == b.valorIniciativa) {
        a['desempate'] = roll(20) + a.des.Mod
        b['desempate'] = roll(20) + b.des.Mod

        if (a.desempate < b.desempate) {
            return -1;
        }
        else if (a.desempate > b.desempate) {
            return 1;
        }
    }
}

function ordenar() {


    document.getElementById("ordem").innerHTML = ''

    ordem.sort(compare)
    ordem.reverse()

    for (i in ordem) {
        document.getElementById("ordem").innerHTML += `Valor rodado: ${ordem[i].valorIniciativa} - ${ordem[i].nome} - VALOR DESEMPATE: ${ordem[i].desempate}<br>`
    }
}

var button = document.getElementById("myButton");
button.addEventListener("click", addPersonagem);