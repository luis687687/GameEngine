import GameObject from "../../../../CoralGameEngine/GameObject.js"
import GameText from "../../../../CoralGameEngine/GameText.js"
import Back from "./Area/Back.js"
import Avatar from "./Avatar.js"
import HP from "./HP/HP.js"

export default class  HUD extends GameObject {
  constructor(game){
    super(game)
      this.visible = false
      this.hp = new HP(game)
      this.back = new Back(game)
      this.text = new GameText(game, "Luis Marques", 11, 0, 0)
      this.enemiesDiedText = new GameText(game, "mortes: 0", 11, 0, 0)
      this.enemiesDiedText.color = "blue"
      this.image = new Avatar(game)  
  }

  getHP(){
    return this.hp
  }
  update(){
    
    //this.enemiesDiedText.text = `mortes: ${this.game.enemiesDied}`
  }

  async childContent(){

    return [

    ]
  }

  
}