
import { AnimationType } from "./_utils/constants.js"
import GameObject from "./GameObject.js"

export default class AnimationState {
  #timer = 0
  constructor(gameObject, image, width, height){
    if(!(gameObject instanceof GameObject)) throw "Erro a animação deve receber a referencia de um GameObject"
    this.imgObject = document.createElement("img")
    this.image = image
    this.imgObject.src = this.image
    this.width = width
    this.height = height
    this.frameBottomPadding = 19
    this.frameHorizontalSpace = 0
    this.firstXSpace = 62
    this.frameX = this.firstXSpace
    this.frameY = 0
    this.gameObject = gameObject
    this.xFrameIteration = 0
    this.yFrameIteration = 0
    this.pastTime = 0
    
    this.frameRatio = 1.8
    this.fps = 24
    this.#timer = 0
    this.animationType = AnimationType.normal
    this.speed = 1
    this.keys  = this.gameObject.game.keys.actives //Actualiza as teclas activas  
   // this.rightLimit = this.gameObject.fixedrRightLimit //para garantir que a animação não saia da tela
  }
  
  /** Controla quando a animação começa, o dev, pode aproveitar disso chamando o onStart */
  enter(){
    if(this.gameObject instanceof GameObject){
      this.gameObject.actualAnimation = this
      this.onStart()
    }
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
    
    const end =  this.#wenCanEndAnimation()
    this.#changeFrame()
    if(!end)
    this.running() //controlador de execução enquanto animação roda
  }

  /**
   * Quando a animação para ?
   */
  #wenCanEndAnimation(){
    if(this.frameX + this.firstXSpace*this.frameRatio >= this.imgObject.width){
      this.frameX = this.firstXSpace
      this.xFrameIteration = 0
      this.animationEnd()
      return true
    }
    return false
  }

  /**
   * Chamar evento quando a animação para
   */
  animationEnd(){}

  /**
   * Serve para combinar com this.keys, afim de verificar se o usuário apartou alguma tecla durante a animação
   */
  onInput(key){} //entradas do teclado gerenciado pelo gameBuilder
  running(){} //Enquanto roda
  onStart(){} //Quando começa

  /**Actualiza frame localmente */
  #changeFrame(){
    this.frameX = this.isNormalMode() ? this.firstXSpace + this.xFrameIteration * (this.width + this.frameHorizontalSpace) : this.xFrameIteration
    this.xFrameIteration += this.isNormalMode() ? 1 : this.speed * this.gameObject.game.gameSpeed
  }
  /**Verifica o modo de animação, o outro modo não é muito necessário */
  isNormalMode(){
    return this.animationType == AnimationType.normal
  }
}