const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let vida1 = 40
let vida2 = 40

const cartas = [
  { nome: "Golpe rápido", dados: 1 },
  { nome: "Ataque pesado", dados: 2 },
  { nome: "Força total", dados: 3 }
]

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

  console.log("Cartas disponíveis:")
  cartas.forEach((carta, index) => {
    console.log(`${index + 1} - ${carta.nome} (Rola ${carta.dados}d6)`)
  })

  rl.question("\nPlayer 1 - Escolha o número da carta: ", function (resposta1) {

    let cartaP1 = cartas[parseInt(resposta1) - 1]

    if (!cartaP1) {
      console.log("Escolha inválida!")
      return turnoJogo()
    }

    rl.question("Player 2 - Escolha o número da carta: ", function (resposta2) {

      let cartaP2 = cartas[parseInt(resposta2) - 1]

      if (!cartaP2) {
        console.log("Escolha inválida!")
        return turnoJogo()
      }

      console.log("\n---CLASH---")

      let total1 = rolarMultiplosDados(cartaP1.dados)
      let total2 = rolarMultiplosDados(cartaP2.dados)

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