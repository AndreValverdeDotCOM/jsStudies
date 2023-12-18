let numeros = []


function registrar() {
    let num = document.getElementById('txtN')
    let n = Number(num.value)
    let res = document.getElementById('res')
    let tab = document.getElementById('tbNumeros')

    if (num.value.length == 0 || n < 1 || n > 100 || numeros.includes(n)) {
        window.alert("[ERRO] Número inválido ou já registrado")
    } else {
        tab.innerHTML = ''
        numeros.push(n)
        let tb = document.createElement('select')
        tb.setAttribute('id', 'tab')
        tb.setAttribute('size','10')
        tab.appendChild(tb)

        numeros.sort()
        for (var i = 0; i < numeros.length; i++) {
            let item = document.createElement('option')
            item.text = `Número ${numeros[i]} registrado`
            item.value = `num${numeros[i]}`
            tb.appendChild(item)
        }


        let soma = numeros.reduce((total, valor) => total + valor)
        let media = soma/numeros.length

        res.innerHTML = 
        `Ao todo, temos ${numeros.length} itens registrados <br>
        O maior valor informado foi ${Math.max(...numeros)} <br>
        O menor valor informado foi ${Math.min(...numeros)} <br>
        A soma de todos os valores é ${soma} <br>
        A média de todos os valores é ${media}`
    }
}


function resetar() {
    let per = document.getElementById('tbNumeros')
    numeros.splice(0, numeros.length);

    per.innerHTML=''
    res.innerHTML = ''
    
}