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

const contenedorAutos= document.querySelector("#contenedorAutos")
const contenedorCarrito= document.querySelector("#contenedorCarrito")

async function encontrarCards() {
    const resp= await fetch("./productos.json")
    const autos= await resp.json()
    console.log(autos)
    crearCards(autos)
}
encontrarCards()

function crearCards(autos){
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
        btnAgregar.addEventListener("click" , () => confirmarAgregar())
        function confirmarAgregar() {
            Swal.fire({
                title:"¿Esta seguro de que quiere agregar este producto al carrito?",
                icon: "question",
                showDenyButton: true,
                confirmButtonText: "Agregar",
            }).then((result) => {
                if (result.isConfirmed) {
                    agregarACarrito(autos,auto.id)
                } else if (result.isDenied) {
                    Swal.fire("El producto no ha sido agregado", "", "error");
                }
            })

        }
    })
}

function agregarACarrito(autos,id){
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

                



/* function crearCards(autos){
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
        btnAgregar.addEventListener("click" , () => agregarACarrito(autos,auto.id))
    })
} */



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