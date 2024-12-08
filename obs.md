# 🛹 BaseObject
Todo objecto da class BaseObject, são objectos de jogo

## GameObject


### TrackerGameObject
extende de GameObject, é um tipo de objecto de jogo que implementa a capacidade de usar um outro objecto de jogo como referencia
graças aos metodos 
Isso é util porque, para elementos como background, temos como referencia o elemento player, 
para monitorar o seu moviemnto, caso o player ordenar (codigo implementado no player), 
o background reage, no caso, se move

Os objectos da class TrackerGameObject, usam o safeUpdate, e não o update
Implementa o  métod referenceFrame, para acompanhar o frame da sua referencia




Importantes para configurar numa animação
frameRatio - controla a razão de multiplicação do controler que verifica se está no fim da animação e repete ela /quando mal setada animação fica a piscar, quanto maior for esse valor, mais soavel fica o pulo de quadro
width, height - dimensões do frame, o frame width, por exemplo deve ter a largura total de um frame com o objecto, e não simplesmente o uma região limitada ao objecto na imagem
frameY, frameX - posicoes do frame
fps - fps da animacao
firstXSpace - deve ser o espaço a direita do primeiro frame da imagem, muito importante


Um bom design pattern nas animações dos objectos feito no jogo, e na relação entre classes, e heranças, como a class Enemy, por exemplo que está bem construida, ou as animações bem herdadas

