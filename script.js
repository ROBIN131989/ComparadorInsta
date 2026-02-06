let resultadoGlobal = [];

// 🔹 Guardar datos automáticamente
function guardarDatos() {

  localStorage.setItem("seguidos", document.getElementById("seguidos").value);
  localStorage.setItem("seguidores", document.getElementById("seguidores").value);
  localStorage.setItem("resultadoGlobal", JSON.stringify(resultadoGlobal));

}

// 🔹 Cargar datos al abrir la página
function cargarDatos() {

  let seguidos = localStorage.getItem("seguidos");
  let seguidores = localStorage.getItem("seguidores");
  let resultado = localStorage.getItem("resultadoGlobal");

  if (seguidos) {
    document.getElementById("seguidos").value = seguidos;
    actualizarContador("seguidos","contadorSeguidos");
  }

  if (seguidores) {
    document.getElementById("seguidores").value = seguidores;
    actualizarContador("seguidores","contadorSeguidores");
  }

  if (resultado) {
    resultadoGlobal = JSON.parse(resultado);
    mostrarResultados(resultadoGlobal);
  }
}

// 🔹 Limpieza PRO
function limpiarLista(texto) {
  return [...new Set(
    texto
      .split(/\n|,|;/)
      .map(u =>
        u
          .replace(/["']/g,"")
          .replace("@","")
          .trim()
          .toLowerCase()
      )
      .filter(u => u !== "")
  )];
}

// 🔹 Comparar listas
function comparar() {

  let seguidos = limpiarLista(document.getElementById("seguidos").value);
  let seguidores = limpiarLista(document.getElementById("seguidores").value);

  if (seguidos.length === 0 || seguidores.length === 0) {
    document.getElementById("alerta").textContent = "⚠️ Debes pegar ambas listas.";
    return;
  }

  let seguidoresSet = new Set(seguidores);
  let noMeSiguen = seguidos.filter(s => !seguidoresSet.has(s));

  resultadoGlobal = noMeSiguen;

  mostrarResultados(noMeSiguen);

  guardarDatos();

  // ⭐ BAJAR AUTOMÁTICAMENTE A RESULTADOS
  document.getElementById("resultado")
    .scrollIntoView({ behavior: "smooth" });
}

// 🔹 Mostrar resultados
function mostrarResultados(listaUsuarios) {

  document.getElementById("contador").textContent = listaUsuarios.length;

  let lista = document.getElementById("resultado");
  lista.innerHTML = "";

  listaUsuarios.forEach(u => {
    let li = document.createElement("li");
    li.textContent = u;
    li.className = "list-group-item";
    lista.appendChild(li);
  });

  if (listaUsuarios.length === 0) {
    document.getElementById("alerta").textContent = "✅ Todos los usuarios que sigues también te siguen.";
  } else {
    document.getElementById("alerta").textContent = "";
  }
}

// 🔹 Exportar resultados
function exportarResultado() {
  if (resultadoGlobal.length === 0) return;

  let blob = new Blob([resultadoGlobal.join("\n")], { type: "text/plain" });
  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "no_me_siguen.txt";
  link.click();
}

// 🔹 Copiar resultados
function copiarResultado() {
  navigator.clipboard.writeText(resultadoGlobal.join("\n"));
}

// 🔹 Borrar lista
function borrarLista(idTextarea, idContador) {
  document.getElementById(idTextarea).value = "";
  document.getElementById(idContador).textContent = "0";
  guardarDatos();
}

// 🔹 Copiar lista
function copiarLista(idTextarea) {
  let texto = document.getElementById(idTextarea).value;
  navigator.clipboard.writeText(texto);
}

// 🔹 Actualizar contador
function actualizarContador(idTextarea, idContador) {
  let lista = limpiarLista(document.getElementById(idTextarea).value);
  document.getElementById(idContador).textContent = lista.length;
  guardarDatos();
}

// 🔹 Ordenar
function ordenarResultados() {
  resultadoGlobal.sort();
  mostrarResultados(resultadoGlobal);
  guardarDatos();
}

// 🔹 Buscar
function buscarResultado() {
  let query = document.getElementById("buscador").value.toLowerCase();
  let filtrados = resultadoGlobal.filter(u => u.includes(query));
  mostrarResultados(filtrados);
}

// 🔹 Tema
function cambiarTema() {

  let body = document.getElementById("body");
  let contenedor = document.getElementById("contenedor");
  let btnTema = document.getElementById("btnTema");

  body.classList.toggle("bg-dark");
  body.classList.toggle("text-light");
  body.classList.toggle("bg-light");
  body.classList.toggle("text-dark");

  contenedor.classList.toggle("bg-secondary");
  contenedor.classList.toggle("text-light");
  contenedor.classList.toggle("bg-white");
  contenedor.classList.toggle("text-dark");

  btnTema.classList.toggle("btn-outline-light");
  btnTema.classList.toggle("btn-outline-dark");
}

// 🔹 Cargar datos al iniciar
document.addEventListener("DOMContentLoaded", cargarDatos);


