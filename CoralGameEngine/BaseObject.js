import { ImageElement } from "./_helpers/ImageElement.js"
import { GameObjectOrientation } from "./_utils/constants.js"
import AnimationState from "./AnimationState.js"
import GameBuilder from "./GameBuilder.js"



class BaseObject{

  #realX = 0 //Esse é importante, principalmente para os objectos que rotacionam no eixo y e perdem a referencia base
  static objectId = 0 //permite identificar unicamente cada objecto
  constructor(game, width = 210, height = 190){
    this.game = game
    this.imgElement = undefined
    
    if(this.game instanceof GameBuilder){
      this.game.recognizeChildren(this)
      this.animations = []
      this.width = width
      this.height = height
      this.xlimiter = this.width-this.width/2
      this.ylimiter = this.height //valor a somar no limit y
      this.inferiorLimit = this.game.height - this.ylimiter 
     
      this.y = this.inferiorLimit
      this.x = 0
      this.limitedHorizontal = false
      this.limitedVertical = false
      this.speed = 1
      this.actualAnimation = null
      this.leftLimiter = this.width
      this.topLimiter = this.height
      this.orientation = GameObjectOrientation.right
      this.move = true
      this.debug = false
      this.debugColor = "blue"
      this.backgroundColor = "red"
      this.colider = null
      this.#realX = this.x //valor de x independente da rotacao
      this.game = this.game

      this.setAllXLimit()
      BaseObject.objectId++
    }
    else 
      throw "Erro passe a uma instancia do Game"
    
  }

  
  update(){ }//para ser subscrito

  /**
   * Desenha objecto e coloca no this.game.context
   */
  draw(){
    if(this.game instanceof GameBuilder){ //Bom para receber sugestoes do vs code
      this.game.context.save() //salva o contexto anterior antes de rotacionar, caso haja rotacao 
      this.#drawerDirection()
      
      if((this.actualAnimation instanceof AnimationState)){
        this.drawerImageFromAnimation()
        this.actualAnimation.updateFrame()
        this.#drawerDebug(this.x, this.y, this.width, this.height)
      }else
        this.drawerWithoutAnimation()
      this.game.context.restore() //restaura o contexto anterior, mesclando com o novo
    }
  }

