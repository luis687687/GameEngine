
import { ImageElement } from "./_helpers/ImageElement.js"
import { GameObjectOrientation } from "./_utils/constants.js"
import AnimationState from "./AnimationState.js"
import Animator from "./Animator.js"
import GameBuilder from "./GameBuilder.js"



class BaseObject{

  #realX = 0 //Esse é importante, principalmente para os objectos que rotacionam no eixo y e perdem a referencia base
  static objectId = 0 //permite identificar unicamente cada objecto
  #maxHeight = 5
  constructor(game, width = 210, height = 190, use_gravity, tagname){
    this.game = game
    this.imgElement = undefined
    this.tagname = tagname
    if(this.game instanceof GameBuilder){
      this.game.recognizeChildren(this) //super importante para adicionar os filhos no pack gerenciador de filhos do gamebuilder
      this.animations = []
      this.width = width
      this.height = height
      this.actualAnimation = null
      this.orientation = GameObjectOrientation.right
      this.debug = false
      this.#setLimiters()
      this.#setAparence()
      this.createReferenciedsFunctions() //**funcoes para objectos de referencias instaciarem referiensas em arrays */
      this.#setAllXLimit()
      BaseObject.objectId++
      this.visible = true
      this.use_gravity = use_gravity
      this.ay = 0
      this.pausePassible = true
      this.#instanteateContainedsChilds()
      this.#maxHeight = this.game.paddingX
      this.use_sensibility = true //click do user pode afectar
      

    }
    else 
      throw "Erro passe a uma instancia do Game"
    
  }

  
  update(){ }//para ser subscrito

  #initialX = 0
  setItInitialX(v){
    this.#initialX = v
  }
  getItInitialX(){return this.#initialX}

  updateWithMyColider(){}

  updateWithMyChilds(){}
  /**
   * Desenha objecto e coloca no this.game.context
   */
  draw(){
    if(!this.visible) return
    if(this.game instanceof GameBuilder){ //Bom para receber sugestoes do vs code
      this.game.context.save() //salva o contexto anterior antes de rotacionar, caso haja rotacao 
      this.#drawerDirection()
      if((this.actualAnimation instanceof AnimationState)){
        this.drawerImageFromAnimation()
        this.actualAnimation.updateFrame()
        this.drawerDebug(this.x, this.y, this.width, this.height)
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
    const isAnimator = this.actualAnimation instanceof Animator
    let image = this.actualAnimation.imgObject
    if(isAnimator){
      image = this.actualAnimation.imgObject[this.actualAnimation.getIndex()]
      
      if(!image.complete){
       // console.log("Não completa ", image, image.complete)
        return
      }
      if(!this.actualAnimation.ready){
//         console.log("Não ready ", image, this.actualAnimation.loadeds)
        return
      }
      
      
    }

    
    this.game.context.drawImage(
       image, 
       isAnimator ? this.actualAnimation.frameX : this.actualAnimation.frameX-30, 
      this.actualAnimation.frameY, this.actualAnimation.width, 
      this.actualAnimation.height, 
      this.x, this.y, this.width, this.height)
  }
  /**
   * Serve para ver a area do objecto
   */
  drawerDebug(x, y, w, h){
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
    this.drawerDebug(x,y,w,h)
  }
  
  /**
   * 
   * @returns 
   */

  moveRight(vel){
    if(this.canBePaused()) return
    
    if(!this.move)
      return
    
    if(this.limitedHorizontal)
      if(this.x >= this.rightLimit){
        
        return
      }
      
    this.x += (vel ? vel : this.speed) * this.game.gameSpeed
    this.listenRigthMoviment()
    
  }

  canBePaused(){
    return this.pausePassible && this.game.pause
  }

  /**Escutadores de movimento */
  listenRigthMoviment(){}
  listenLeftMoviment(){}
  listenUpMoviment(){}
  listenBottomMoviment(){}
  listenGravityEffect(){}
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

  moveLeft(vel){
    
    if(this.canBePaused()) return
    
    if(!this.isInitialOrientation()){ //sentido de direcção mudou kkkkkk interessante
      
      return this.moveRight(vel)
    }
    if(!this.move)
      return
    if(this.limitedHorizontal)
      if(this.x <= this.game.paddingX)
        return
    this.x -= (vel ? vel : this.speed) * this.game.gameSpeed
    this.listenLeftMoviment()
   
  }

  moveUp(){
    if(this.canBePaused()) return
    if(!this.move)
      return
    if(this.limitedVertical)
      if(this.isAtMaxHeight())
        return
    this.y -= this.speed * this.game.gameSpeed
    this.listenUpMoviment()
   
  }

  isAtMaxHeight(){return this.y + this.height/3 <= this.#maxHeight}
  getMaxHeight(){ return this.#maxHeight}
  moveBottom(){
    if(this.canBePaused()) return
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
   * controlado pelo animationFrame numa taxa de 1000 fps default! mas alguns métodos tem a sua propria implementação fps
   */

  updateAndDraw(){
    this.#runnOnlyOneTime()
    this.draw()
    this.update()
    this.updateWithMyColider()
    this.updateWithMyChilds()
    this.onUpdateScreenComponent()
    this.#setAllXLimit()
    this.#onGravityController()
  }

  
  onUpdateScreenComponent(){}
  

  //gerenciador de controlador de gravidade, se o object é sensivel a gravidade, se está no chao, a aceleração passa à zero, se não 
  #onGravityController(){
    if(!this.use_gravity) return
    if(this.onground()) {
      this.ay = 0
      return
    }
  
   this.#gravityController()
   
  }

  #gravityController(){
    this.ay += this.game.getGravity().g /this.game.rate //aceleração do corpo mundando
    this.y += this.ay //velocidade de queda
    this.listenGravityEffect()
  }


  /**
   * Destroi o objecto, removendo ele do jogo, chamando o this.game.removeObject(this)
   */
  destroy(){
    
    if(this.containedChilds)
      this.containedChilds.forEach(e => {
        e.destroy()
    })
    console.log("indd")
    this.game.removeObject(this)
    this.onDestroy()
    this.#muteAllSoundAnimation()
  }

  
  
  onDestroy(){}

  /**
   * Escolhe a animao actual no vector de animações
   * @param {*} animationType 
   */
  enterToAnimation(animationType){
    this.#muteAllSoundAnimation(true) //muito top!!!
    this.animations.forEach(animation => {
      if(animation instanceof animationType)
        animation.enter()
    })
  }

  #muteAllSoundAnimation(checkAnRemovedSounds){
    this.animations.forEach(animation => {
      if(! (animation instanceof AnimationState)) return
      if(checkAnRemovedSounds)
        if(animation.unremovesound) return
        animation.soundPause()
    })
  }

  // Verifica se o objecto está no limite inferior (chao - default)
  onground(){
    return this.y >= this.inferiorLimit
  }

  //Serve para definir o sentido do movimento do objecto, caso tenha uma imagem
  setOrientation(orientation){
    if(this.canBePaused()) return 
    if(!this.move) return
    if(orientation != GameObjectOrientation.left && orientation != GameObjectOrientation.right)
      return //not valid orientation
    this.orientation = orientation
    let ante = this.x
    this.x = this.#invertedXCoord() //inversor de
    this.onOrientationChange(orientation, ante, this.rightLimit)
    this.onRefereCieOrientations.forEach(eventListener => eventListener())
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
    this.#setAllXLimit()
  } // deve ser subscrito

  //////////////Chamadas no resize do gameBuilder
  /**
   * actualiza o width
   */
  onScreenResize(){}

  /**
   * Importante para actualizar os limites horizontais do objecto
   */
  #setAllXLimit(){
    this.floor = this.game.floor
    this.rightLimit = this.game.width - this.xlimiter / 1.74
  }
  
  isInitialOrientation(){return this.orientation == GameObjectOrientation.right}
  
  /**rotorna a distancia de umobjecto */
  getDistanceOf(object){
    return Math.abs(this.getRealCenterX() - object.getRealCenterX())
  }


  /**Para o funcionamento de objectos com referencias */
  createReferenciedsFunctions(){
    this.onRefereCieOrientations = []
    this.containedChilds = []
  }

  #setLimiters(){ //define os limitadores da apresntação do gameobject
    this.xlimiter = this.width-this.width/2
    this.ylimiter = this.height //valor a somar no limit y 
    this.inferiorLimit = this.game.height - this.ylimiter - this.game.floor // -> muito lógico, dá ideias de que o limite inferior é a parte de baixo do elemento visível, graças ao ylimiter igual a altura do elemento
    this.y = this.inferiorLimit
    this.x = 0
    this.limitedHorizontal = false
    this.limitedVertical = false
    this.speed = 1
    this.leftLimiter = this.width
    this.topLimiter = this.height
    this.#realX = this.x //valor de x independente da rotacao
  }

  #setAparence(){ /**Configura a aprensentação base */
    this.move = true
    this.debugColor = "blue"
    this.backgroundColor = "red"
    
   
  }


