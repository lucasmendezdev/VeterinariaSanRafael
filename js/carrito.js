const lista = document.getElementById("listaCarrito");
const totalEl = document.getElementById("total");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function crearItem(item, index) {
  const div = document.createElement("div");
  div.className = "item";

  const img = document.createElement("img");
  img.src = item.imagen;

  const info = document.createElement("div");

  const nombre = document.createElement("h3");
  nombre.textContent = item.nombre;

  const descripcion = document.createElement("span");
  descripcion.textContent = item.descripcion || "";

  const precio = document.createElement("strong");
  precio.textContent = `$${item.precio * item.cantidad}`;

  info.append(nombre, descripcion, document.createElement("br"), precio);

  const cantidad = document.createElement("div");
  cantidad.className = "cantidad";

  const menos = document.createElement("button");
  menos.textContent = "−";

  const num = document.createElement("span");
  num.textContent = item.cantidad;

  const mas = document.createElement("button");
  mas.textContent = "+";

  menos.onclick = () => {
    item.cantidad--;
    if (item.cantidad <= 0) {
      carrito.splice(index, 1);
    }
    guardar();
  };

  mas.onclick = () => {
    item.cantidad++;
    guardar();
  };

  cantidad.append(menos, num, mas);

  const eliminar = document.createElement("div");
  eliminar.className = "eliminar";
  eliminar.textContent = "✕";
  eliminar.onclick = () => {
    carrito.splice(index, 1);
    guardar();
  };

  div.append(img, info, cantidad, eliminar);

  return div;
}

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

  totalEl.textContent = `$${total}`;
}

function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  render();
}

render();