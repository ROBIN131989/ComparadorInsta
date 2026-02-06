let resultadoGlobal = [];

// 🔹 Limpieza REAL para listas de Instagram
function limpiarLista(texto) {
  return [...new Set(
    texto
      .split(/\n|,|;/) // separa por saltos, comas o ;
      .map(u =>
        u
          .replace(/["']/g,"") // quita comillas
          .replace("@","") // quita @
          .trim()
          .toLowerCase()
      )
      .filter(u => u !== "")
  )];
}

// 🔹 Comparar listas
function comparar() {

  let seguidosTexto = document.getElementById("seguidos").value;
  let seguidoresTexto = document.getElementById("seguidores").value;

  let seguidos = limpiarLista(seguidosTexto);
  let seguidores = limpiarLista(seguidoresTexto);

  if (seguidos.length === 0 || seguidores.length === 0) {
    document.getElementById("alerta").textContent = "⚠️ Debes pegar ambas listas.";
    return;
  }

  let seguidoresSet = new Set(seguidores);

  let noMeSiguen = seguidos.filter(s => !seguidoresSet.has(s));

  resultadoGlobal = noMeSiguen;

  mostrarResultados(noMeSiguen);
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
  if (resultadoGlobal.length === 0) {
    document.getElementById("alerta").textContent = "⚠️ No hay resultados.";
    return;
  }

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
}

// 🔹 Ordenar
function ordenarResultados() {
  resultadoGlobal.sort();
  mostrarResultados(resultadoGlobal);
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

