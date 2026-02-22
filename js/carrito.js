// ===============================
// ELEMENTOS
// ===============================
const lista = document.getElementById("listaCarrito");
const totalEl = document.getElementById("total");
const btnFinalizar = document.getElementById("btnFinalizar");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// ===============================
// CREAR ITEM
// ===============================
function crearItem(item, index) {

  const div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}">
    <div class="info">
      <h3>${item.nombre}</h3>
      <span>${item.descripcion || ""}</span>
      <strong>$${(item.precio * item.cantidad).toLocaleString()}</strong>
    </div>
    <div class="cantidad">
      <button class="menos">−</button>
      <span>${item.cantidad}</span>
      <button class="mas">+</button>
    </div>
    <div class="eliminar">✕</div>
  `;

  // Botones
  div.querySelector(".menos").onclick = () => {
    item.cantidad--;
    if (item.cantidad <= 0) carrito.splice(index, 1);
    guardar();
  };

  div.querySelector(".mas").onclick = () => {
    item.cantidad++;
    guardar();
  };

  div.querySelector(".eliminar").onclick = () => {
    carrito.splice(index, 1);
    guardar();
  };

  return div;
}

// ===============================
// RENDER
// ===============================
function render() {

  lista.innerHTML = "";

  if (carrito.length === 0) {
    lista.textContent = "Tu carrito está vacío";
    totalEl.textContent = "$0";
    return;
  }

  carrito.forEach((item, index) => {
    lista.appendChild(crearItem(item, index));
  });

  const total = carrito.reduce(
    (acc, i) => acc + i.precio * i.cantidad,
    0
  );

  totalEl.textContent = `$${total.toLocaleString()}`;
}

// ===============================
// GUARDAR
// ===============================
function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  render();
}

// ===============================
// TOAST
// ===============================
function mostrarToast(mensaje, tipo = "warning") {

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
  }, 2500);
}


// ===============================
// Bloquear checkout si carrito vacío
// ===============================

const btnCheckout = document.getElementById("btnCheckout");

if (btnCheckout) {

  btnCheckout.addEventListener("click", e => {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {

      e.preventDefault(); // Bloquea link

      mostrarToast("¡EL CARRITO ESTA VACIO!");

    }

  });

}

// ===============================
// INIT
// ===============================
render();