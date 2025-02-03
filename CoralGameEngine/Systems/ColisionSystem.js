import GameBuilder from "../GameBuilder.js";
import GameObject from "../GameObject.js";
import GameObjectColider from "../GameObjectColider.js"

/***
 * Essa classe lida com todos os gameObjects do tipo ObjectColider
 */
export default class ColisionSystem {
  constructor(game){
    if(game instanceof GameBuilder)
      this.game = game
    else
      throw "GameBuilder não definido"
    this.frames = 0
  }
  /**Chamado no game builder */
  checkColision(){
  if(this.game.pause) return //pausa para nao checar
   this.#getAllGameObjectWithColider()
   this.#listenColisionFromGameObjectWithColider()
  }
  #getAllGameObjectWithColider(){
    this.gameObjects = this.game.getAllObjects().filter( e => e.getColider && e.getColider() instanceof GameObjectColider)
  }

  /**Verificador de colisao implementado pela função check */
  #listenColisionFromGameObjectWithColider(){
    this.gameObjects.forEach( (obj) => {
      this.gameObjects.forEach(obj2 => {
        if(obj == obj2) return
        if(!obj.getColider().feel || !obj2.getColider().feel) return
        if(this.#isColidingHorizontaly(obj.getColider(), obj2.getColider())){
            obj.onColision(obj2)
            obj2.onColision(obj)
        }
      })
    })
  }

   #isColidingHorizontaly(colider1, colider2){
    if(this.#isTheFront(colider1, colider2)){
      return (this.#isInterCepting(colider1, colider2))
    }
  }
  #isTheFront(colider1, colider2){
    return this.#getSensor(colider1) <= this.#getSensor(colider2)  //se o colider 1 estiver afrente!
  }

  #isInterCepting(colider1, colider2){ //if col1 is on front
    return ( this.#frontExtension(colider1) - this.#behindExtension(colider2) >= -3 )
  }
  #frontExtension(colider){ //user on is interCepting function kkk muito top!
    return colider.width/2 + this.#getSensor(colider)
  }
  #behindExtension(colider){
    return this.#getSensor(colider) - colider.width/2 
  }

  /**verifica se o objecto rotacionou para recolocar a origem e retorna o ponto sensor*/
  #getSensor(objectColider){
    return objectColider.getRealCenterX() 
    
  }
}