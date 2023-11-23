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
        contenedorAuto.classList.add("card", "cards-vw", "mx-auto", "col-sm-12", "col-md-2", "col-lg-2",)
        contenedorAuto.innerHTML = 
        `<img class="rounded" src="${auto.img}">
          <div class="card-body">
            <h3 class="card-text">${auto.nombre}</h3> 
            <p class="card-text">Price: ${auto.precio} USD</p> 
            <a class="card-text card-btn rounded" id="${auto.id}" href="#">BUY</a>
          </div>`
        contenedorAutos.appendChild(contenedorAuto)
        const btnAgregar= document.getElementById(`${auto.id}`)
        btnAgregar.addEventListener("click" , () => confirmarAgregar())
        function confirmarAgregar() {
            Swal.fire({
                title:"¿Do you want to add this product to the cart?",
                icon: "question",
                showDenyButton: true,
                confirmButtonText: "ADD",
            }).then((result) => {
                if (result.isConfirmed) {
                    agregarACarrito(autos,auto.id)
                } else if (result.isDenied) {
                    Swal.fire("The product has not been added to the cart", "", "error");
                }
            })

        }
    })
}

function agregarACarrito(autos, id) {
    const autoEncontrado = autos.find((auto) => auto.id == id);
    const productoEnCarrito = carrito.find((producto) => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        autoEncontrado.cantidad = 1;
        carrito.push(autoEncontrado);
    }
    console.log(carrito);
    mostrarCarrito();
    calcularTotal();
}

function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((auto) => {
        let contenedorProducto = document.createElement("li");
        const precioXCantidad = auto.precio * auto.cantidad; 
        contenedorProducto.innerHTML = `
            <li class="nav-item">
                <p>${auto.nombre}</p>
                <p>${auto.precio.toFixed(2)} USD x ${auto.cantidad} = ${precioXCantidad.toFixed(2)} USD</p>
            </li>`;
        contenedorCarrito.appendChild(contenedorProducto);
    });
}
mostrarCarrito()

const contenedorPrecio = document.querySelector("#contenedorPrecio");
function calcularTotal() {
    let precioTotal = 0;
    carrito.forEach((producto) => {
        precioTotal += producto.precio * producto.cantidad;
    });
    let precioSumado = document.createElement("p");
    precioSumado.innerHTML = `<p>Total: ${precioTotal.toFixed(2)} USD</p>`;
    contenedorPrecio.innerHTML = "";
    contenedorPrecio.appendChild(precioSumado);
}

const btnComprar = document.getElementsByClassName("buy-btn")
for (const btn of btnComprar) { btn.addEventListener("click", () => confirmarCompra()) }
function confirmarCompra() {
    Swal.fire({
        title:"¿Are you sure you want to continue?",
        icon: "question",
        showDenyButton: true,
        confirmButtonText: "YES",
    })/* .then((result) => {
        if (result.isConfirmed) {
            ACA NOSE QUE PONER
        } else if (result.isDenied) {
            Swal.fire("The purchase has been canceled", "", "error");
        }
    }) */

}
