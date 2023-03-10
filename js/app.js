const criptoMonedasSelect = document.querySelector('#criptomonedas')
const monedasSelect = document.querySelector('#moneda')
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#resultado')

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

    mostrarSpinner()

    fetch(url)
        .then(resp => resp.json())
        .then(cotizacion =>{
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda])
        })
}

function mostrarCotizacionHTML(cotizacion){
    limpiarHTML()
    const {PRICE, HIGHDAY,LOWDAY,CHANGEPCT24HOUR,LASTUPDATE} = cotizacion

    const precio = document.createElement('p')
    precio.classList.add('precio')

    precio.innerHTML = `El precio es <span>${PRICE}</span> `
    const precioAlto = document.createElement('p')
    precioAlto.innerHTML = `<p>Precio m??s alto del d??a <span>${HIGHDAY}</span></p>`

    const precioBajo = document.createElement('p')
    precioBajo.innerHTML = `<p>Precio m??s bajo del d??a <span>${LOWDAY}</span></p>`

    const ultimasHoras = document.createElement('p')
    ultimasHoras.innerHTML = `<p>Variaci??n ultimas 24 horas <span>${CHANGEPCT24HOUR}%</span></p>`

    const ultimaActualizacion = document.createElement('p')
    ultimaActualizacion.innerHTML = `<p>Ultima Actualizaci??n <span>${LASTUPDATE}</span></p>`

    resultado.appendChild(precio)
    resultado.appendChild(precioAlto)
    resultado.appendChild(precioBajo)
    resultado.appendChild(ultimasHoras)
    resultado.appendChild(ultimaActualizacion)

}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function mostrarSpinner(){
    limpiarHTML()
    const spinner = document.createElement('div')
    spinner.classList.add('spinner')

    spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
    `

    resultado.appendChild(spinner)
}