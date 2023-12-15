function calcular(){
    var tab = document.getElementById('res')
    var txtN = document.getElementById('txtNumero')

    if(txtN.value.length == 0){
        window.alert('[ERRO] Digite um valor para calcular a tabuada')
    } else{
        let n =Number(txtN.value)
        tab.innerHTML = ''
        for(var i = 1; i<=10; i++){
            let item = document.createElement('option')
            item.text = `${n} X ${i} = ${n*i}`
            item.value =`tab${i}`
            tab.appendChild(item)
        }
    }
    
}