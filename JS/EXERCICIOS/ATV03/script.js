function verificar(){
    var inicio = document.getElementById('txtInicio').value
    var final = document.getElementById('txtFinal').value
    var intervalo = document.getElementById('txtIntervalo').value
    var res = document.querySelector('div#resposta')
    res.innerHTML = ''

    if(inicio.lenght == 0 || final.lenght == 0 || intervalo.lenght == 0){
        //window.alert('[ERRO] Preencha todos os campos para calcular')
        res.innerHTML ='IMPOSSÍVEL CONTAR'
    }
    else{
        var inicio = Number(inicio)
        var final =Number(final)
        var intervalo = Number(intervalo)

       if(intervalo <= 0){
            res.innerHTML = '[ERRO] Intervalo não pode MENOR ou IGUAL a 0, considerando Intervalo igual a 1 <br>'
            //window.alert('[ERRO] Intervalo não pode MENOR ou IGUAL a 0, considerando Intervalo igual a 1')
            intervalo = 1
       }
        if(inicio<final){
            while(inicio < final){
                res.innerHTML += `${inicio}  \u{1F449}  `
                inicio += intervalo
            }
            res.innerHTML += `\u{1F3C1}`
        }
        else if(inicio > final){
            while(inicio > final){
                res.innerHTML += `${inicio}  \u{1F449}  `
                inicio -= intervalo
            }
            res.innerHTML += `\u{1F3C1}`
        }

    }
}