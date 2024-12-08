import GameBuilder from "../GameBuilder.js";
import GameObject from "../GameObject.js";
import GameObjectColider from "../GameObjectColider.js"

/***
 * Essa classe lida com todos os gameObjects do tipo ObjectColider
 */
export default class ColisionSystem {
  #minDinstanceToColide = 30
  constructor(game){
    if(game instanceof GameBuilder)
      this.game = game
    else
      throw "GameBuilder não definido"
    this.frames = 0
  }


  /**Chamado no game builder */
  checkColision(){
   this.#getAllGameObjectWithColider()
   this.#listenColisionFromGameObjectWithColider()
  }


  #getAllGameObjectWithColider(){
    this.gameObjects = this.game.allObjects.filter( e => e.getColider && e.getColider() instanceof GameObjectColider)
  }


  /**Verificador de colisao implementado pela função check */
  #listenColisionFromGameObjectWithColider(){
    this.gameObjects.forEach( (obj) => {
      this.gameObjects.forEach(obj2 => {
        if(obj == obj2) return
        if(!obj.getColider().feel || !obj2.getColider().feel) return
        const distance = ColisionSystem.getDistance(this.#getSensor(obj), this.#getSensor(obj2))
        if(distance <= this.#minDinstanceToColide)
          obj.onColision(obj2)
      })
    })
  }






  static getDistance(a, b){
    return Math.abs( a - b)
  }
  setMinDistanceToColide(val){
    if(isNaN(val))
      throw "Seta apenas numeros"
    this.#minDinstanceToColide = val
  }

  getMinDistanceToColide(){return this.#minDinstanceToColide}
  /**verifica se o objecto rotacionou para recolocar a origem e retorna o ponto sensor*/
  #getSensor(objectColider){
    return objectColider.getColider().getRealCenterX() 
    
  }
}