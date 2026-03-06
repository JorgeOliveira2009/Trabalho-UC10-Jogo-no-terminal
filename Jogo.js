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
  { nome: "Golpe rápido", dados: 1, bonus: 2, custo: 2 },
  { nome: "Ataque pesado", dados: 2, bonus: 0, custo: 4 },
  { nome: "Força total", dados: 3, bonus: -2, custo: 6 },
  { nome: "Golpe Supremo", dados: 4, bonus: 1, custo: 8 },
  { nome: "Tempestade de Dados", dados: 5, bonus: -1, custo: 9 },
  { nome: "Impacto Brutal", dados: 3, bonus: 3, custo: 7 },
  { nome: "Fúria Selvagem", dados: 4, bonus: -1, custo: 7 },
  { nome: "Golpe Fantasma", dados: 2, bonus: 4, custo: 6 },
  { nome: "Explosão Titânica", dados: 6, bonus: -2, custo: 10 }

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

function podeJogar(energia) {
  for (let carta of cartas) {
    if (energia >= carta.custo) {
      return true
    }
  }
  return false
}

function turnoJogo() {

  console.log("\n====================")
  console.log("Vida P1:", vida1)
  console.log("Energia P1:", energia1)

  console.log("Vida P2:", vida2)
  console.log("Energia P2:", energia2)
  console.log("====================\n")

  let maoP1 = comprarCartas(3)
  let maoP2 = comprarCartas(3)

  console.log("\nPlayer 1 comprou:")
  mostrarCartas(maoP1)

  if (!podeJogar(energia1)) {
    console.log("Player 1 está sem energia e pulou o turno!")
    energia1 += 2
    if (energia1 > 10) energia1 = 10
    turnoJogo()
    return
  }

  console.log("\nPlayer 2 comprou:")
  mostrarCartas(maoP2)

  if (!podeJogar(energia2)) {
    console.log("Player 2 está sem energia e pulou o turno!")
    energia2 += 2
    if (energia2 > 10) energia2 = 10
    turnoJogo()
    return
  }

rl.question("\nPlayer 1 - Escolha o número da carta (ENTER para recuperar energia): ", function (resposta1) {


  if (resposta1.trim() === "") {

    console.log("Player 1 decidiu recuperar energia!")

    energia1 += 3
    if (energia1 > 10) energia1 = 10

    rl.question("Player 2 - Escolha o número da carta (ENTER para recuperar energia): ", function (resposta2) {

      if (resposta2.trim() === "") {

        console.log("Player 2 também recuperou energia!")

        energia2 += 3
        if (energia2 > 10) energia2 = 10

        turnoJogo()
        return
      }

      let cartaP2 = maoP2[parseInt(resposta2) - 1]

      if (!cartaP2) {
        console.log("Escolha inválida!")
        return turnoJogo()
      }

      if (energia2 < cartaP2.custo) {
        console.log("Energia insuficiente!")
        return turnoJogo()
      }

      energia2 -= cartaP2.custo

      console.log("\nPlayer 1 não atacou.")
      console.log("Player 2 usou:", cartaP2.nome)

      let total2 = rolarMultiplosDados(cartaP2.dados) + cartaP2.bonus

      console.log("Total Player 2:", total2)

      vida1 -= total2

      console.log("Player 2 causou dano:", total2)

      turnoJogo()
    })

    return
  }


  let cartaP1 = maoP1[parseInt(resposta1) - 1]

  if (!cartaP1) {
    console.log("Escolha inválida!")
    return turnoJogo()
  }

  if (energia1 < cartaP1.custo) {
    console.log("Energia insuficiente!")
    return turnoJogo()
  }

  energia1 -= cartaP1.custo

  rl.question("Player 2 - Escolha o número da carta (ENTER para recuperar energia): ", function (resposta2) {

    if (resposta2.trim() === "") {

      console.log("Player 2 decidiu recuperar energia!")

      energia2 += 3
      if (energia2 > 10) energia2 = 10

      let total1 = rolarMultiplosDados(cartaP1.dados) + cartaP1.bonus

      console.log("Player 1 usou:", cartaP1.nome)
      console.log("Total Player 1:", total1)

      vida2 -= total1

      console.log("Player 1 causou dano:", total1)

      turnoJogo()
      return
    }

    let cartaP2 = maoP2[parseInt(resposta2) - 1]

    if (!cartaP2) {
      console.log("Escolha inválida!")
      return turnoJogo()
    }

    if (energia2 < cartaP2.custo) {
      console.log("Energia insuficiente!")
      return turnoJogo()
    }

    energia2 -= cartaP2.custo

    console.log("\n--- CLASH ---")

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
      console.log("Empate!")
    }

    turnoJogo()
  })
})

}

console.log("=== DADOKOMBAT ===") 
turnoJogo()