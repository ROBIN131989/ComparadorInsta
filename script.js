let resultadoGlobal = [];

function guardarDatos(){
localStorage.setItem("seguidos",seguidos.value);
localStorage.setItem("seguidores",seguidores.value);
localStorage.setItem("resultadoGlobal",JSON.stringify(resultadoGlobal));
}

function cargarDatos(){
let s=localStorage.getItem("seguidos");
let f=localStorage.getItem("seguidores");
let r=localStorage.getItem("resultadoGlobal");

if(s){seguidos.value=s;actualizarContador("seguidos","contadorSeguidos")}
if(f){seguidores.value=f;actualizarContador("seguidores","contadorSeguidores")}
if(r){resultadoGlobal=JSON.parse(r);mostrarResultados(resultadoGlobal)}
}

function limpiarLista(texto){
return [...new Set(texto.split(/\n|,|;/)
.map(u=>u.replace(/["']/g,"").replace("@","").trim().toLowerCase())
.filter(u=>u!==""))];
}

function comparar(){
let seg=limpiarLista(seguidos.value);
let segd=limpiarLista(seguidores.value);

if(seg.length===0||segd.length===0){
alerta.textContent="⚠️ Debes pegar ambas listas.";
return;
}

let set=new Set(segd);
resultadoGlobal=seg.filter(s=>!set.has(s));

mostrarResultados(resultadoGlobal);
guardarDatos();

resultado.scrollIntoView({behavior:"smooth"});
}

function mostrarResultados(lista){
contador.textContent=lista.length;
resultado.innerHTML="";
lista.forEach(u=>{
let li=document.createElement("li");
li.textContent=u;
li.className="list-group-item";
resultado.appendChild(li);
});
}

function exportarResultado(){
if(resultadoGlobal.length===0)return;
let blob=new Blob([resultadoGlobal.join("\n")]);
let link=document.createElement("a");
link.href=URL.createObjectURL(blob);
link.download="no_me_siguen.txt";
link.click();
}

function copiarResultado(){
navigator.clipboard.writeText(resultadoGlobal.join("\n"));
}

function actualizarContador(id,idc){
let lista=limpiarLista(document.getElementById(id).value);
document.getElementById(idc).textContent=lista.length;
guardarDatos();
}

function ordenarResultados(){
resultadoGlobal.sort();
mostrarResultados(resultadoGlobal);
guardarDatos();
}

function buscarResultado(){
let q=buscador.value.toLowerCase();
mostrarResultados(resultadoGlobal.filter(u=>u.includes(q)));
}

function borrarResultados(){
resultadoGlobal=[];
resultado.innerHTML="";
contador.textContent="0";
localStorage.removeItem("resultadoGlobal");
}

function borrarTodo(){
localStorage.clear();
seguidos.value="";
seguidores.value="";
contadorSeguidos.textContent="0";
contadorSeguidores.textContent="0";
resultado.innerHTML="";
contador.textContent="0";
resultadoGlobal=[];
}

function cambiarTema(){
body.classList.toggle("bg-dark");
body.classList.toggle("text-light");
body.classList.toggle("bg-light");
body.classList.toggle("text-dark");
}

document.addEventListener("DOMContentLoaded",cargarDatos);


