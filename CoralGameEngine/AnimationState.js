
import { AnimationType } from "./_utils/constants.js"
import GameObject from "./GameObject.js"
import SoundSystem from "./Systems/SoundSystem.js"

export default class AnimationState {
  #timer = 0
  constructor(gameObject, image, width, height){
    if(!(gameObject instanceof GameObject)) throw "Erro a animação deve receber a referencia de um GameObject"
    this.image = image
    this.width = width
    this.height = height
    this.gameObject = gameObject
    this.animationType = AnimationType.normal
    this.#frameSettings()
    this.#timersSettings()
    this.imageInstanteate()
    this.keys  = this.gameObject.game.keys.actives //Actualiza as teclas activas  
    this.sound = null
    this.pauseSensivity = true
    this.unremovesound = false
  }
  
  /** Controla quando a animação começa, o dev, pode aproveitar disso chamando o onStart */
  enter(){
    if(this.gameObject.canBePaused()) return
    if(this.gameObject instanceof GameObject){
        this.soundPlay()
      this.gameObject.actualAnimation = this
      this.initializeConfigs()
      this.onStart()
    }
  }

  initializeConfigs(){
    this.xFrameIteration = 0
  }

  /**Chamado no update do GameObject */
  updateFrame(){
      /**
     * Importante no uso do onInput
     */
   this.keys = this.gameObject.game.keys.actives //Actualiza as teclas activas
    this.onInput(this.keys) //controlador dos inputs em cada frame da animação
    if(this.gameObject.game.timer - this.#timer >= 1000/this.fps)//controla o fps
      this.#timer = this.gameObject.game.timer //actualiza o ultimo tempo esperado
    else
      return
    const end =  this.whenCanEndAnimation()
    this.changeFrame()
    if(!end)
    this.running() //controlador de execução enquanto animação roda
  }

  /**
   * Quando a animação para ?
   */

  conditionToEnd(){
    return this.frameX + this.firstXSpace*this.frameRatio >= this.imgObject.width
  }
  internalAnimationEndConfig(){
    this.frameX = this.firstXSpace
    this.xFrameIteration = 0
  }
  whenCanEndAnimation(){
    if(this.conditionToEnd()){
      this.internalAnimationEndConfig()
      this.onEnd()
      return true
    }
    return false
  }

  /**
   * Chamar evento quando a animação para
   */
  onEnd(){}

  /**
   * Serve para combinar com this.keys, afim de verificar se o usuário apartou alguma tecla durante a animação
   */
  onInput(key){} //entradas do teclado gerenciado pelo gameBuilder
  running(){} //Enquanto roda
  onStart(){} //Quando começa

  /**Actualiza frame localmente */
  changeFrame(){
    if(this.gameObject.canBePaused() && this.pauseSensivity) return
    this.frameX = this.isNormalMode() ? this.firstXSpace + this.xFrameIteration * (this.width + this.frameHorizontalSpace) : this.xFrameIteration
    this.xFrameIteration += this.isNormalMode() ? 1 : this.speed * this.gameObject.game.gameSpeed
  }
  /**Verifica o modo de animação, o outro modo não é muito necessário */
  isNormalMode(){
    return this.animationType == AnimationType.normal
  }

  soundPlay(){
    
    if(this.sound instanceof SoundSystem){
      this.sound.setVolume(1)
     this.sound.playOnAnimation()
    }
  }
  soundPause(){
    if(this.sound){
      this.sound.currentTime = 0
      this.sound.pause()
    }
  }
  setSound(sound){
    this.sound = sound
  }



  /**setings */

  #frameSettings(){    //configurações iniciais dos frames
    this.frameBottomPadding = 19
    this.frameHorizontalSpace = 0
    this.firstXSpace = 62
    this.frameY = 0
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    this.frameRatio = 1.8
    this.frameX = this.firstXSpace
  }

  /**Controladores de tempo */
  #timersSettings(){
    this.pastTime = 0
    this.fps = 24
    this.#timer = 0
    this.speed = 1
  }

  imageInstanteate(){
    this.imgObject = document.createElement("img")
    this.imgObject.src = this.image
  }


  #animationCanBePaused(){
    
  }

 
}