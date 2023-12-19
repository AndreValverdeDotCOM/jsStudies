let numeros = []
let num = document.getElementById('txtN')
let res = document.getElementById('res')
let tab = document.getElementById('tbNumeros')

function isNumero(n) {
    if (Number(n) >= 1 && Number(n) <= 100) {
        return true
    } else {
        return false
    }
}

function inLista(n, l) {
    if (l.indexOf(Number(n)) != -1) {
        return true
    } else {
        return false
    }
}

function registrar() {
    if (isNumero(num.value) && !inLista(num.value, numeros)) {
        tab.innerHTML = ''
        numeros.push(Number(num.value))

        let tb = document.createElement('select')
        tb.setAttribute('id', 'tab')
        tb.setAttribute('size', '10')
        tab.appendChild(tb)

        numeros.sort()

        let tot = numeros.length
        let menor = numeros[0]
        let maior = numeros[0]
        let soma = 0
        let media = 0

        for (let pos in numeros) {

            let item = document.createElement('option')
            item.text = `Número ${numeros[pos]} registrado`
            item.value = `num${numeros[pos]}`
            tb.appendChild(item)

            soma += numeros[pos]

            if (numeros[pos] > maior)
                maior = numeros[pos]
            if (numeros[pos] < menor)
                menor = numeros[pos]
        }

        media = soma / tot

        res.innerHTML =
            `Ao todo, temos ${tot} itens registrados <br>
        O maior valor informado foi ${maior} <br>
        O menor valor informado foi ${menor} <br>
        A soma de todos os valores é ${soma} <br>
        A média de todos os valores é ${media}`

    } else {
        window.alert("[ERRO] Número inválido ou já registrado")
    }
    num.value = ''
    num.focus()
}


function resetar() {
    let per = document.getElementById('tbNumeros')
    numeros.splice(0, numeros.length);

    per.innerHTML = ''
    res.innerHTML = ''

}