  #realYValue
  getRealYValue(){
    return this.#realYValue
  }
  
  altereY(val){
    this.y -= val;
    this.#realYValue += val

  }
    setY(val){
    this.#realYValue = val
     if(this.limitedVertical) {
        this.y = this.game.height - this.height - this.game.floor - val
     }else{
      
      this.y = this.game.height - val
    }
  }

  setYWithVerticalLimit(y){
    this.limitedVertical = true
    this.setY(y)
  }


  //sensibilidades
  restrictOnSensibility(activity){
    this.onClick(activity)
    this.callOnClick()
  }
  onClick(){}
  callOnClick(){}

  setMaxHeight(v){
    this.#maxHeight = this.game.height - v
  }



  /////
  async childContent(){
    return "luis marques "//retorno que indica que ainda não subscreveram o childContent
  }

  //
  #instanteateContainedsChilds(){
    setTimeout( _ => { //gamb
      // console.log("dalay to put childContent")
      const callFunc = this.childContent()
      if(! (callFunc instanceof Promise) ) throw "Erro de implementação: childContent deve ser async function"
      callFunc.then( containeds => {
        if(typeof containeds == 'string') return
        this.containedChilds = containeds;
        // console.log(this.containedChilds, " Hack")
        if(!this.containedChilds?.forEach) throw "Erro de implementação: childContent precisa retornar array de objectos de jogo"
        this.containedChilds.forEach(child => {
          child.x += this.x
          child.father = this
          const val_to_up = this.getRealYValue() - this.height + child.height

          if(child.y - val_to_up > child.y) //essa operação é uma gambiarra a analisar
            child.y = child.y - this.getRealYValue() - this.height + child.height //se ao invez de elemento relativo baixar e não subir
          else
            child.y -= val_to_up //caso contrario

          
          // child.y -= (this.game.height - this.getRealYValue()) + this.height - child.height
          //importante para components de screen
          if(this.screen && child.setScreen) //se tiver um screen e o child for setável, então colocar no mesmo screen
            child.setScreen(this.screen) //seta o screen do filho
          if(this.iamgamescreen && child.setScreen)
            child.setScreen(this)
          
        })
      })
      
    }, 1)
  }


  
  


  
}

export default BaseObject