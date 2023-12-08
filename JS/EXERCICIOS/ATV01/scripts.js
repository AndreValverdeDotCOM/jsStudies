function carregar(){
    var body = document.getElementById('body')
    var msg = document.getElementById('msg')
    var img = document.getElementById('img')

    var data = new Date()
    var hora = data.getHours()
    var minutos = data.getMinutes()
    var segundos = data.getSeconds()
    msg.innerHTML = `Agora são exatamente ${hora}:${minutos}:${segundos}`

    if(hora >= 0 && hora <12){
        //Bom dia
        img.src='/EXERCICIOS/ATV01/IMG/dia.jpg'
        body.style.backgroundColor = 'rgba(232, 198, 143,0.7)'
    } else if (hora >=12 && hora < 18){
        //Boa tarde
        img.src='/EXERCICIOS/ATV01/IMG/tarde.jpg'
        body.style.backgroundColor = 'rgba(118, 93, 107,0.7)' 
    } else{
        //Boa Noite
        img.src='/EXERCICIOS/ATV01/IMG/noite.jpg'
        body.style.backgroundColor = 'rgba(48, 60, 66,0.7)' 
    }
}


