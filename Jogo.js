const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let vida1 = 25
let vida2 = 25
let energia1 = 10
let energia2 = 10

const cartas = [
  { nome: "Golpe rápido", tipo: "ataque", dados: 1, bonus: 2, custo: 2 },
  { nome: "Ataque pesado", tipo: "ataque", dados: 2, bonus: 0, custo: 4 },
  { nome: "Força total", tipo: "ataque", dados: 3, bonus: -2, custo: 6 },
  { nome: "Golpe Supremo", tipo: "ataque", dados: 4, bonus: 1, custo: 8 },
  { nome: "Tempestade de Dados", tipo: "ataque", dados: 5, bonus: -1, custo: 9 },
  { nome: "Impacto Brutal", tipo: "ataque", dados: 3, bonus: 3, custo: 7 },
  { nome: "Fúria Selvagem", tipo: "ataque", dados: 4, bonus: -1, custo: 7 },
  { nome: "Golpe Fantasma", tipo: "ataque", dados: 2, bonus: 4, custo: 6 },
  { nome: "Explosão Titânica", tipo: "ataque", dados: 6, bonus: -2, custo: 10 },

  { nome: "Postura Defensiva", tipo: "defesa", dados: 2, bonus: 1, custo: 3 },
  { nome: "Escudo Guardião", tipo: "defesa", dados: 3, bonus: 0, custo: 5 }
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
      " | Tipo: " + carta.tipo +
      " | Dados: " + carta.dados +
      " | Bônus: " + carta.bonus +
      " | Custo: " + carta.custo
    )
  }
}

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1
}

function rolarMultiplosDados(qtd) {
  let total = 0
  let resultados = []

  for (let i = 0; i < qtd; i++) {
    let valor = rolarDado()
    resultados.push(valor)
    total += valor
  }

  console.log("Dados:", resultados.join(", "))
  return total
}

function turnoJogo() {

  console.log("\n====================")
  console.log("Vida P1:", vida1, "| Energia:", energia1)
  console.log("Vida P2:", vida2, "| Energia:", energia2)
  console.log("====================\n")

  if (vida1 <= 0) {
    console.log("PLAYER 2 VENCEU!")
    rl.close()
    return
  }

  if (vida2 <= 0) {
    console.log("PLAYER 1 VENCEU!")
    rl.close()
    return
  }

  let maoP1 = comprarCartas(3)
  let maoP2 = comprarCartas(3)

  console.log("\nPlayer 1 comprou:")
  mostrarCartas(maoP1)

  console.log("\nPlayer 2 comprou:")
  mostrarCartas(maoP2)

  rl.question("\nPlayer 1 - Escolha carta (ENTER para recuperar energia): ", function(resposta1){

    let cartaP1 = null

    if (resposta1.trim() === "") {
      console.log("Player 1 recuperou energia!")
      energia1 = Math.min(10, energia1 + 3)
    } else {

      cartaP1 = maoP1[parseInt(resposta1) - 1]

      if (!cartaP1) {
        console.log("Escolha inválida!")
        return turnoJogo()
      }

      if (energia1 < cartaP1.custo) {
        console.log("Energia insuficiente!")
        return turnoJogo()
      }

      energia1 -= cartaP1.custo
    }

    rl.question("Player 2 - Escolha carta (ENTER para recuperar energia): ", function(resposta2){

      let cartaP2 = null

      if (resposta2.trim() === "") {
        console.log("Player 2 recuperou energia!")
        energia2 = Math.min(10, energia2 + 3)
      } else {

        cartaP2 = maoP2[parseInt(resposta2) - 1]

        if (!cartaP2) {
          console.log("Escolha inválida!")
          return turnoJogo()
        }

        if (energia2 < cartaP2.custo) {
          console.log("Energia insuficiente!")
          return turnoJogo()
        }

        energia2 -= cartaP2.custo
      }

      if (!cartaP1 && !cartaP2) {
        console.log("\nAmbos recuperaram energia.")
        return turnoJogo()
      }

      if (cartaP1 && !cartaP2) {

        console.log("\nPlayer 2 não atacou.")

        let total1 = rolarMultiplosDados(cartaP1.dados) + cartaP1.bonus

        console.log("Total Player 1:", total1)

        vida2 -= total1

        console.log("Player 1 causou dano:", total1)

        return turnoJogo()
      }

      if (!cartaP1 && cartaP2) {

        console.log("\nPlayer 1 não atacou.")

        let total2 = rolarMultiplosDados(cartaP2.dados) + cartaP2.bonus

        console.log("Total Player 2:", total2)

        vida1 -= total2

        console.log("Player 2 causou dano:", total2)

        return turnoJogo()
      }

      console.log("\n--- CLASH ---")

      let total1 = rolarMultiplosDados(cartaP1.dados) + cartaP1.bonus
      let total2 = rolarMultiplosDados(cartaP2.dados) + cartaP2.bonus

      console.log("Player 1 usou:", cartaP1.nome, "→", total1)
      console.log("Player 2 usou:", cartaP2.nome, "→", total2)

      if (total1 > total2) {

        let diferenca = total1 - total2

        if (cartaP1.tipo === "defesa") {
          vida1 += diferenca
          console.log("Player 1 venceu e se curou:", diferenca)
        } else {
          vida2 -= diferenca
          console.log("Player 1 venceu! Dano:", diferenca)
        }

      }

      else if (total2 > total1) {

        let diferenca = total2 - total1

        if (cartaP2.tipo === "defesa") {
          vida2 += diferenca
          console.log("Player 2 venceu e se curou:", diferenca)
        } else {
          vida1 -= diferenca
          console.log("Player 2 venceu! Dano:", diferenca)
        }

      }

      else {
        console.log("Empate!")
      }

      turnoJogo()

    })

  })

}

console.log("=== DADOKOMBAT ===")
turnoJogo()