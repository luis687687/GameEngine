import BaseObject from "./BaseObject.js";
import GameObjectColider from "./GameObjectColider.js";
import GameColider from "./GameObjectColider.js";

export default class GameObject extends BaseObject {
  #colider = null
  #startNow = true
  constructor(game, width= 210, height = 190, x, y){
    super(game, width , height)
    this.x = x
    this.y = y
    
  }

  //colisores
  coliderInitializer(offx, offy, w, h){
    this.coliderOffX = offx
    this.coliderOffY = offy
    this.#colider = new GameColider(this.game, w ? w : this.width, h ? h : this.height, this.x, this.y)
    this.#colider.x = this.x + this.coliderOffX
    this.#colider.y = this.coliderOffY + this.y
    this.#colider.limitedHorizontal = this.limitedHorizontal
    this.#colider.limitedVertical = this.limitedVertical
    this.#colider.xlimiter = this.xlimiter
    this.#colider.yLimiter = this.yLimiter
    this.#colider.speed = this.speed
    this.#colider.invertedReference = this
    
    // const that = this
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

  onOrientationChange(){
    if(!(this.#colider instanceof GameColider)) return
    /**o menimo de condicao e de ser a primeira chamda */
    if(this.#startNow && !this.isInitialOrientation()){ //importante porque, se o gameobject começa rotacionado em y, então...
      this.#setFirstTimeInvertedOrientationReference()
    }else{ //todas outras chamdas
      this.#setSecondInvertedOrientationReference()
    }
  }

  #setFirstTimeInvertedOrientationReference(){
    this.#startNow = false //garante que seja so a primeira chamada
    this.#colider.setX(this.x+this.coliderOffX)  // o seu colider precisa em primeiro pegar as coordenadas e...
    this.#colider.setOrientation(this.orientation) // rotacionar também
  }

  #setSecondInvertedOrientationReference(){
    this.#colider.setOrientation(this.orientation)
    this.#colider.setX(this.x+this.coliderOffX) 
  }
  setXListener(){
    this.#colider.setX(this.x+this.coliderOffX)
  }
  onDestroy(){
    if(this.#colider instanceof GameObjectColider)
      this.#colider.destroy()
  }

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