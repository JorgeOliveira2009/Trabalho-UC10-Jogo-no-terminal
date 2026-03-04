const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let vida1 = 40
let vida2 = 40
let turno = Math.random() < 0.5 ? 1 : 2

function rolarDado() {
  return Math.floor(Math.random() * 6) + 1
  
}

function turnoJogo() {
  console.log("\nVida P1:", vida1)
  console.log("Vida P2:", vida2)
  console.log("Turno do Player", turno)

  rl.question("Aperte ENTER para atacar...", function () {

    let dano = rolarDado()

    
    let critico = Math.random() < 0.2 

    if (critico) {
      dano *= 2
      console.log("CRÍTICO! Dano dobrado!")
    }

    if (dano === 1) {
  console.log("Errou o ataque!")
  dano = 0;
}

    console.log("Dano:", dano)

    if (turno === 1) {
      vida2 -= dano
      turno = 2
    } else {
      vida1 -= dano
      turno = 1
    }

    if (vida1 <= 0) {
      console.log(" Player 2 venceu! FATALITY...")
      rl.close()
    } else if (vida2 <= 0) {
      console.log(" Player 1 venceu! FATALITY...")
      rl.close()
    } else {
      turnoJogo()
    }
  })
}

console.log("=== DADOKOMBAT ===") 
turnoJogo()