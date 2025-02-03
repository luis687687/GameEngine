export default class GravitySystem {
  constructor(game, gravity = 9.8, skyHeight){
    this.g = gravity
    this.skyHeight = skyHeight !== undefined ? skyHeight : game.height
  }
}