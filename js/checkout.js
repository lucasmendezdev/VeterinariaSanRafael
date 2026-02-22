// ===============================
// ELEMENTOS
// ===============================
const resumen = document.getElementById("resumenPedido");
const totalSpan = document.getElementById("totalCompra");
const form = document.getElementById("checkoutForm");

const btnEnvio = document.getElementById("btnEnvio");
const envioBox = document.getElementById("envioBox");

// ===============================
// TOGGLE ENVÍO
// ===============================
btnEnvio.addEventListener("click", () => {

  envioBox.classList.toggle("show");

  if (envioBox.classList.contains("show")) {
    btnEnvio.textContent = "❌ Quitar datos de envío";
  } else {
    btnEnvio.textContent = "📦 ¿Necesitás envío?";
  }

});

// ===============================
// GENERAR TEXTO PEDIDO
// ===============================
function generarTextoPedido(carrito) {

  let texto = "";

  carrito.forEach(item => {

    const subtotal = item.precio * item.cantidad;

    texto += `
${item.nombre} x${item.cantidad}
$${subtotal.toLocaleString()}

`;

  });

  return texto;
}

// ===============================
// MOSTRAR RESUMEN
// ===============================
function mostrarResumen() {

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  resumen.innerHTML = "";

  let total = 0;

  if (carrito.length === 0) {

    resumen.innerHTML = "<p>Tu carrito está vacío</p>";
    totalSpan.textContent = "0";
    return;
  }

  carrito.forEach(item => {

    const div = document.createElement("div");
    div.classList.add("resumen-item");

    const subtotal = item.precio * item.cantidad;

    div.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span>$${subtotal.toLocaleString()}</span>
    `;

    resumen.appendChild(div);

    total += subtotal;
  });

  totalSpan.textContent = total.toLocaleString();
}

// ===============================
// ENVIAR PEDIDO
// ===============================
form.addEventListener("submit", e => {

  e.preventDefault();

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  // 🔥 Calcular total real
  const totalFinal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const data = {
    nombre: form.nombre.value,
    email: form.email.value,
    telefono: form.telefono.value,
    direccion: form.direccion?.value || "Retiro en local",
    ciudad: form.ciudad?.value || "",
    pedido: generarTextoPedido(carrito),
    total: totalFinal.toLocaleString()
  };

  emailjs.send(
    "service_z7dok6h",
    "template_n8lcjjg",
    data
  )
  .then(() => {

    // Mostrar toast
    const toast = document.getElementById("toastSuccess");
    toast.classList.add("show");

    // Mensaje WhatsApp
    const mensaje = `
Hola! Hice un pedido:

Nombre: ${data.nombre}
Tel: ${data.telefono}

Dirección: ${data.direccion}

Pedido:
${data.pedido}

Total: $${data.total}
`;

    const telefonoTienda = "5492625527155";
    const url = `https://wa.me/${telefonoTienda}?text=${encodeURIComponent(mensaje)}`;

    // Limpiar carrito
    localStorage.removeItem("carrito");

    // Redirigir
    setTimeout(() => {
      window.open(url, "_blank");
      window.location.href = "index.html";
    }, 3000);

  })
  .catch(err => {
    console.error(err);
    alert("Error al enviar pedido. Intentá nuevamente.");
  });

});

// ===============================
// INIT
// ===============================
mostrarResumen();