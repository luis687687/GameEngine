
import GameInput from "./Controllers/GameInput.js"
import GameObject from "./GameObject.js"
import GameScreen from "./GameScreen.js"
import ColisionSystem from "./Systems/ColisionSystem.js"
import GravitySystem from "./Systems/GravitySystem.js"
import BackgroundObject from "./BackgroundObject.js"



//var self
class GameBuilder {
  #gravitySystem
  #allObjects = []
  constructor(floor=0) {
    this.rate = 1000 //por segundo
    this.fps = 24
    this.floor = floor
    //self = this //ja nem vou usar
    this.paddingX = 5
    this.paddingY = 4
    this.spaceId = "game"
    this.started = true
    this.#areaBuilder()  //antes dos demais!!!

    this.keys = new GameInput(this)

    this.#get2DContext() // garante que o game area exista ao construir o objecto geral
    this.#persistDimensionOnResizing() // garante que a quantidade de pixel no canvas seja o mesmo que a dimensão do canvas ao resizar a tela
    this.animate() // cria o chamador dos updates
    this.gameSpeed = 1.5
    this.timer = 0
    this.colisionSystem = new ColisionSystem(this)
    this.#gravitySystem = new GravitySystem(this)

    //pauser
    this.pause = false
  }
  /***
   * Actualizações globais no jogo
   */
  update(){ // Para ser subscrito

  }

  setGravity(g, height){
    if(!g) throw "Erro, informe a aceleração da gravidade"
    this.#gravitySystem.g = g
    this.#gravitySystem.skyHeight = height ? height : this.game.height
  }
  /**
   * Responsavel por chamar os metodos update de todos os elementos do jogo, infinitamente
   */
  
  animate(){ 
    //if(!this.pause) //se for para pause, nao clear a tela
      this.context.clearRect(0,0, this.width, this.height)
    requestAnimationFrame((params) => {
      this.timer = params
      if(this instanceof GameBuilder){
        this.animate()
        // if(this.pause){ 
        //   this.#updateGameScreenOnlyWhenGameIsPaused()
        //   return 
        // }//se esta em pausa não actualiza nada, mas ainda invoca o animate, que contem animation frame
        this.colisionSystem.checkColision()
        this.update()
        this.#updateAllGameObjects()
        }


        // if(self instanceof GameBuilder){
        //   self.animate()
        //   self.colisionSystem.checkColision()
        //   self.update()
        //   self.#updateAllGameObjects()
        //   }
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

    // that.height = parseInt(that.height*0.9)
    // that.width = parseInt(that.width*0.9)

    console.log(that.width, that.height)
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
  recognizeChildren(gameObject){ //utilizado sempre que se cria um gameObject novo
    if(!this.#allObjects.includes(gameObject)) //melhorar caso necessario
      this.#allObjects.push(gameObject)
  }



  /**
   * Responsavel por desenhar em cada frame todos os elementos do jogo
   */
  #updateAllGameObjects(){
    this.#putAllBackgroundObjectToStart() //coloca os back no inicio, sempre
    this.#putAllGameScreenToTheEnd() //as screens no final, sempre
    for(const gameObject of this.#allObjects){
      gameObject.updateAndDraw()
    }
  }



  /**Redimensiona a tela no resize do navegador */
  #persistDimensionOnResizing(){
    const that = this
    window.onresize = function(){
      that.#setDimensionFromCssStyle()
      that.#updateAllOfChildrenRelationsWithDimension()
    } 
  }


  /**Actualiza as larguras dos objectos, quando redimensionado */
  #updateAllOfChildrenRelationsWithDimension(){
    
    this.#allObjects.map((obj) => {
      if(obj instanceof GameObject){
        obj.callOnResizeWidth()
      }
    })
  }

  /**Garantir que todos os games screen estejam no final do array, com os seus gameobjects devidamente posicionados */
  #putAllGameScreenToTheEnd(){
    const gameScreens = this.#removeGameScreenWithTheirChilds() //importante!!!!!!!
    const gameScreenWithTheirChilds = [] //organizar os gamescreen com os seus filhos
    for(let gs of gameScreens){
      const childs = gs.getChilds()
      gameScreenWithTheirChilds.push(gs)
      for(let child of childs) gameScreenWithTheirChilds.push(child)

    }
    this.#allObjects = [...this.#allObjects, ...gameScreenWithTheirChilds]
  }
  //auxiliar da função de cima!
  #removeGameScreenWithTheirChilds(){
    const gameScreens = this.#allObjects.filter((go) => go instanceof GameScreen)
    this.#allObjects = this.#allObjects.filter( go => !(go instanceof GameScreen))
    for(let gs of gameScreens){
      const childs = gs.getChilds()
      for(let child of childs){
        this.#allObjects = this.#allObjects.filter( go => go != child)
      }
    }
    return gameScreens
  }

  #putAllBackgroundObjectToStart(){
    const backGrounds = this.#allObjects.filter(go => go instanceof BackgroundObject)
    this.#allObjects = this.#allObjects.filter(go => !(go instanceof BackgroundObject))
    this.#allObjects = [...backGrounds, ...this.#allObjects]
  }

  /**
   * Remove um objecto do jogo
   */
  removeObject(gameObject){  
    if(gameObject instanceof GameScreen){
      this.removeObjectScreen(gameObject)
    }
    this.#allObjects.forEach( e => {
      if(e instanceof GameScreen){
        e.allChilds = e.getChilds().filter( e => e != gameObject)
      }
    })
    console.log(this.#allObjects.includes(gameObject), " Tem mesmo ?")
    this.#allObjects = this.#allObjects.filter( e => e != (gameObject))
  }
  removeObjectByType(ObjectType){
    this.#allObjects = this.#allObjects.filter( e =>  {
      if( e instanceof ObjectType) {
        e.destroy()
        return false
      }
      else return true
    })
  }

  removeScreen(ScrenType){
    console.log(ScrenType, " rrrmmm")
    this.#allObjects.filter( e =>{ 
      if(e == ScrenType)
        e.removeAllChilds()
      else
        if(e instanceof ScrenType){
          e.removeAllChilds()
        }
    })
    this.#allObjects.filter( e =>{ 
      if(e instanceof ScrenType){
        e.destroy()
      } } )
    
  }


  removeObjectScreen(ScreenObject){
    
    this.#allObjects.filter( e =>{ 
      if(e == ScreenObject)
        e.removeAllChilds()
    })    
  }
  
  /**Retorna o conjunto de filhos que pertence a um certo tipo */
  getChilds(ObjType){
    return this.#allObjects.filter( e => e instanceof ObjType)
  }

  getAllObjects(){return this.#allObjects }

  getGravity(){
    return this.#gravitySystem
  }

  
}





export default GameBuilder