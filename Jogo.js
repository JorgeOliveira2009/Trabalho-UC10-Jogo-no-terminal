const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let vida1 = 40
let vida2 = 40

const cartas = [
  { nome: "Golpe rápido", dados: 1, bonus: 2 },
  { nome: "Ataque pesado", dados: 2, bonus: 0 },
  { nome: "Força total", dados: 3, bonus: -2 }
]

function comprarCartas(qtd) {
  let mao = []

  for (let i = 0; i < qtd; i++) {
    let indice = Math.floor(Math.random() * cartas.length)
    mao.push(cartas[indice])
  }

  return mao
}

function mostrarCartas(mao) {
  for (let i = 0; i < mao.length; i++) {
    let carta = mao[i]
    console.log(
      i + 1 + " - " + carta.nome +
      " | Dados: " + carta.dados +
      " | Bônus: " + carta.bonus
    )
  }
}

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1
  
}

 function rolarMultiplosDados(qtd) {
  let total = 0
  for (let i = 0; i < qtd; i++) {
    total += rolarDado()
  }
  return total
}

function turnoJogo() {
  console.log("\n====================")
  console.log("Vida P1:", vida1)
  console.log("Vida P2:", vida2)
  console.log("====================\n")

  let maoP1 = comprarCartas(3)
let maoP2 = comprarCartas(3)

console.log("\nPlayer 1 comprou:")
mostrarCartas(maoP1)

console.log("\nPlayer 2 comprou:")
mostrarCartas(maoP2)

  rl.question("\nPlayer 1 - Escolha o número da carta: ", function (resposta1) {

    let cartaP1 = maoP1[parseInt(resposta1) - 1]

    if (!cartaP1) {
      console.log("Escolha inválida!")
      return turnoJogo()
    }

    rl.question("Player 2 - Escolha o número da carta: ", function (resposta2) {

      let cartaP2 = maoP2[parseInt(resposta2) - 1]

      if (!cartaP2) {
        console.log("Escolha inválida!")
        return turnoJogo()
      }

      console.log("\n---CLASH---")

      let total1 = rolarMultiplosDados(cartaP1.dados) + cartaP1.bonus
      let total2 = rolarMultiplosDados(cartaP2.dados) + cartaP2.bonus

      console.log("Player 1 usou:", cartaP1.nome, "→ Total:", total1)
      console.log("Player 2 usou:", cartaP2.nome, "→ Total:", total2)

      if (total1 > total2) {
        let dano = total1 - total2
        vida2 -= dano
        console.log("Player 1 venceu! Dano:", dano)
      } 
      else if (total2 > total1) {
        let dano = total2 - total1
        vida1 -= dano
        console.log("Player 2 venceu! Dano:", dano)
      } 
      else {
        console.log("Empate! Nenhum dano causado.")
      }

      if (vida1 <= 0) {
        console.log("\nPlayer 2 venceu! FATALITY...")
        rl.close()
      } 
      else if (vida2 <= 0) {
        console.log("\nPlayer 1 venceu! FATALITY...")
        rl.close()
      } 
      else {
        turnoJogo()
      }

    })
  })
}

console.log("=== DADOKOMBAT ===") 
turnoJogo()