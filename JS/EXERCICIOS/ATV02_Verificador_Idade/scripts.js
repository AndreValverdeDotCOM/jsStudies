function verificar() {
    var data = new Date()
    var ano = data.getFullYear()
    var fano = document.getElementById('txtAno')
    var res = document.querySelector('div#res')

    if (fano.value.length == 0 || fano.value > ano) {
        window.alert('Verifique os dados e tente novamente')
    }
    else {
        var fsex = document.getElementsByName('radSex')
        var idade = ano - Number(fano.value)
        var sexo = ''
        var img = document.createElement('img')
        img.setAttribute('id', 'foto')



        if (fsex[0].checked) {
            sexo = 'homem'
        }
        else {
            sexo = 'mulher'
        }

        var idadeImg = ''



        if (idade >= 0 && idade < 10) {
            idadeImg = 'crianca'
        } else if (idade >= 10 && idade < 21) {
            idadeImg = 'jovem'
        } else if (idade >= 21 && idade < 50) {
            idadeImg = 'adulto'
        } else {
            idadeImg = 'idoso'
        }

        var texto = `/EXERCICIOS/ATV02_Verificador_Idade/IMG/${sexo}_${idadeImg}.jpg`
        img.setAttribute('src', texto)


        
        res.style.textAlign = 'center'
        res.innerHTML = `Detectamos: ${sexo} com ${idade} anos<br><br>`
        res.appendChild(img)
        
    }
}