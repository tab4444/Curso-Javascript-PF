const productsEl = document.querySelector(".product-list");
const productsCartEl = document.querySelector(".product-cart-list");
const totalAmountEl = document.querySelector(".precio-total");
const totalProductsEl = document.querySelector(".product-amount");

const cartModal = document.getElementById("cart");
const cartBtn = document.querySelector(".cart-btn");
const closeBtn = document.querySelector(".close-btn");

cartBtn.addEventListener("click", () => {
    cartModal.classList.remove("hidden");
});
closeBtn.addEventListener("click", () => {
    cartModal.classList.add("hidden");
});


function renderProductos(){
    productos.forEach((element) => {
        productsEl.innerHTML +=
        `
        <div class="product-card flex col-container row-gap-0-5 bg-gray-1">
            <div class="img-container">
                <img src="${element.image}" alt="${element.name}">
            </div>
            <div class="flex col-container row-gap-0-5 p-1">
                <p class="font-color-black weight-600 txt-cap">${element.name}</p>
                <p>$${element.price}</p>
                <p class="font-color-gray-2">${element.category}</p>
            </div>
            <button onclick="añadirAlCarrito(${element.id})" class="buy-div flex center-x center-y row-container col-gap-1 font-color-black weight-800 txt-upp font-size-2 p-0-5 bg-gray-1">
                <i class="fa-solid fa-cart-shopping"></i>
                comprar
            </button>
        </div>
        `;
    });
}
renderProductos();

let carrito = JSON.parse(localStorage.getItem("CARRITO")) || [];
actualizarCarrito();

function añadirAlCarrito(id){
    if(carrito.some((item) => item.id === id)){
        cambiarStock("mas", id);
    }
    else{
        const item = productos.find((product) => product.id === id);
        carrito.push({
            ...item,
            numeroDeUnidades: 1
        });
    }
    actualizarCarrito();
}

function actualizarCarrito(){
    renderPrecioTotal();
    renderProductosCarrito();

    localStorage.setItem("CARRITO", JSON.stringify(carrito));
}

function renderPrecioTotal(){
    let precioTotal = 0, cantItems = 0;
    carrito.forEach((element) => {
        precioTotal += element.price * element.numeroDeUnidades;
        cantItems += element.numeroDeUnidades;
    });

    totalAmountEl.innerHTML =
    `
    <h3 class="txt-upp weight-600">total(${cantItems} productos): $${precioTotal.toFixed(2)}</h3>
    `;
    totalProductsEl.innerHTML = cantItems;
}

let buyBtn = document.querySelector(".buy-btn");
buyBtn.addEventListener("click", () => {
    carrito.forEach((item) => {
        eliminarProductosCarrito(item.id);
    })
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Gracias por su compra",
        text: "¡Vuelva pronto!",
        showConfirmButton: false,
        timer: 1500
    });
})

let deleteBtn = document.querySelector(".delete-btn");
deleteBtn.addEventListener("click", () => {
    carrito.forEach((item) => {
        eliminarProductosCarrito(item.id);
    })
});

const darkModeToggle = document.querySelector(".darkmode-toggle");
darkModeToggle.innerHTML += `<i class="fa-solid fa-circle-half-stroke"></i>`;

function renderProductosCarrito(){
    productsCartEl.innerHTML = "";
    carrito.forEach((element) => {
        productsCartEl.innerHTML +=
        `
        <div class="product-card cart flex row-container col-gap-0-5 bg-gray-1 font-color-gray-2 txt-cap">
                <div class="img-container">
                    <img src="${element.image}" alt="${element.name}">
                </div>
                <div class="flex col-container row-gap-0-5 p-1">
                    <p>${element.name}</p>
                    <p>$${element.price}</p>
                    <div class="btn-product-amount-container flex row-container">
                        <button onclick="cambiarStock('menos', ${element.id})" class="menos-producto-btn font-size-3">-</button>
                        <p class="font-size-3">${element.numeroDeUnidades}</p>
                        <button onclick="cambiarStock('mas', ${element.id})" class="mas-producto-btn font-size-3">+</button>
                    </div>
                </div>
                <button class="p-1 bg-green-1" onclick="eliminarProductosCarrito(${element.id})"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `;
    });
}

function eliminarProductosCarrito(id){
    carrito = carrito.filter((item) => item.id !== id);
    actualizarCarrito();
}

function cambiarStock(action, id){
    carrito = carrito.map((item) => {
        let numeroDeUnidades = item.numeroDeUnidades;
        
        if(item.id === id){
            if(action === "menos" && numeroDeUnidades > 1){
                numeroDeUnidades--;
            }
            else if(action === "mas" && numeroDeUnidades < item.stock){
                numeroDeUnidades++;
            }
        }
        return{
            ...item,
            numeroDeUnidades
        };
    });
    actualizarCarrito();
}

let form = document.getElementById("contact-form");
form.addEventListener("submit", () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Gracias por su mensaje",
        showConfirmButton: false,
        timer: 1500
    });
});