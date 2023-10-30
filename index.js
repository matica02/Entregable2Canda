const form = document.getElementById("form")

form.addEventListener("submit", (e) => {crearUsuario(e)})

function crearUsuario(e){
    e.preventDefault()
    
    let formNombre = document.getElementById("nombre")
    let formApellido = document.getElementById("apellido")
    let formEdad = document.getElementById("edad")
    let formEmail = document.getElementById("email")

    const usuario = {
        nombre: formNombre.value,
        apellido: formApellido.value,
        edad: formEdad.value,
        email: formEmail.value,
    }

    console.log(usuario)
    localStorage.setItem("user", JSON.stringify(usuario))
    form.reset()
}

const carrito= []

const autos= [
{
    id: 1,
    nombre: "Lamborghini Aventador",
    precio: 120,
    img: "./img/lamborghini.png",
},
{
    id: 2,
    nombre: "Mercedes AMG GTR",
    precio: 90,
    img: "../img/mercedes.png",
},
{
    id: 3,
    nombre: "Volkswagen Golf R",
    precio: 70,
    img: "../img/volkswagen.png",
},
{
    id: 4,
    nombre: "Porsche GT3RS",
    precio: 110,
    img: "../img/porsche.png",  
},
{
    id: 5,
    nombre: "Audi R8",
    precio: 100,
    img: "../img/audir8.png",
},
{
    id: 6,
    nombre: "BMW M4",
    precio: 80,
    img: "../img/m4.png",
}
]

const contenedorAutos= document.querySelector("#contenedorAutos")
const contenedorCarrito= document.querySelector("#contenedorCarrito")

function crearCards(){
    autos.forEach((auto) => {
        let contenedorAuto = document.createElement("div")
        contenedorAuto.innerHTML = `<div class="card cards-vw mx-auto col-sm-12 col-md-2 col-lg-2">
        <img class="rounded" src="${auto.img}"
          <div class="card-body">
            <h3 class="card-text">${auto.nombre}</h3> 
            <p class="card-text">Price: ${auto.precio} USD</p> 
            <a class="card-text card-btn rounded" id="${auto.id}" href="#">ADD TO CART</a>
          </div>
      </div> `
    
        contenedorAutos.appendChild(contenedorAuto)
        const btnAgregar= document.getElementById(`${auto.id}`)
        btnAgregar.addEventListener("click" , () => agregarACarrito(auto.id))
    })
}

crearCards();

function agregarACarrito(id){
    const autoEncontrado= autos.find((auto) => auto.id == id)
    carrito.push(autoEncontrado)
    console.log(carrito)
    mostrarCarrito()
}

function mostrarCarrito (){
    contenedorCarrito.innerHTML = ""
    carrito.forEach((auto) => {
        let contenedorProducto = document.createElement("li")
        contenedorProducto.innerHTML = `
        <li class="nav-item">
            <p>${auto.nombre}</p>
            <p>${auto.precio} USD</p>
        </li>`;
        contenedorCarrito.appendChild(contenedorProducto)
    })
}
mostrarCarrito()

                







/* MULTIPLICADOR DE PRODUCTOS
<div class="price-multip">
    <p>${auto.precio} USD</p>
    <select class="form-select" aria-label="Default select example">
        <option selected>1</option>
        <option value="1">2</option>
        <option value="2">3</option>
        <option value="3">4</option>
        <option value="4">5</option>
    </select>
</div> */