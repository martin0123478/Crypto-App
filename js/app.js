const criptoMonedasSelect = document.querySelector('#criptomonedas')
const monedasSelect = document.querySelector('#moneda')
const formulario = document.querySelector('#formulario')

const objBusqueda = {
    moneda : '',
    criptomoneda:''
}

//crear promise

const obtenerCriotomonedas = criptomonedas => new Promise(resolve =>{
    resolve(criptomonedas)
})

document.addEventListener('DOMContentLoaded',() =>{
    consultarCriptoMonedas()

    formulario.addEventListener('submit',submitFormulario)

    criptoMonedasSelect.addEventListener('change',leerValor)
    monedasSelect.addEventListener('change',leerValor)
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

function leerValor(e){
    objBusqueda[e.target.name] = e.target.value
    console.log(objBusqueda)

}

function submitFormulario(e){
    e.preventDefault();

    //Validar
    const {moneda,criptomoneda} = objBusqueda

    if(moneda === '' || criptomoneda === ''){
        mostrarAlerta('Ambos Campos son Obligatorios');
        return;
    }
    //consultar la API con resultados
    consultarAPI()
}

function mostrarAlerta(mensaje){
    const existeError = document.querySelector('.error')

    if(!existeError){
        const divMensaje = document.createElement('div')
    divMensaje.classList.add('error') 
    divMensaje.textContent = mensaje

    formulario.appendChild(divMensaje)

    setTimeout(() => {
        divMensaje.remove()
    }, 2000);
    }
    
}


function consultarAPI(){
    const {moneda,criptomoneda} = objBusqueda

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

    fetch(url)
        .then(resp => resp.json())
        .then(cotizacion =>{
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
        })
}

function mostrarCotizacionHTML(cotizacion){
    console.log(cotizacion)

}