  /**
   * Modifica o eicho da imagem se necessário chamado dentro do drawer da imagem
   */
  #drawerDirection(){
    if(!this.isInitialOrientation()){
      this.game.context.translate(this.game.area.width, 0)
      this.game.context.scale(-1, 1);
    }
  }

  /** cria o elemento canvas com a imagem */
  drawerImageFromAnimation(){
    
    this.game.context.drawImage(
      this.actualAnimation.imgObject, 
      this.actualAnimation.frameX-30, this.actualAnimation.frameY, this.actualAnimation.width, 
      this.actualAnimation.height, 
      this.x, this.y, this.width, this.height)
  }
  /**
   * Serve para ver a area do objecto
   */
  #drawerDebug(x, y, w, h){
    if(!this.debug)
      return
      this.game.context.strokeStyle = this.debugColor
      this.game.context.lineWidth = "22px"
      this.game.context.strokeRect(x,y,w,h)
  }

  
  /**sera subscrito */
  drawerWithoutAnimation(){
    this.drawSimpleWithImage(this.x, this.y, this.width, this.height)
  }

  /**imprinta a image sem o objecto de animação */
  drawSimpleWithImage(x, y, w, h, imageElement){
    this.game.context.fillStyle = this.backgroundColor
    if(imageElement instanceof ImageElement){
      this.game.context.drawImage(imageElement.imageObject, imageElement.x, imageElement.y, imageElement.width, imageElement.height, x, y, w, h)
    }else
      this.game.context.fillRect(x, y, w, h)
    this.#drawerDebug(x,y,w,h)
  }
  
  /**
   * 
   * @returns 
   */

  moveRight(){
    if(!this.move)
      return
    if(this.limitedHorizontal)
      if(this.x >= this.rightLimit){
        return
      }
    this.x += this.speed * this.game.gameSpeed
    this.listenRigthMoviment()
  }

  /**Escutadores de movimento */
  listenRigthMoviment(){}
  listenLeftMoviment(){}
  listenUpMoviment(){}
  listenBottomMoviment(){}
  ////////////////////

  /**
   * seta o valor de x de forma segura, util para setar a posição horizontal de forma forçada em animações
   * @param {} value 
   * @returns 
   */
  setX(value){
    if(this.limitedHorizontal){
      if(value >= this.rightLimit)
        return
      if(value <= this.game.paddingX)
        return
      }
    this.setXListener(value)
    this.x = value
    this.getRealCenterX()
    
  }
  /**listener to setX */
  setXListener(){}
  beforeOrientationChange(){}

  moveLeft(){
    if(!this.isInitialOrientation()){ //sentido de direcção mudou kkkkkk interessante
      return this.moveRight()
    }
    if(!this.move)
      return
    if(this.limitedHorizontal)
      if(this.x <= this.game.paddingX)
        return
    this.x -= this.speed * this.game.gameSpeed
    this.listenLeftMoviment()
   
  }

  moveUp(){
    if(!this.move)
      return
    if(this.limitedVertical)
      if(this.y + this.height/3 <= this.game.paddingX)
        return
    this.y -= this.speed * this.game.gameSpeed
    this.listenUpMoviment()
   
  }

  moveBottom(){
    if(!this.move)
      return
    if(this.limitedVertical)
      if(this.onground())
        return
    this.y += this.speed * this.game.gameSpeed
    this.listenBottomMoviment()
  }

  /**
   * Chama o update, jundamente com o draw, para a actualização do objecto, correr automaticamente com o seu desenho
   */
  updateAndDraw(){
    this.#runnOnlyOneTime()
    this.update()
    this.draw()
    this.setAllXLimit()
  }

  /**
   * Destroi o objecto, removendo ele do jogo, chamando o this.game.removeObject(this)
   */
  destroy(){
    this.game.removeObject(this)
    this.onDestroy()
  }
  onDestroy(){}

  /**
   * Escolhe a animao actual no vector de animações
   * @param {*} animationType 
   */
  enterToAnimation(animationType){
    this.animations.forEach(animation => {
      if(animation instanceof animationType)
        animation.enter()
    })
  }

  // Verifica se o objecto está no limite inferior (chao - default)
  onground(){
    return this.y >= this.inferiorLimit
  }

  //Serve para definir o sentido do movimento do objecto, caso tenha uma imagem
  setOrientation(orientation){
    if(!this.move) return
    if(orientation != GameObjectOrientation.left && orientation != GameObjectOrientation.right)
      return //not valid orientation
    
    this.orientation = orientation
    this.x = this.#invertedXCoord() //inversor de
    this.onOrientationChange(this.x)
  }

  #invertedXCoord(){
    return this.rightLimit - this.x
  }


  #invertedXCoordsWithoutLimiter(){
    return (this.game.width - this.width - this.x)
  }

  getRealCenterX(){ //colocar o ponto no centro
    if(this.isInitialOrientation())
        return this.x + this.width / 2
    else
      return this.#invertedXCoordsWithoutLimiter() + this.width / 2
  }

  #justRun = false
  #runnOnlyOneTime(){ //deve ser, obrigatoriamente chamado antes de todos os updates
    if(this.#justRun)
      return
    this.#realX = this.x
    this.#justRun = true
    if(!this.isInitialOrientation())
      this.setOrientation(this.orientation)
    this.editalbleRunnOnlyOneTime()
  }
  editalbleRunnOnlyOneTime(){ //subscrevivel

  }


  //escutador de mudança de orientação
  onOrientationChange(){}

  

  /**
   * Importante para encapsolar as funcoes de resize
   */
  callOnResizeWidth(){
    this.onScreenResize()
    this.setAllXLimit()
  } // deve ser subscrito

  //////////////Chamadas no resize do gameBuilder
  /**
   * actualiza o width
   */
  onScreenResize(){}

  /**
   * Importante para actualizar os limites horizontais do objecto
   */
  setAllXLimit(){
    this.rightLimit = this.game.width - this.xlimiter / 1.74
  }
  
  isInitialOrientation(){return this.orientation == GameObjectOrientation.right}
  
  /**rotorna a distancia de umobjecto */
  getDistanceOf(object){
    return Math.abs(this.getRealCenterX() - object.getRealCenterX())
  }


  
}

export default BaseObject