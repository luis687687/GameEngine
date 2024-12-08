import GameObject from "./GameObject.js"

/**
 * Esse tipo de GameObject pode pegar uma referencia de outro objecto
 * Util para fazer, por exemplo, o background pegar a referencia do player em movimento
 */
export default class TrackerGameObject extends GameObject {
  constructor(game){
    super(game)
    this.keys = this.game.keys.actives
   
  }
  /**para ser subscrito */
  safeUpdate() {}
  /**subscrevendo */
  update(){
    
    this.safeUpdate()
    this.keys = this.game.keys.actives //actualiza as chaves
    this.referenceFrame(this.reference)
    
  }
  /**Intercala o update e pega o objecto de referencia do jogo */
  referenceFrame(){} //**para ser subscrito */
  /**Faz dois desenhos */
  setObjectReference(reference){
    this.reference = reference
  }
}