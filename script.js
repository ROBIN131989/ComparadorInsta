function comparar() {
  let seguidos = document.getElementById("seguidos").value.split(",");
  let seguidores = document.getElementById("seguidores").value.split(",");

  // limpiar espacios
  seguidos = seguidos.map(s => s.trim()).filter(s => s !== "");
  seguidores = seguidores.map(s => s.trim()).filter(s => s !== "");

  let noMeSiguen = seguidos.filter(s => !seguidores.includes(s));

  let lista = document.getElementById("resultado");
  lista.innerHTML = "";
  noMeSiguen.forEach(u => {
    let li = document.createElement("li");
    li.textContent = u;
    lista.appendChild(li);
  });
}
