import BaseObject from "./BaseObject.js"

export default class GameObjectColider extends BaseObject {
  constructor(game, width, height, x, y){
    super(game,  width, height)
    //this.debug = true
    this.backgroundColor = "transparent"
    this.feel = true //indica se é sentivel
    this.typeColider = true
    
  }

  update(){
    if(this.feel)
      this.debugColor = "green"
    else
      this.debugColor = "black"
  }


  


    /**
   * Esse método serve para ser chamado quando dois ObjectColider colidem
   * @param {*} objectColided 
   */
  // setColidedObject(objectColided){
  //   this.objectColided = objectColided
  //   this.onColision(objectColided) //para ser subscrito
  // }
}