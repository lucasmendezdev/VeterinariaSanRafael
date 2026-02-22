const contenedorCatalogo = document.getElementById("catalogo");
const botonesFiltro = document.querySelectorAll(".filtro-btn");

// ===============================
// RENDER
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

    // Agregar al carrito (SIN talle)
    card.querySelector(".btn-agregar").addEventListener("click", () => {
      agregarAlCarrito(producto);
      mostrarToast("PRODUCTO AGREGADO ✔", "success");
    });

    contenedorCatalogo.appendChild(card);
  });
}

// ===============================
// CARRITO
// ===============================
function agregarAlCarrito(producto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find(
    p => p.id === producto.id
  );

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
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

// INIT
renderizarCatalogo(productos);

// ===============================
// TOAST (solo éxito ahora)
// ===============================
function mostrarToast(mensaje, tipo = "success") {

  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.classList.remove("success", "warning");
  toast.classList.add(tipo);

  toast.textContent = mensaje;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// ===============================
// Toggle filtros mobile
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("btnToggleFiltros");
  const filtros = document.getElementById("filtrosTop");

  if (!btn || !filtros) return;

  btn.addEventListener("click", () => {
    filtros.classList.toggle("activo");
  });

});