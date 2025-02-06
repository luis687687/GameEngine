import GameImage from "../../CoralGameEngine/GameImage.js";
import GameText from "../../CoralGameEngine/GameText.js";


//Não preciso passar o screen porque ele ficará no container de um elemento que automaticamente coloca o screen component
export default class UserPontuation extends GameImage {

  constructor(game, useravatar, username, point = 0, x = 100, y = 270){
    super(game, "./sprites/gui/items1.png", 210, 80, 200, 50, x, y, 90, 28)
    this.username = username
    this.point = point
    this.useravatar = useravatar ? useravatar :  "./sprites/gui/avatar/8.png"
  }


  async childContent(){
    
    const y = 90
    
    
    return [
      new GameImage(this.game, this.useravatar, 116, 119, 40, 40, 20,y-10,0,0),
      new GameText(this.game, this.formatUName(), 15, 80,y),
      new GameText(this.game, this.point, 20, this.width*1.4, y)
    ]
  }

  formatUName(){

    if(!this.username) return "usuário"
    this.username = this.username.trim()
    const size = this.username.length
    if(size > 7)
      return `${(this.username.substring(0,5)).toUpperCase()}_${this.username[size-2]}${this.username[size-1]}`
    return this.username
  }
}