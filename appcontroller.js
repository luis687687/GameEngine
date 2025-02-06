async function checkSession(){
  store = JSON.parse(localStorage.getItem("data"))
  if(!store) {
    console.log("N autenticado")
    throw "Não está autenticado"}
  user_id = store.user_id
  session_id = store.session_id
  if(!user_id || !session_id) {
    console.log("Sem dados de sessoa validos")
    throw "Sessão inválida"
  }
  
  const response = await fetch("/user/check_session", {
    method: 'post', headers: {"Content-Type": "Application/json"},
    body: JSON.stringify({user_id, session_id})
  })
  const json = await response.json()
  return {...json, ...store}
}



async function checkAdmin(){
  store = await checkSession()
  user_id = store.user_id 
  const response = await fetch(`/user/admin_check/${user_id}`)
  const json = await response.json()
  if(!json.is)
    location = "/"
  return store
}

function logout(){
  localStorage.removeItem("data")
  location = "/login"
  if(area)
    area.style.opacity = 0
}


async function listUsers(admin_id){
  const response = await fetch(`./user/list/${admin_id}`)
  const json = await response.json()
  return json
}
async function getSessions(admin_id){
  const response = await fetch(`./user/sessions/${admin_id}`)
  const json = await response.json()
  return json
}

async function alterAccountStatus({admin_id, user_id, status, session_id}){
  console.log(`./user/status/${admin_id}/${user_id} `, {status, session_id})
  const response = await fetch(`./user/status/${admin_id}/${user_id}`, {
    method: "post",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({status, session_id})
  })
  const json = await response.json()
  return json
}