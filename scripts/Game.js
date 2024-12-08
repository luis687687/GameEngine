import GameBuilder from "../CoralGameEngine/GameBuilder.js";
import GameObject from "../CoralGameEngine/GameObject.js";
import Back2 from "./GameObjects/Background/Back2/Back2.js";
import Back3 from "./GameObjects/Background/Back3/Back3.js";
import { Back4 } from "./GameObjects/Background/Back4/Back4.js";
import Ceil from "./GameObjects/Background/Ceil/Ceil.js";
import { Sky } from "./GameObjects/Background/Sky/Sky.js";
import { Mashroom } from "./GameObjects/Enemies/Mashroom/Mashroom.js";
import Player from "./GameObjects/Player/Player.js";

class Game extends GameBuilder {
  constructor(){
    super()

    this.sky = new Sky(this)
    this.back4 = new Back4(this)
    this.back3 = new Back3(this)
    this.back2 = new Back2(this)
    this.background = new Ceil(this)
    this.person = new Player(this)
    this.mashroom = new Mashroom(this)
    

  }
  update(){
    
  }

  
}



const game = new Game()