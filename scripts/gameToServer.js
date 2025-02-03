
/**
 * 
 * @param {*} score 
 * @param {*} leavel 
 * Essa função usa o checkSession, incluido nas pages via tag script
 */
export async function createScore(score, leavel){

  try{
    const r = await checkSession()
    const {user_id, session_id} = r
    const response = await fetch("./game/score", {
      headers: {"Content-type": "Application/json"},
      method: "post",
      body: JSON.stringify({
        user_id, session_id, score, leavel
      })
    })
    const json = await response.json()
    return json
  }
  catch(ex){
    console.log("erro ao salvar o score", ex)
  }
}


export async function getScoreBoard(){

  try{
    const r = await checkSession()
    const {user_id, session_id} = r
    const response = await fetch("./game/score", {
      method: "get",
      headers: {
        "Authentication": session_id
      }
    })
    const json = await response.json()
    console.log(json, " Responsed !")
    return json
  }
  catch(ex){
    console.log("Ocorreu um erro ao pegar os scores: ", ex)
  }
  
}

export async function getMyScore(){

  try{
    const r = await checkSession()
    const {user_id, session_id} = r
    const response = await fetch(`/game/score/${user_id}`, {
      method: "get",
      headers: {"Authorization": session_id}
    })
    const json = await response.json()
    return json
  }
  catch(ex){
    console.log("Erro ao pegar meus scores "+ex)
  }
}