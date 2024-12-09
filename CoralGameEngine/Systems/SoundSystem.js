export default class SoundSystem {
  constructor(src, loop = false, volume = 1, velocity = 1, ){
    this.sound = new Audio()
    this.sound.src = src
    this.sound.volume = volume
    this.sound.loop = loop
    console.log(this.sound.playbackRate, "initial")
    this.sound.playbackRate = velocity
    this.shoosed = false

    
  }


  play(){
    this.sound.play().catch(() => {
      window.addEventListener("keydown", ()=> {
        if(this.shoosed) return
        this.shoosed = true
        this.sound.play()
      }, {once: true})

      window.addEventListener("click", ()=> {
        if(this.shoosed) return
        this.shoosed = true
        this.sound.play()
      }, {once: true})

      window.addEventListener("keyup", ()=> {
        if(this.shoosed) return
        this.shoosed = true
        this.sound.play()
      }, {once: true})
      
    })
  }
  pause(){
    this.sound.pause()
    this.sound.currentTime = 0
  }


  playOnAnimation(){
    this.sound.play().catch(e => { })
  
  }

  isRunning(){
    return !this.sound.paused
  }
}