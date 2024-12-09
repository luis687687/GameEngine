import Area from "../Area/Area.js";

export default class HP extends Area{
  constructor(game){
    super(game, "../../../../sprites/hud/hud_hp.png")
    this.images = [
      "../../../../sprites/hud/hud_hp.png",
      "../../../../sprites/hud/hud_hp1.png",
      "../../../../sprites/hud/hud_hp2.png",
      "../../../../sprites/hud/hud_hp3.png",
      "../../../../sprites/hud/hud_hp4.png"
    ]
    this.index = 0
    this.cont = 0
    this.just = false
    
  }

  setImage(index){
    this.index = index
    this.image.src = this.images[index]
  }
  update(){
    //if(this.index == this.images.length - 1)
   if(this.game.timer - this.cont >= 2000)
   {
    this.setImage(this.x + 1)
    this.cont = this.game.timer
    console.log("jj")
   }
  }
}