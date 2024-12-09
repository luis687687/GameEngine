const capa = document.getElementsByClassName("area")[0]
capa.innerHTML = `<a href="#game" onclick="del()">Coral Game Engine </a> <span>Clica no texto acima para começar</span>`

if(location.hash.includes("game"))
  remove()
function del(){
  setTimeout( () =>{ 
    remove()
    } , 1000)
}

function remove(){
  const fath = capa.parentElement
  document.body.removeChild(fath)
}

