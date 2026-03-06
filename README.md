

# 🎲 DADOKOMBAT

DADOKOMBAT é um jogo de batalha feito em Node.js que roda no terminal.
Dois jogadores se enfrentam usando cartas, dados e estratégia.

### 🎯 Objetivo: reduzir a vida do adversário a 0.

---

## ⚔️ Como o jogo funciona

Cada jogador começa com:

❤️ 25 de vida

⚡ 10 de energia

A cada turno:

Cada jogador compra 3 cartas aleatórias

Escolhe 1 carta para usar

A carta consome energia

Os dados são rolados

O jogador com maior resultado vence o confronto

💥 O dano é a diferença entre os resultados dos dados.

---
## 🃏 Tipos de cartas

O jogo possui dois tipos de cartas:

⚔️ Ataque

Causa dano ao adversário.

🛡️ Defesa

Se vencer o confronto, o jogador recupera vida em vez de causar dano.

Cada carta possui:

Nome

Tipo

Quantidade de dados

Bônus

Custo de energia

---
## ⚡ Recuperação de energia

O jogador pode pressionar ENTER sem escolher carta para recuperar energia.

Recupera +3 de energia

Energia máxima: 10

Se os dois jogadores fizerem isso, nenhum ataque acontece no turno.

---
## 🎲 Sistema de dados

Cada carta rola uma quantidade de dados.

Exemplo:

Carta com 3 dados

Resultado dos dados: 2, 5, 4

Total:

2 + 5 + 4 + bônus da carta

O maior total vence.

---
## 🏆 Vitória

O jogo termina quando a vida de um jogador chega a 0 ou menos.

Exemplo de mensagem:

PLAYER 1 VENCEU!

ou

PLAYER 2 VENCEU!

---
## ▶️ Como executar o jogo

Instale o Node.js

Execute no terminal:

node jogo.js
