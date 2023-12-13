function verificar(){
    var inicio = document.getElementById('txtInicio').value
    var final = document.getElementById('txtFinal').value
    var intervalo = document.getElementById('txtIntervalo').value
    var res = document.getElementById('resposta')

    res.innerHTML = ''

    if(inicio.length == 0 || final.length == 0 || intervalo.length == 0){
        //window.alert('[ERRO] Preencha todos os campos para calcular')
        res.innerHTML ='IMPOSSÍVEL CONTAR'
        res.style.color = 'crimson'
    }
    else{
        var inicio = Number(inicio)
        var final =Number(final)
        var intervalo = Number(intervalo)

       if(intervalo <= 0){
            res.style.color = 'crimson'
            res.innerHTML = '[ERRO] Intervalo não pode MENOR ou IGUAL a 0, considerando Intervalo igual a 1 <br>'
            //window.alert('[ERRO] Intervalo não pode MENOR ou IGUAL a 0, considerando Intervalo igual a 1')
            intervalo = 1
       }
        if(inicio<final){
            res.style.color = 'black'
            while(inicio < final){
                res.innerHTML += `${inicio}  \u{1F449}  `
                inicio += intervalo
            }
            res.innerHTML += `\u{1F3C1}`
        }
        else if(inicio > final){
            res.style.color = 'black'
            while(inicio > final){
                res.innerHTML += `${inicio}  \u{1F449}  `
                inicio -= intervalo
            }
            res.innerHTML += `\u{1F3C1}`
        }

    }
}
