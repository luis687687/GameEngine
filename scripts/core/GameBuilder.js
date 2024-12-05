import GameInput from "./Controllers/GameInput.js"
import GameObject from "./GameObject.js"



var self
class GameBuilder {
  constructor() {
    this.timer = 0
    this.normalFPS = 1000 //por segundo
    this.fps = 24
    self = this
    this.paddingX = 5
    this.paddingY = 4
    this.spaceId = "game"
    this.allObjects = []
    this.keys = new GameInput()
    this.#areaBuilder() 
    this.#get2DContext() // garante que o game area exista ao construir o objecto geral
    this.#persistDimensionOnResizing() // garante que a quantidade de pixel no canvas seja o mesmo que a dimensão do canvas ao resizar a tela
    this.animate() // cria o chamador dos updates
    this.gameSpeed = 1.5
    this.timer = 0
  }

  /***
   * Actualizações globais no jogo
   */
  update(){ // Para ser subscrito

  }

  /**
   * Responsavel por chamar os metodos update de todos os elementos do jogo, infinitamente
   */
  animate(){ 
    this.context.clearRect(0,0, this.width, this.height)
    requestAnimationFrame((params) => {
      if(params - this.timer >= 1000/this.fps){
        this.timer = params
      }
      
      if(!self)
        return
        self.animate()
        self.update()
        self.#updateAllGameObjects()
      })
  }
  /**
   * Cria o canvas
   */
  #areaBuilder(){
    this.area = document.createElement("canvas")
    this.area.setAttribute("id", "game_area")
    if(this.spaceId)
      this.#areaBuilderFromId()
    else
      document.body.appendChild(this.area)
    this.#setDimensionFromCssStyle()
  }

  /**
   * Preenche os campos width, e height do objecto, vindo do css style do canvas
   */
  #setDimensionFromCssStyle(){
    const that = this
    const styles=  getComputedStyle(that.area)
    that.width = +styles.width.replaceAll("px","")
    that.height = +styles.height.replaceAll("px","")
    that.area.setAttribute("width", that.width)
    that.area.setAttribute("height", that.height)
    
  }

  /**
   * Caso tenha um id definido para a area do canvas, monta o canvas na area
   */
  #areaBuilderFromId(){
    const space = document.getElementById(this.spaceId)
    if(!space) throw `Element id ${this.spaceId} not exists!`
    this.area.setAttribute("id", "game_area")
    space.appendChild(this.area)
  }
  #get2DContext(){
    this.context = this.area.getContext("2d")
  }

  /**
   * Reconhece a classe filho e recolhe todos os GameObject em uma lista de GameObjects
   *  init function
   */
  recognizeChildren(gameObject){
    this.allObjects.push(gameObject)
  }


  #drawAllGameObjects(){
    for(const gameObject of this.allObjects)
      gameObject.draw()
    
  }

  #updateAllGameObjects(){
    for(const gameObject of this.allObjects){
      gameObject.updateAndDraw()
    }
    
  }

  #persistDimensionOnResizing(){
    const that = this
    window.onresize = function(){
      that.#setDimensionFromCssStyle()
      //that.#drawAllGameObjects() // garantir o desenho, depois de resetar a dimensão do canvas
    }
  }

  /**
   * Remove um objecto do jogo
   */
  removeObject(gameObject){
    this.allObjects = this.allObjects.filter( e => e != (gameObject))
  }
  
}





export default GameBuilder