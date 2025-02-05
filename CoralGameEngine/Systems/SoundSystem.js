export default class SoundSystem {
  constructor(src, loop = false, volume = 1, velocity = 1, ){
    this.sound = new Audio()
    this.sound.src = src
    this.sound.volume = volume
    this.sound.loop = loop
    // console.log(this.sound.playbackRate, "initial")
    this.sound.playbackRate = velocity
    this.shoosed = false //ja aberta por uma das opções

    
  }

  setVolume(vol){
    this.sound.volume = vol
  }

  play(){
    this.sound.play().then(e => {
      this.shoosed = true
    }).catch((e) => {
      //Ajuda a reforçar o autoplay, caso o play de cima falhar
      // console.log("Deu erro aqui ! ", e)
      this.#playWhenKeyDown() //espera uma tecla pressionada
      this.#playWhenClicked() //espera um click do teclado, ou screen
     


      
    })
  }

  #playWhenKeyDown(){
    window.addEventListener("keydown", ()=> {
      if(this.shoosed) return
      // console.log("Tecla down")
      this.play()
    }, {once: this.shoosed})
  }

  #playWhenClicked(){
    window.addEventListener("click", ()=> {
      if(this.shoosed) return
      // console.log("Tecla click")
      this.play()
    }, {once: this.shoosed})
  }

  pause(){
    this.sound.pause()
    this.sound.currentTime = 0
  }


  playOnAnimation(){
    this.sound.currentTime = 0
    this.sound.play().catch(e => { })
  
  }

  isRunning(){
    return !this.sound.paused
  }
}