export default class GameInput {
  constructor(){
    this.actives = []
    this.#onInput()
    this.#onDocumnetVisibly()
  }

  #onInput(){
    
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

  #onDocumnetVisibly(){
    document.addEventListener("visibilitychange", ()=>{
      if(document.visibilityState === "hidden")
        this.actives = []
    })
  }
}