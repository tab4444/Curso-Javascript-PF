const productos = [
    {
        id: 1,
        name: "achicoria (atado)",
        price: 150,
        category: "verdura",
        stock: 100,
        image: "sources/imgs/achicoria.jpg",
        desc: "La naturaleza nos regala una exquisita fruta ya envuelta en su sobre de seguridad. Debajo de una gruesa cáscara encontramos su dulce y cremosa pulpa. La banana es esa práctica fruta lista para consumir que se disfruta a lo largo de todo el año."
    },
    {
        id: 2,
        name: "banana kilo",
        price: 800,
        category: "fruta",
        stock: 45,
        image: "sources/imgs/banana.jpg",
        desc: "La naturaleza nos regala una exquisita fruta ya envuelta en su sobre de seguridad. Debajo de una gruesa cáscara encontramos su dulce y cremosa pulpa. La banana es esa práctica fruta lista para consumir que se disfruta a lo largo de todo el año."
    },
    {
        id: 3,
        name: "brocoli kilo",
        price: 1700,
        category: "verdura",
        stock: 65,
        image: "sources/imgs/brocoli.jpg",
        desc: "De color verde profundo e intenso, partiendo de un tallo firme y robusto hasta una particular e inconfundible forma irregular en su copa. El brócoli llega para regalarnos un suave pero distintivo sabor que oscila entre lo amargo y lo dulce."
    },
    {
        id: 4,
        name: "coco kilo",
        price: 2000,
        category: "fruta",
        stock: 23,
        image: "sources/imgs/coco.jpg",
        desc: "Coco"
    },
    {
        id: 5,
        name: "lechuga repollada kilo",
        price: 650,
        category: "verdura",
        stock: 12,
        image: "sources/imgs/lechuga-repollada.jpg",
        desc: "Es la típica lechuga para sandwiches y crujientes ensaladas originales con un toque personal."
    },
    {
        id: 6,
        name: "mandarina kilo",
        price: 700,
        category: "fruta",
        stock: 21,
        image: "sources/imgs/mandarina.jpg",
        desc:"Su sabor varía entre lo dulce, lo amargo y lo ácido. Explosivamente jugosas. Las familiares de las naranjas más famosas, las mandarinas."
    },
    {
        id: 7,
        name: "manzana roja kilo",
        price: 1050,
        category: "fruta",
        stock: 18,
        image: "sources/imgs/manzana-roja.jpg",
        desc: "Crujiente y jugosa con un  dulce sabor a vainilla pero ácida finalmente. Una textura única e inconfundible, densa y de grano fino."
    },
    {
        id: 8,
        name: "naranja ombligo kilo",
        price: 600,
        category: "fruta",
        stock: 28,
        image:"sources/imgs/naranja-ombligo.jpg",
        desc:"Una dulce y ácida explosión, rebosante de jugosidad y frescura, una fruta sin igual y exquisita por donde se la mire."
    },
    {
        id: 9,
        name: "palta kilo",
        price: 5000,
        category: "fruta",
        stock: 7,
        image:"sources/imgs/palta.jpg",
        desc:"Famosa por el original guacamole, la palta nos ofrece un irresistible suave sabor “aceitado”, una tierna textura y un inconfundible color verde pastel en su interior."
    },
    {
        id: 10,
        name: "papa kilo",
        price: 480,
        category: "verdura",
        stock: 47,
        image: "sources/imgs/papa.jpg",
        desc:"Fritas, al horno, salteadas, hervidas, en puré, en ensaladas, con cascara, sin cáscara, españolas, francesas, americanas. Por un lado, frías, por otro lado calientes. La lista de variedad de papas es interminable. Eso sí, cualquiera sea la diversidad elegida, jamás será una mala elección."
    },
    {
        id: 11,
        name: "rabanitos kilo",
        price: 600,
        category: "verdura",
        stock: 120,
        image:"sources/imgs/rabanitos.jpg",
        desc:"Son ideales para incluir en una dieta para adelgazar y perder peso. Nos ayudan a mantener una piel sana."
    },
    {
        id: 12,
        name: "remolacha kilo",
        price: 500,
        category: "verdura",
        stock: 56,
        image:"sources/imgs/remolacha.jpg",
        desc: "La remolacha es tal vez el vegetal más dulce de la naturaleza, sus formas redondas de color violeta profundo nos aportan exquisitos sabores y contrastes de colores en todos nuestros platos."
    }
];

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