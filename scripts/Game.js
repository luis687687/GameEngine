import GameBuilder from "./core/GameBuilder.js";
import GameObject from "./core/GameObject.js";
import Player from "./GameObjects/Player/Player.js";

class Game extends GameBuilder {
  constructor(){
    super()
    this.teste = new Player(this)
    
   
    
  }
  update(){
    
  }
}



const game = new Game()