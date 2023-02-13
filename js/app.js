//Variables
const buscador = document.querySelector("#buscador")
const marca = document.querySelector("#marca")
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo")
const maximo = document.querySelector("#maximo")
const puertas = document.querySelector("#puertas")
const transmision = document.querySelector("#transmision")
const color = document.querySelector("#color")
const btnReset = document.querySelector("#reset")

//Seleccionar selects
const selectMarca = document.querySelector("#marca")
const selectYear = document.querySelector("#year")
const selectMin = document.querySelector("#minimo")
const selectMax = document.querySelector("#maximo")
const selectPuertas = document.querySelector("#puertas")
const selectTransmision = document.querySelector("#transmision")
const selectColor = document.querySelector("#color")


//Div para mostrar resultados
const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear(); //2023
const min = max-10;

//Generar un objeto con la busqueda
const datosBusqueda = {
    marca:"",
    year:"",
    minimo:"",
    maximo:"",
    puertas:"",
    color:"",
    transmision:""
}


//Eventos
document.addEventListener("DOMContentLoaded", function(){

    //Muestra los autos en la pagina al cargar
    mostrarAutos(autos); 

    //Llena las opciones de años
    llenarSelect();
})


//Event Listeners para los select de busqueda
marca.addEventListener("change", function(e){ //.change tiene lugar cuando cambia el valor de la propiedad Value(cuando seleccionas otra cosa en un select)
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener("change", function(e){ 
    datosBusqueda.year = e.target.value;

    filtrarAuto();
})

minimo.addEventListener("change", function(e){ 
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
})

maximo.addEventListener("change", function(e){ 
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
})

puertas.addEventListener("change", function(e){ 
    datosBusqueda.puertas = e.target.value;

    filtrarAuto();
})

color.addEventListener("change", function(e){ 
    datosBusqueda.color = e.target.value;

    filtrarAuto();
})

transmision.addEventListener("change", function(e){ 
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
})

//Funciones
function mostrarAutos(autos){ 

    limpiarHTML();

    autos.forEach( auto => {
        //Desctructuring
        const {marca , modelo, year, precio, puertas, color, transmision} = auto;
        //Creando elemento en HTML
        const autoHTML = document.createElement("P");

        autoHTML.textContent = `${marca} ${modelo} - ${year} - ${precio} - ${puertas} puertas - Color: ${color} - Transmision: ${transmision}`;

        //Insertar resultado en el HTML
        resultado.appendChild(autoHTML);
    })
}


//Limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function limpiarSelect(){
    while(select.firstChild){
        select.removeChild(select.firstChild)
    }
}

//Genera los años del select
function llenarSelect(){
    for (let i = max; i >= min; i--) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        year.appendChild(option) //Agrega el option de cada year al select        
    }
}


//Funcion que filtra en base a la busqueda
function filtrarAuto(){
    
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor)//funcion de alto nivel porque es una funcion que toma otra funcion como parametro
    
    if(resultado.length){ 
        //EN caso de que haya algo
        mostrarAutos(resultado)

    }else{
        limpiarHTML();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se encontraron elementos',
            
          })
          noResultado();
        //   const noResultado = document.createElement("P");
        //     noResultado.textContent = "No se encontraron elementos"
        //     resultado.appendChild(noResultado)
    }
}

function noResultado(){
    const noResultado = document.createElement("P");
    noResultado.textContent = "No se encontraron elementos"
    resultado.appendChild(noResultado)
}


function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }
    return true;
}

function filtrarYear(auto){

    if(datosBusqueda.year){
        return auto.year === parseInt(datosBusqueda.year);
    }
    return true;
}

function filtrarMinimo(auto){
    if(datosBusqueda.minimo){
        return auto.precio >= parseInt(datosBusqueda.minimo);
    }
    return true;
}


function filtrarMaximo(auto){

    if(datosBusqueda.maximo){
        return auto.precio <= parseInt(datosBusqueda.maximo);
    }
    return true;
}


function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return true;
}

function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return true;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return true;
}


btnReset.addEventListener("click", function(){
    limpiarHTML();
    //Para limpiar los filtros
    selectMarca.value = "";
    datosBusqueda.marca ="";
    selectYear.value = "";
    datosBusqueda.year ="";
    selectMin.value = "";
    datosBusqueda.minimo ="";
    selectMax.value = "";
    datosBusqueda.maximo ="";
    selectPuertas.value = "";
    datosBusqueda.puertas ="";
    selectTransmision.value = "";
    datosBusqueda.transmision ="";
    selectColor.value = "";
    datosBusqueda.color ="";
    
    mostrarAutos(autos)
    
})


