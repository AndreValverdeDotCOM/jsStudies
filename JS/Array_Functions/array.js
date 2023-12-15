let vaga = [0, 4, 7, 8]

// armazena o valor '5' no índice '4'
vaga[4] = 5

//Cria um espaço a mais no array e armazena o valor '7'
vaga.push(7)

//Quantidade de elementos no array
vaga.length

//Ordena em ordem crescente
vaga.sort()

//Índice do valor '4'
vaga.indexOf(4)

for (let i = 0; i <= vaga.length; i++) {
    console.log(vaga[i])
}


for (let pos in vaga) {
    console.log(vaga[pos])
}
