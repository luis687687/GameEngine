import BaseObject from "./BaseObject.js"
import ScreenComponent from "./ScreenComponents/ScreenComponent.js"


/**
 * Esse tipo de GameObject pode pegar uma referencia de outro objecto
 * Util para fazer, por exemplo, o background pegar a referencia do player em movimento
 */
export default class TrackerGameObject extends ScreenComponent {
  constructor(game, reference, w, h, x, y){
    super(game, undefined, w, h, x, y)
    this.keys = this.game.keys.actives
    if(reference instanceof BaseObject)
      this.reference = reference
    this.normalVelocityReference = false
   
  }
  /**para ser subscrito */
  safeUpdate() {}
  /**subscrevendo */
  update(){
    this.safeUpdate()
    this.keys = this.game.keys.actives //actualiza as chaves
    if(this.reference)
      this.speed = this.#getInitialSpeed() + this.reference.speed/2
    this.referenceFrame(this.reference)
    
  }
  /**Intercala o update e pega o objecto de referencia do jogo */
  referenceFrame(){} //**para ser subscrito */
  /**Faz dois desenhos */
  setObjectReference(reference){
    if(reference instanceof BaseObject){
      if(this.reference) return //melhorar, afim de possibilitar exitir update d novas referencias
      this.reference = reference
      this.#intializeReferesFunctionsListeners()
    }
  }
 

  #intializeReferesFunctionsListeners(){
   this.#setReferenceOrientation()
  }

  #setReferenceOrientation(){
    if(this.reference instanceof BaseObject){
        if(!this.reference.onRefereCieOrientations.includes(this.onOrientationReferenceListener))
          this.reference.onRefereCieOrientations.push(this.onOrientationReferenceListener)
    }
  }
  onOrientationReferenceListener(){}



  justCalledInitialSpeed = false
  initialSpeed = 0
  #getInitialSpeed(){
    if(this.justCalledInitialSpeed)
      return this.initialSpeed
    this.initialSpeed = this.speed
    this.justCalledInitialSpeed = true
    return this.speed
  }
}