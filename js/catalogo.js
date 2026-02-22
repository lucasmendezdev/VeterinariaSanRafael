// ===============================
// ELEMENTOS
// ===============================
const contenedorCatalogo = document.getElementById("catalogo");
const botonesFiltro = document.querySelectorAll(".filtro-btn");
const contadorCarrito = document.getElementById("contadorCarrito");

// ===============================
// RENDER CATALOGO
// ===============================
function renderizarCatalogo(lista) {

  contenedorCatalogo.innerHTML = "";

  lista.forEach(producto => {

    const card = document.createElement("div");
    card.className = "producto-card";

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p class="precio">$${producto.precio.toLocaleString()}</p>
      <button class="btn-agregar">Agregar al carrito</button>
    `;

    card.querySelector(".btn-agregar").addEventListener("click", () => {
      agregarAlCarrito(producto);
      mostrarToast("Producto agregado ✔", "success");
    });

    contenedorCatalogo.appendChild(card);
  });
}

// ===============================
// AGREGAR AL CARRITO
// ===============================
function agregarAlCarrito(producto) {

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find(p => p.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      descripcion: producto.descripcion || "",
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

// ===============================
// CONTADOR
// ===============================
function actualizarContador() {

  if (!contadorCarrito) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  contadorCarrito.textContent = total;
}

// ===============================
// FILTROS
// ===============================
botonesFiltro.forEach(btn => {

  btn.addEventListener("click", () => {

    botonesFiltro.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const tipo = btn.dataset.tipo;

    const filtrados =
      tipo === "todos"
        ? productos
        : productos.filter(p => p.tipo === tipo);

    renderizarCatalogo(filtrados);
  });

});

// ===============================
// TOAST
// ===============================
function mostrarToast(mensaje, tipo = "success") {

  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.classList.remove("success", "warning", "error");
  toast.classList.add(tipo);

  toast.textContent = mensaje;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  renderizarCatalogo(productos);
  actualizarContador();
});