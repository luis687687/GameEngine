import AnimationState from "./AnimationState.js";




export default class Animator extends AnimationState {

  #index = 4
  #c = 0
  constructor(gameObject, image, w, h, frames = 1){
    super(gameObject, image, w, h)
    this.frames = frames
    this.imageInstanteate()
    this.frameX = 0
    this.frameY = 0
    
    
  }



  changeFrame(){
    if(this.gameObject.canBePaused() && this.pauseSensivity) return
    if(this.#index + 1 >= this.frames)
      this.#index = 0
    else
      this.#index++
    console.log(this.#c, this.getIndex())
    // else
    //   this.#index ++
  }

  conditionToEnd(){
    return this.#index + 1 >= this.frames
  }
  internalAnimationEndConfig(){
    this.#index = 0
  }

  imageInstanteate(){
    this.imgObject = []
    this.loadeds = 0
    this.ready = false
    for(let i = 0; i < this.frames; i++){
      this.imgObject[i] = new Image()
      
      this.imgObject[i].src = this.image+`/${i}.png`
      
      this.imgObject[i].onload = () => {
        this.loadeds++
        if(this.loadeds == this.frames)
          this.ready = true
      }
      this.imgObject[i].onerror = () => {
        console.log("Houve um erro ")
      }
    }
  }

  getIndex(){
    return this.#index
  }
}