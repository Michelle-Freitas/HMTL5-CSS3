//VARIAVEIS CONTAGEM
const contador = document.querySelector('#contagem')
let btnResetar = document.querySelector('#btnResetar')
let btnPausar = document.querySelector('#btnPausar')
let formRadio = document.querySelector('#formRadio')
let formDigitar = document.querySelector('#formDigitar')


let segundos = 59
var horas = 0

//VARIAVEIS CRONOMETRO
const cronometro = document.querySelector('#timer')
let btnResetarTimer = document.querySelector('#btnResetarTimer')
let btnPausarTimer = document.querySelector('#btnPausarTimer')

let horaTimer = minTimer = 0
let segTimer = 1
cronometro.innerHTML = ` ${horaTimer} : ${minTimer} : ${00} `


//FUNÇÕES CONTAGEM

function Iniciar(){
    if (document.querySelector('input[name="opcao"]:checked')){
        ContagemRadio()
    } else {
        const horaDigitada = document.querySelector('#hora')
        const minutoDigitado = document.querySelector('#minuto')
        const segundoDigitado = document.querySelector('#segundo')

        if (horaDigitada.value == 0 && minutoDigitado.value == 0 && segundoDigitado.value == 0){
            alert('Preencha pelo menos um campo com informações válidas antes de continuar')
            //Resetar()
        } else {
            horas = horaDigitada.value
            let minutos = minutoDigitado.value
            let segundos = segundoDigitado.value
            ContagemDigitada(horas, minutos, segundos)
        }
    }

}


function ContagemRadio(){ //iniciar contagem do radio
    let valorContagem = Number.parseInt(document.querySelector('input[name="opcao"]:checked').value)
    console.log(valorContagem)

    valorContagem = 1
    valorContagem -= 1
    HabilitarPausarReset()
    HabilitarInicio()
    DesabilitarInicio()


    contagem = setInterval(function(){
        if (valorContagem < 0) {
            Resetar()
        }

        if (segundos > 0) {
            segundos-= 1
        } else if (segundos == 0 && valorContagem >= 0) {
            segundos = 59
            valorContagem -= 1
        }
        contador.innerHTML = ` ${0} : ${valorContagem} : ${segundos} `
    }, 1000)

}


function ContagemDigitada(horas=0, minutos=0, segundos=0) { //iniciar contagem pelos valores digitados

    HabilitarPausarReset()
    DesabilitarInicio()

    if (horas === ''){
        horas = 0
    } else if (minutos === ''){
        minutos = 0
    } else if (segundos === ''){
        segundos = 0
    }

    contagem = setInterval(function(){
        contador.innerHTML = ` ${horas} : ${minutos} : ${segundos} `

        if (horas > 0 && segundos === 0 && minutos === 0) {
            horas -= 1
            segundos = 59
            minutos = 59
        } else {
            if (segundos === 0) {
                segundos = 59
                minutos -= 1
            } else if (segundos > 0) {
                segundos-= 1
            } else if (minutos > 0) {
                minutos-= 1
                segundos = 59
            }
        }

    }, 1000)


    /*if (horas >= 0 || minutos >= 0 || segundos >= 0) {
        contagem = setInterval(function(){
                if (segundos > 0) {
                    segundos -= 1
                } else {
                    minutos -= 1
                    segundos = 59
                }
            contador.innerHTML = ` ${horas} : ${minutos} : ${segundos} `
        }, 1000)
    } else {
        if (horas == 0 && minutos == 0 && segundos == 0){
            alert('Preencha pelo menos um campo com informações válidas antes de continuar')
            Resetar()
            //horas = minutos = segundos = -1
        }

        if (horas === ''){
            horas = 0
        } else if (minutos === ''){
            minutos = 0
        } else if (segundos === ''){
            segundos = 0
        }
    }*/

    formDigitar.reset()
}


function Resetar(){
    formRadio.reset();
    formDigitar.reset();
    clearInterval(contagem)
    minutos = 0
    segundos = 0
    valorContagem = 0
    contador.innerHTML = '00 : 00 : 00'
    DesabilitarInicio()
    btnPausar.disabled = true
    btnResetar.disabled = true
}


function Pausar(){
    clearInterval(contagem)
    HabilitarInicio()
}


function Escolher(){
    let valorContagemEsc = document.querySelector('#escolhaDigitada').value
    console.log(valorContagemEsc)
}


function HabilitarInicio(){
    if (document.querySelector('#btnIniciar').disabled == true) {
        document.querySelector('#btnIniciar').disabled = false
    }
}


function DesabilitarInicio(){
    if (document.querySelector('#btnIniciar').disabled == false) {
        document.querySelector('#btnIniciar').disabled = true
    }
    if (document.querySelector('#btnIniciarTimer').disabled == false) {
        document.querySelector('#btnIniciarTimer').disabled = true
    }
}


function HabilitarPausarReset(){
    if (btnPausar.disabled == true) {
        btnPausar.disabled = false
    }

    if (btnResetar.disabled == true) {
        btnResetar.disabled = false
    }
}

function DesabilitarRadio(){
    formRadio.reset()
    formRadio.blur()

    HabilitarInicio()

}

function DesabilitarDigitacao(){
    formDigitar.reset()
    formDigitar.blur()
}


//FUNÇÕES CRONOMETRO
function IniciarTimer(){
    DesabilitarInicio()
    HabilitarPausarResetTimer()
    //segTimer = 55
    //minTimer = 59
    timer = setInterval(function(){
        cronometro.innerHTML = ` ${horaTimer} : ${minTimer} : ${segTimer} `
        segTimer += 1

        if (segTimer == 60 && minTimer !== 59) {
            minTimer += 1
            segTimer = 0
        }
        if (segTimer == 60 && minTimer == 59){
            horaTimer += 1
            minTimer = 0
            segTimer = 0
        }
    }, 1000)
}

function HabilitarInicioTimer(){
    if (document.querySelector('#btnIniciarTimer').disabled == true) {
        document.querySelector('#btnIniciarTimer').disabled = false
    }else{
        document.querySelector('#btnIniciarTimer').disabled = true
    }
}

function PausarTimer(){
    clearInterval(timer)
    HabilitarInicioTimer()
}

function HabilitarPausarResetTimer(){
    if (btnPausarTimer.disabled == true) {
        btnPausarTimer.disabled = false
    }

    if (btnResetarTimer.disabled == true) {
        btnResetarTimer.disabled = false
    }
}

function ResetarTimer(){
    btnPausarTimer.disabled = true
    btnResetarTimer.disabled = true
    HabilitarInicioTimer()
    horaTimer = minTimer = 0
    segTimer = 1
    cronometro.innerHTML = ` ${horaTimer} : ${minTimer} : 0 `
    clearInterval(timer)
}
