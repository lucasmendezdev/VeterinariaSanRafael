const contenedor = document.getElementById("detalleProducto");
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const producto = productos.find(p => p.id === id);

let talleSeleccionado = null;

function renderProducto() {
  contenedor.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">

    <div class="info">
      <h1>${producto.nombre}</h1>
      <div class="precio">$${producto.precio}</div>

      <div class="talles">
        <p>Seleccionar talle</p>
        ${producto.talles.map(t =>
          `<button onclick="seleccionarTalle('${t}')">${t}</button>`
        ).join("")}
      </div>

      <button class="agregar" onclick="agregarAlCarrito()">
        Agregar al carrito
      </button>

      <div class="descripcion">
        <p>${producto.descripcion}</p>
      </div>
    </div>
  `;
}

function seleccionarTalle(talle) {
  talleSeleccionado = talle;
  document.querySelectorAll(".talles button").forEach(btn => {
    btn.classList.toggle("activo", btn.innerText === talle);
  });
}

function agregarAlCarrito() {
  if (!talleSeleccionado) {
    alert("Seleccioná un talle");
    return;
  }

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const existente = carrito.find(
    item => item.id === producto.id && item.talle === talleSeleccionado
  );

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      talle: talleSeleccionado,
      cantidad: 1
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado 🛒");
}

renderProducto();
