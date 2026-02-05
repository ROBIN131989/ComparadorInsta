let resultadoGlobal = [];

function limpiarLista(texto) {
  // acepta comas o saltos de línea
  let lista = texto.split(/[\n,]+/);
  return [...new Set(lista.map(u => u.trim()))].filter(u => u !== "");
}

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
