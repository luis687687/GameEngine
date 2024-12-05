import AnimationState from "./AnimationState.js"
import GameBuilder from "./GameBuilder.js"

class GameObject{

  constructor(game, image){
    this.game = game
    if(this.game instanceof GameBuilder){
      
      this.game.recognizeChildren(this)
      this.animations = []
      
      this.width = 210
      this.height = 190
      this.xlimiter = this.width-this.width/2
      this.ylimiter = this.height-this.height/3 //valor a somar no limit y

      this.inferiorLimit = this.game.height - this.ylimiter 
      this.rightLimit = this.game.width - this.xlimiter / 3
      this.fixedrRightLimit = this.rightLimit //usado no controle de animações
      this.y = this.inferiorLimit
      this.x = 0
      this.limitedHorizontal = false
      this.limitedVertical = false
      this.speed = 1
      this.actualAnimation = null
      this.leftLimiter = this.width
      this.topLimiter = this.height
    }
    else 
      throw "Erro passe a uma instancia do Game"
    
  }

  update(){ //para ser subscrito
    
  }

  draw(){
    if(this.game instanceof GameBuilder){ //Bom para receber sugestoes do vs code
      this.game.context.fillStyle = "red"
      if((this.actualAnimation instanceof AnimationState)){
        this.game.context.save()
        //this.game.context.scale(1, 1)
       
        this.game.context.strokeStyle = "red"
        this.game.context.lineWidth = "22px"
        this.game.context.drawImage(
          this.actualAnimation.imgObject, 
          this.actualAnimation.frameX, this.actualAnimation.frameY, this.actualAnimation.width, 
          this.actualAnimation.height, 
          this.x, this.y, this.width, this.height)
          this.game.context.strokeRect(this.x, this.y, this.width, this.height)

          this.actualAnimation.updateFrame()
          this.game.context.restore()
         
        
      }else
        this.game.context.fillRect(this.x, this.y, this.width, this.height)
        
    }
  }
  moveRight(){
    if(this.limitedHorizontal)
      if(this.x >= this.rightLimit)
        return
    this.x += this.speed * this.game.gameSpeed
  }

  setX(value){
    if(this.limitedHorizontal){
      if(value >= this.rightLimit)
        return
      if(value <= this.game.paddingX)
        return
      }
    this.x = value
  }

  moveLeft(){
    if(this.limitedHorizontal)
      if(this.x <= this.game.paddingX)
        return
    this.x -= this.speed * this.game.gameSpeed
  }

  moveUp(){
    if(this.limitedVertical)
      if(this.y + this.height/3 <= this.game.paddingX)
        return
    this.y -= this.speed * this.game.gameSpeed
  }
  moveBottom(){
    if(this.limitedVertical)
      if(this.onground())
        return
    this.y += this.speed * this.game.gameSpeed
  }

  
  updateAndDraw(){
    this.update()
    
    this.draw()
  }

  destroy(){
    this.game.removeObject(this)
  }

  enterToAnimation(animationType){
    this.animations.forEach(animation => {
      if(animation instanceof animationType)
        animation.enter()
    })
  }

  onground(){
    return this.y >= this.inferiorLimit
  }
}

export default GameObject