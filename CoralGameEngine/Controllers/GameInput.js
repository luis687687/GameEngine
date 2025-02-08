
import GameImage from "../GameImage.js"
import GameText from "../GameText.js"


export default class GameInput {
  constructor(game){
    this.actives = []
    this.game = game
    this.#onInput()
    this.#onDocumnetVisibly()
    this.#onTouch(game)
  }

  #onInput(){
    window.addEventListener("keydown", (action) => {
      const key = action.key
      if(!this.actives.includes(key))
        this.actives.push(key)
    })
    window.addEventListener("keyup", (action) => {
      const key = action.key
      this.actives = this.actives.filter( (e) => e != key)
    })
  }


  #onTouch(){
    this.game.area.addEventListener("click", (action) => {
      console.log("Clicou em ", action)   
      const activity = this.#getMouseDifinition(action)
      this.#allGameObjectSetSensiblity(activity)
      
    })

  }


  //adiciona sensibilidade a todos objectos de jogo
  #allGameObjectSetSensiblity(activity){
    this.game.getAllObjects().forEach(object => {
      
      let objW = object.width
      let objH = object.height
      let objX = object.getRealCenterX() - objW/2
      let objY = object.y
      
     
      if(object.getColider && object.getColider()){
        let colider = object.getColider()
        objH = colider.height
        objW = colider.width
        objX = colider.getRealCenterX() - objW/2
        objY = colider.y
        // console.log(objX, objY, objW, objH, object)
    

      }
      
      const areax = objX + objW
      const areay = objY +objH
      const isInX = activity.x >= objX && activity.x <= areax
      const isInY = activity.y >= objY && activity.y <= areay


      
      if(!object.use_sensibility) return

      if(isInX && isInY)
        object.restrictOnSensibility({
          objX, objY, objH, objW, ...activity
        })
    });
  }


  //pega as definições do click
  #getMouseDifinition(action){
    const canvas_rect = this.game.area.getBoundingClientRect()
    // console.log(canvas_rect, " cc " ,action.clientX, action.clientY)
    const xdistance = action.clientX - canvas_rect.left
    const ydistance = action.clientY - canvas_rect.top
    const isInX =  (xdistance >= 0 && xdistance <= this.game.area.width)
    const isInY =  (ydistance >= 0 && ydistance <= this.game.area.height)
    return {
      inArea: isInX && isInY,
      x: xdistance,
      y: ydistance 
    }
  }

  #onDocumnetVisibly(){ //controla a visibilidade do documento, para saber quando esvaziar o array de inputs activas, caso o documento estiver em segundo plano
    document.addEventListener("visibilitychange", ()=>{
      if(document.visibilityState === "hidden")
        this.actives = []
    })
  }
}