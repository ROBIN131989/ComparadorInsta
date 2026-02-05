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

  if (seguidos.length > 20000 || seguidores.length > 20000) {
    document.getElementById("alerta").textContent = "⚠️ La lista es demasiado grande (máx. 20,000).";
    return;
  }

  let seguidoresSet = new Set(seguidores);
  let noMeSiguen = seguidos.filter(s => !seguidoresSet.has(s));

  resultadoGlobal = noMeSiguen;

  document.getElementById("contador").textContent = noMeSiguen.length;
  let lista = document.getElementById("resultado");
  lista.innerHTML = "";
  noMeSiguen.forEach(u => {
    let li = document.createElement("li");
    li.textContent = u;
    li.className = "list-group-item";
    lista.appendChild(li);
  });

  if (noMeSiguen.length === 0) {
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

// 🔹 Cambiar tema con persistencia en localStorage
function cambiarTema() {
  let body = document.getElementById("body");
  let btnTema = document.getElementById("btnTema");

  if (body.classList.contains("bg-light")) {
    body.classList.remove("bg-light");
    body.classList.add("bg-dark", "text-light");
    btnTema.classList.remove("btn-outline-dark");
    btnTema.classList.add("btn-outline-light");
    btnTema.textContent = "🌗 Modo claro";
    localStorage.setItem("tema", "oscuro");
  } else {
    body.classList.remove("bg-dark", "text-light");
    body.classList.add("bg-light");
    btnTema.classList.remove("btn-outline-light");
    btnTema.classList.add("btn-outline-dark");
    btnTema.textContent = "🌗 Modo oscuro";
    localStorage.setItem("tema", "claro");
  }
}

// 🔹 Al cargar la página, aplicar tema guardado
window.onload = function() {
  let temaGuardado = localStorage.getItem("tema");
  let body = document.getElementById("body");
  let btnTema = document.getElementById("btnTema");

  if (temaGuardado === "oscuro") {
    body.classList.remove("bg-light");
    body.classList.add("bg-dark", "text-light");
    btnTema.classList.remove("btn-outline-dark");
    btnTema.classList.add("btn-outline-light");
    btnTema.textContent = "🌗 Modo claro";
  } else {
    body.classList.remove("bg-dark",
