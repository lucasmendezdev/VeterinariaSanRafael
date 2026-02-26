function actualizarContadorCarrito() {
  const contador = document.getElementById("contadorCarrito");
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  contador.textContent = total;
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
});


const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});


