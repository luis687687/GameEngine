import { GameObjectOrientation } from "./_utils/constants.js";
import BaseObject from "./BaseObject.js";
import GameObjectColider from "./GameObjectColider.js";
import GameColider from "./GameObjectColider.js";

export default class GameObject extends BaseObject {
  #colider = null
  #startNow = true
  constructor(game, width= 210, height = 190, x = 0, y = 0, limitedX, limitedY, tagname){
    super(game, width , height)
    this.x = x
    this.tagname = tagname
    this.limitedHorizontal = limitedX
    this.limitedVertical = limitedY
    this.coliderTrackerX = true
    this.coliderTrackerY = true
    this.coliderFull = false
    
    this.setY(y)
    this.setItInitialX(x)
    
  }



  updateWithMyColider(){
    if(!this.#colider) return
    this.#colider.debug = this.debug
    if(this.coliderTrackerY) this.#colider.y = this.#getColiderY()
    if(this.coliderTrackerX) this.#colider.x =  this.#getColiderX()
    if(this.coliderFull){
      this.#colider.height = this.height
      this.#colider.width = this.width
    }
  }

  
  updateWithMyChilds(){
    if(!this.containedChilds) return
    if(!this.containedChilds.length) return
    this.containedChilds.map( child => {
      if(! (child instanceof BaseObject) ) return
      child.x = child.getItInitialX() + (this.getRealCenterX() - this.width)
    })
  }

  //colisores
  coliderInitializer(offx, offy, w, h, full){
    this.coliderFull = full
    this.coliderOffX = offx
    this.coliderOffY = offy
    this.#colider = new GameColider(this.game, w ? w : this.width, h ? h : this.height, this.x, this.y)
    this.#coliderDefinition()
  }
  
  #getColiderX(){
    return this.x + this.coliderOffX
  }
  #getColiderY(){
    return this.coliderOffY + this.y
  }
  #coliderDefinition(){
    this.#colider.x = this.#getColiderX()
    this.#colider.y = this.#getColiderY()
    this.#colider.limitedHorizontal = this.limitedHorizontal
    this.#colider.limitedVertical = this.limitedVertical
    this.#colider.xlimiter = this.xlimiter
    this.#colider.yLimiter = this.yLimiter
    this.#colider.speed = this.speed
    this.#colider.invertedReference = this
  }

  getColider(){
    return this.#colider
  }


  listenRigthMoviment(){
    if(!(this.#colider instanceof GameColider)) return
    this.#colider.moveRight()
  }
  listenLeftMoviment(){
    if(!(this.#colider instanceof GameColider)) return
    this.#colider.moveLeft()
  }
  listenUpMoviment(){
    if(!(this.#colider instanceof GameColider)) return
    this.#colider.moveUp()
  }
  listenBottomMoviment(){
    if(!(this.#colider instanceof GameColider)) return
    this.#colider.moveBottom()
  }
  listenGravityEffect(){
    if(!(this.#colider instanceof GameColider)) return
    this.#colider.y = this.coliderOffY + this.y
  }


  onOrientationChange(x){
    if(!(this.#colider instanceof GameColider)) return
    this.#setFirstTimeInvertedOrientationReference()
  }

  editalbleRunnOnlyOneTime(){ //redefinidor do colider, actualizar o colider quando o objecto for visivel
    if(!this.#colider)
      return
      if(!this.isInitialOrientation())
        this.#colider.setOrientation(this.orientation)
    this.#coliderDefinition()
  }

  #setFirstTimeInvertedOrientationReference(){
    this.#colider.orientation = (this.orientation) // rotacionar também
    this.#startNow = false //garante que seja so a primeira chamada
    this.#colider.x = (this.x+this.coliderOffX)  // o seu colider precisa em primeiro pegar as coordenadas e...
  }

 
  setXListener(v){
    this.#colider.x = (v+this.coliderOffX)
  }
  onDestroy(){
    if(this.#colider instanceof GameObjectColider){
      this.#colider.destroy()
      this.#colider = null
    }
    if(!this.containedChilds?.length) return
    console.log(this, " Removendo filhos ")
    this.containedChilds.map( (e) =>{ 
      e.destroy()
      console.log(e, " Removido ")
    } )
    this.containedChilds = []
  }

  // #listenColisionFromGameObjectWithColider(){
  //   const obj = this
  //   if(!this.#colider) return
  //   this.gameObjects.forEach(obj2 => {
  //     if(obj == obj2) return
  //     if(!obj2.getColider) return
  //     if(!obj2.getColider()) return

  //     if(!obj.getColider().feel || !obj2.getColider().feel) return
  //     if(this.game.colisionSystem.isColidingHorizontaly(obj.getColider(), obj2.getColider())){
  //         console.log("colidiram ", obj2.name, obj.name)
  //         obj.onColision(obj2)
  //         obj2.onColision(obj)
  //     }
  //   })
    
  // }

  /**esucutador subscrevivel */   
  onColision(objectColided){}


  /**Operação segura de chamada no colider 
   * Importante, quando um gameObject for capturado no colider de outro
   * Possibilita passar um evento seguramente controlado pelo GameObject,
   * Devido a taxa de actualização feita pelo ColisionSystem
  */
  colidedEvent(...args){ /** */
    this.getColider().feel = false
    setTimeout ( _ => { /**Serve para reduzir a taxa de actualizacao feita no ColisionSys */
        this.callOnCalision(...args)
        this.getColider().feel = true
    }, 1150 )
  }
  callOnCalision(...args){}


}