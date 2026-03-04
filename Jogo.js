const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let vida1 = 40
let vida2 = 40

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1
  
}

 function calcularDanoBase() {
  let dano = rolarDado()

  let critico = Math.random() < 0.2
  if (critico) {
    dano *= 2
    console.log("CRÍTICO! Dano dobrado!")
  }

  if (dano === 1) {
    console.log("Errou o ataque!")
    dano = 0
  }

  return dano
}

function turnoJogo() {
  console.log("\nVida P1:", vida1)
  console.log("Vida P2:", vida2)

  rl.question("Aperte ENTER para iniciar o CLASH...", function () {

    let dado1 = rolarDado()
    let dado2 = rolarDado()

    console.log("\nPlayer 1 rolou:", dado1)
    console.log("Player 2 rolou:", dado2)

    if (dado1 > dado2) {
      let dano = dado1 - dado2
      vida2 -= dano
      console.log("Player 1 venceu o clash! Dano:", dano)
    } 
    else if (dado2 > dado1) {
      let dano = dado2 - dado1
      vida1 -= dano
      console.log("Player 2 venceu o clash! Dano:", dano)
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
}

console.log("=== DADOKOMBAT ===") 
turnoJogo()