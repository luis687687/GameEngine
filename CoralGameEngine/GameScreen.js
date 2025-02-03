import GameObject from "./GameObject.js";


export default class GameScreen extends GameObject {

  allChilds = []
  constructor(game){
    super(game)
    this.iamgamescreen = true // importante, para verificar na super classe BaseObject
    this.width = this.game.width
    this.height = this.game.height
    this.x = 0
    this.y = 0
    this.backgroundColor = "rgba(0,0,0,0.7)"

  }

  appendChild(child){
    this.allChilds.push(child)
  }


  updateChildsIfGameIsPaused(){
    if(!this.game.pause) return //so passa se o jogo estiver pausado
    this.allChilds.forEach(ch => {
      
        this.game.context.save()
        this.game.context.clearRect(0,0, 100 , 100)
        ch.updateAndDraw()
        this.game.context.restore()
      
    })
  }

  removeAllChilds(){
    for( let child of this.allChilds){
      this.game.removeObject(child)
      this.removeChild(child)
    }
  }

  removeChild(child){
    this.#destroyList(this.allChilds.filter( e => e == child))
    this.allChilds = this.allChilds.filter( e => e != child)
  }
  removeChildByType(type){
    this.#destroyList(this.allChilds.filter( e => e instanceof type))
    this.allChilds = this.allChilds.filter( e => !( e instanceof type))
  }

  #destroyList(list){
    if ( ! list.forEach ) return
    list.forEach( e => e.destroy() )
  }

  getChilds(){
    return this.allChilds
  }


 
}