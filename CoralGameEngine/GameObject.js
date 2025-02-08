import { GameObjectOrientation } from "./_utils/constants.js";
import BaseObject from "./BaseObject.js";
import GameObjectColider from "./GameObjectColider.js";
import GameColider from "./GameObjectColider.js";

export default class GameObject extends BaseObject {
  
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
    if(!this.getColider()) return
    this.getColider().debug = this.debug
    if(this.coliderTrackerY) this.getColider().y = this.#getColiderY()
    if(this.coliderTrackerX) this.getColider().x =  this.#getColiderX()
    if(this.coliderFull){
      this.getColider().height = this.height
      this.getColider().width = this.width
    }
  }

  
  updateWithMyChilds(){
    if(!this.containedChilds) return
    if(!this.containedChilds.length) return
    this.containedChilds.map( child => {
      if(! (child instanceof BaseObject) ) return
      child.x = child.getItInitialX() + (this.getRealCenterX() - this.width)
     // child.y = this.getInitialY()
    })
  }

  //colisores
  coliderInitializer(offx, offy, w, h, full){
    this.coliderFull = full
    this.coliderOffX = offx
    this.coliderOffY = offy
    this.setColider(new GameColider(this.game, w ? w : this.width, h ? h : this.height, this.x, this.y))
    this.#coliderDefinition()
  }
  
  #getColiderX(){
    return this.x + this.coliderOffX
  }
  #getColiderY(){
    return this.coliderOffY + this.y
  }
  #coliderDefinition(){
    this.getColider().x = this.#getColiderX()
    this.getColider().y = this.#getColiderY()
    this.getColider().limitedHorizontal = this.limitedHorizontal
    this.getColider().limitedVertical = this.limitedVertical
    this.getColider().xlimiter = this.xlimiter
    this.getColider().yLimiter = this.yLimiter
    this.getColider().speed = this.speed
    this.getColider().invertedReference = this
  }




  listenRigthMoviment(){
    if(!(this.getColider() instanceof GameColider)) return
    this.getColider().moveRight()
  }
  listenLeftMoviment(){
    if(!(this.getColider() instanceof GameColider)) return
    this.getColider().moveLeft()
  }
  listenUpMoviment(){
    if(!(this.getColider() instanceof GameColider)) return
    this.getColider().moveUp()
  }
  listenBottomMoviment(){
    if(!(this.getColider() instanceof GameColider)) return
    this.getColider().moveBottom()
  }
  listenGravityEffect(){
    if(!(this.getColider() instanceof GameColider)) return
    this.getColider().y = this.coliderOffY + this.y
  }


  onOrientationChange(x){
    if(!(this.getColider() instanceof GameColider)) return
    this.#setFirstTimeInvertedOrientationReference()
  }

  editalbleRunnOnlyOneTime(){ //redefinidor do colider, actualizar o colider quando o objecto for visivel
    if(!this.getColider())
      return
      if(!this.isInitialOrientation())
        this.getColider().setOrientation(this.orientation)
    this.#coliderDefinition()
  }

  #setFirstTimeInvertedOrientationReference(){
    this.getColider().orientation = (this.orientation) // rotacionar também
    this.#startNow = false //garante que seja so a primeira chamada
    this.getColider().x = (this.x+this.coliderOffX)  // o seu colider precisa em primeiro pegar as coordenadas e...
  }

 
  setXListener(v){ //escutador de mudança correcta do x position
    this.getColider().x = (v+this.coliderOffX)
  }
  onDestroy(){
    if(this.getColider() instanceof GameObjectColider){
      this.getColider().destroy()
      this.setColider(null)
    }
  }



 
  /**esucutador subscrevivel */   
  onColision(objectColided){}


  /**Operação segura de chamada no colider 
   * Importante, quando um gameObject for capturado no colider de outro
   * Possibilita passar um evento seguramente controlado pelo GameObject,
   * Devido a taxa de actualização feita pelo ColisionSystem
  */
  colidedEvent(...args){ /** */ //////////////esse metodo ja nao e necessario!
    this.getColider().feel = false
    setTimeout ( _ => { /**Serve para reduzir a taxa de actualizacao feita no ColisionSys */
        if(!this.getColider()) return
        this.callOnCalision(...args)
        this.getColider().feel = true
    }, 1150 )
  }
  callOnCalision(...args){}


}