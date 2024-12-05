import GameObject from "./GameObject.js"

export default class AnimationState {
  constructor(gameObject, image, width, height){
    this.imgObject = document.createElement("img")
    this.image = image
    this.imgObject.src = this.image
    this.width = width
    this.height = height
    this.frameBottomPadding = 19
    this.frameHorizontalSpace = 135
    this.firstXSpace = 62
    this.frameX = this.firstXSpace
    this.frameY = 0
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    this.pastTime = 0
    this.fps = this.gameObject.game.fps
    this.frameRatio = 1.8
    this.rightLimit = this.gameObject.fixedrRightLimit //para garantir que a animação não saia da tela
    
    
    
  }

  enter(){
    if(this.gameObject instanceof GameObject){
      this.gameObject.actualAnimation = this
      this.gameObject.game.fps = this.fps
      this.gameObject.rightLimit = this.rightLimit
    }
  }
  updateFrame(){
    this.onInput()
    if(this.pastTime != this.gameObject.game.timer){ //garante o fps na animação
      this.pastTime = this.gameObject.game.timer
      
    }
    else
      return

    if(this.frameX + this.firstXSpace*this.frameRatio >= this.imgObject.width){
      this.frameX = this.firstXSpace
      this.xFrameIteration = 0
      this.animationEnd()
    }
    
    //this.frameY = this.frameBottomPadding
    this.frameX = this.firstXSpace + this.xFrameIteration * (this.width + this.frameHorizontalSpace)
    this.xFrameIteration++
    
    
  }

  animationEnd(){}
  onInput(){}
}