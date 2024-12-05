export default class GameInput {
  constructor(){
    this.actives = []
    this.onInput()
  }

  onInput(){
    
    window.addEventListener("keydown", (action) => {
      const key = action.key
      if(!this.actives.includes(key))
        this.actives.push(key)
    })

    window.addEventListener("keyup", (action) => {
      const key = action.key
      this.actives = this.actives.filter( (e) => e != key)
    })
  }
}