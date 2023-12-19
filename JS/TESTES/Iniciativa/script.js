function roll(x) {
    return parseInt(Math.random() * x + 1)
}

class Personagem {
    constructor(nome, iniciativa) {
        this.nome = String(nome)
        this.iniciativa = Number(iniciativa)
    }
}
var num = 1
const ordem = []

function addParagraphAndInput() {
    var personagem = new Personagem("Personagem: " + num, roll(5))
    ordem.push({ nome: personagem.nome, iniciativa: Number(personagem.iniciativa) })

    // Cria um novo parágrafo NOME
    var pNome = document.createElement("p");
    var pText = document.createTextNode(personagem.nome);
    pNome.appendChild(pText);
    pNome.id = "n" + num

    // Cria um novo parágrafo INICIATIVA
    var pINICIATIVA = document.createElement("p");
    var pText = document.createTextNode(personagem.iniciativa);
    pINICIATIVA.appendChild(pText);
    pINICIATIVA.id = "i" + num

    // Adiciona o novo parágrafo à div
    var div = document.getElementById("myDiv");
    div.appendChild(pNome);
    div.appendChild(pINICIATIVA);


    //Adiciona o atributo 'valorIniciativa' para cada personagem no Array ordem, sendo o valor dele = roll(20) + perso.iniciativa
    ordem.forEach(perso => {
        perso['valorIniciativa'] = roll(20) + perso.iniciativa
    })

    num++
}

// ordena o Array ordem e, caso o 'valorIniciativa' de a e b seja iguais, eles rodam o valor novamente e armazena em um novo atributo 'desempate'

function compare(a, b) {
    if (a.valorIniciativa < b.valorIniciativa){
        return -1
    }        
    else if (a.valorIniciativa > b.valorIniciativa){
        return 1;
    }
    else if (a.valorIniciativa == b.valorIniciativa) {
        a['desempate'] = roll(20) + a.iniciativa
        b['desempate'] = roll(20) + b.iniciativa

        if (a.desempate < b.desempate){
            return -1;}
        else if (a.desempate > b.desempate){
            return 1;}
    }
}


function ordenar() {


    document.getElementById("ordem").innerHTML = ''

    /*for(i in ordem){
        let ordenado = ordem.sort((c1, c2) => (c1.iniciativa < c2.iniciativa) ? 1 : (c1.iniciativa > c2.iniciativa) ? -1 : 0);
    }*/

    //ordem.sort()

    ordem.sort(compare)
    ordem.reverse()

    /*ordem.sort(function(a, b) {
     return b.valor - a.valor;
    });*/

    for (i in ordem) {
        document.getElementById("ordem").innerHTML += `Valor rodado: ${ordem[i].valorIniciativa} - ${ordem[i].nome} - VALOR DESEMPATE: ${ordem[i].desempate}<br>`
    }

}

// Adiciona um listener de evento ao botão
var button = document.getElementById("myButton");
button.addEventListener("click", addParagraphAndInput);