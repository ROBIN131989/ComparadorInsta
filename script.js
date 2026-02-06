let resultadoGlobal = [];

// 🔹 Limpieza básica de listas
function limpiarLista(texto) {
  let lista = texto.split(/[\n,]+/);
  return [...new Set(lista.map(u => u.trim()))].filter(u => u !== "");
}

// 🔹 Comparar listas
function comparar() {
  let seguidos = limpiarLista(document.getElementById("seguidos").value);
  let seguidores = limpiarLista(document.getElementById("seguidores").value);

  if (seguidos.length === 0 || seguidores.length === 0) {
    document.getElementById("alerta").textContent = "⚠️ Debes pegar ambas listas.";
    return;
  } else {
    document.getElementById("alerta").textContent = "";
  }

  // Normalización a minúsculas
  let seguidoresSet = new Set(seguidores.map(s => s.toLowerCase()));
  let noMeSiguen = seguidos.filter(s => !seguidoresSet.has(s.toLowerCase()));

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
  }
}

// 🔹 Exportar resultados
function exportarResultado() {
  if (resultadoGlobal.length === 0) {
    document.getElementById("alerta").textContent = "⚠️ No hay resultados para exportar.";
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
  if (resultadoGlobal.length === 0) {
    document.getElementById("alerta").textContent = "⚠️ No hay resultados para copiar.";
    return;
  }
  navigator.clipboard.writeText(resultadoGlobal.join("\n"))
    .then(() => {
      document.getElementById("alerta").textContent = "📋 Resultados copiados al portapapeles.";
    })
    .catch(() => {
      document.getElementById("alerta").textContent = "⚠️ Error al copiar resultados.";
    });
}

// 🔹 Borrar lista
function borrarLista(idTextarea, idContador) {
  document.getElementById(idTextarea).value = "";
  document.getElementById(idContador).textContent = "0";
}

// 🔹 Copiar lista
function copiarLista(idTextarea) {
  let texto = document.getElementById(idTextarea).value.trim();
  if (texto === "") {
    document.getElementById("alerta").textContent = "⚠️ No hay nada que copiar.";
    return;
  }
  navigator.clipboard.writeText(texto)
    .then(() => {
      document.getElementById("alerta").textContent = "📋 Lista copiada al portapapeles.";
    })
    .catch(() => {
      document.getElementById("alerta").textContent = "⚠️ Error al copiar la lista.";
    });
}

// 🔹 Actualizar contador dinámico
function actualizarContador(idTextarea, idContador) {
  let lista = limpiarLista(document.getElementById(idTextarea).value);
  document.getElementById(idContador).textContent = lista.length;
}

// 🔹 Ordenar resultados alfabéticamente
function ordenarResultados() {
  if (resultadoGlobal.length === 0) {
    document.getElementById("alerta").textContent = "⚠️ No hay resultados para ordenar.";
    return;
  }
  resultadoGlobal.sort((a, b) => a.localeCompare(b));
  mostrarResultados(resultadoGlobal);
}

// 🔹 Buscar dentro de resultados
function buscarResultado() {
  let query = document.getElementById("buscador").value.toLowerCase();
  let filtrados = resultadoGlobal.filter(u => u.toLowerCase().includes(query));
  mostrarResultados(filtrados);
}

// 🔹 Cambiar tema con persistencia
function cambiarTema() {
  let body = document.getElementById("body");
  let contenedor = document.getElementById("contenedor");
  let btnTema = document.getElementById("btnTema");

  if (body
