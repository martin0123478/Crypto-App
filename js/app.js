const criptoMonedasSelect = document.querySelector('#criptomonedas')

//crear promise

const obtenerCriotomonedas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas)
})

document.addEventListener('DOMContentLoaded',() =>{
    consultarCriptoMonedas()
})

function consultarCriptoMonedas(){
    const url = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => obtenerCriotomonedas(resultado.Data))
        .then(criptomonedas => selectCriptoMonedas(criptomonedas))
}


function selectCriptoMonedas(criptomonedas){
    criptomonedas.forEach(cripto => {
        const {FullName,Name} = cripto.CoinInfo

        const option = document.createElement('option')

        option.value = Name
        option.textContent = FullName
        criptoMonedasSelect.appendChild(option)
    });
}