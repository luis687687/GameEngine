import Animator from "../../../../CoralGameEngine/Animator.js";


export class Life1 extends Animator {

  constructor(obj) {
    super(obj, "./sprites/gui/lifebar", 733, 110, 5)
    this.fps = 0
  }
}


export class Life2 extends Animator {

  constructor(obj) {
    super(obj, "./sprites/gui/lifebar", 733, 110, 5)
    this.fps = 0
  }
  onStart(){
    this.setIndex(1)
  }
}

export class Life3 extends Animator {

  constructor(obj) {
    super(obj, "./sprites/gui/lifebar", 733, 110, 5)
    this.fps = 0
  }
  onStart(){
    this.setIndex(2)
  }
}

export class Life4 extends Animator {

  constructor(obj) {
    super(obj, "./sprites/gui/lifebar", 733, 110, 5)
    this.fps = 0
  }
  onStart(){
    this.setIndex(3)
  }
}

export class Life5 extends Animator {

  constructor(obj) {
    super(obj, "./sprites/gui/lifebar", 733, 110, 5)
    this.fps = 0
  }
  onStart(){
    this.setIndex(4)
  }
}