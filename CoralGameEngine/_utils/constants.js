export const KeyMap = {
  right: 0,
  left: 1,
  top: 2,
  down: 3
}

/**
 * Inidca se o objecto é o não rotacionavel a 180deg no eixo y
 */
export const GameObjectOrientation = { 
  right: 0,
  left: 1
}

/**
 * Controla o modo de animação, se a taxa de fps pula quadro pixelados, ou um pixel por vez
 * Melhor Usado para imagens compridas com muitos estados de animação!
 */
export const AnimationType = { 
  normal: 0,
  smooth: 1,
}