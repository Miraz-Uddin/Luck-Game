(() => {
  const formElement = document.querySelector("form");
  const luckyNumberInput = document.querySelector("#luckyNumberInput");
  const luckyNumberValue = document.querySelector("#luckyNumberValue");
  const player1Display = document.querySelector("#player1");
  const player1Btn = document.querySelector("#player1Btn");
  const player2Display = document.querySelector("#player2");
  const player2Btn = document.querySelector("#player2Btn");
  const message = document.querySelector("#message");
  const resetBtn = document.querySelector('input[type="button"]');

  let p1 = 0;
  let p2 = 0;
  let turnP1 = true;
  let turnP2 = true;
  let gameOver = true;
  let luckyNumber = 13;

  initialStage();

  function randomNumberGenerate(num){
    return Math.floor(Math.random()*(num+1));
  }

  formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    luckyNumber = luckyNumberInput.value == "" ? luckyNumber : parseInt(luckyNumberInput.value);
    luckyNumberValue.textContent = luckyNumber;
    luckyNumberInput.value = "";
  });

  resetBtn.addEventListener("click", (e) => { e.preventDefault(); initialStage(); });

  player1Btn.addEventListener("click", (e) => {
    if (turnP1 && luckyNumber !== p1 && luckyNumber !== p2) {
      e.preventDefault();
      p1=randomNumberGenerate(luckyNumber);
      player1Display.textContent = p1;
      turnP1 = false;
      turnP2 = true;
      player1Btn.setAttribute("disabled", "disabled");
      player2Btn.removeAttribute("disabled");
    }
    winnerState(p1, "Player 1");
  });

  player2Btn.addEventListener("click", (e) => {
    if (turnP2 && luckyNumber !== p1 && luckyNumber !== p2) {
      e.preventDefault();
      p2=randomNumberGenerate(luckyNumber);
      player2Display.textContent = p2;
      turnP1 = true;
      turnP2 = false;
      player2Btn.setAttribute("disabled", "disabled");
      player1Btn.removeAttribute("disabled");
    }
    winnerState(p2, "Player 2");
  });

  function winnerState(num, playerName) {
    if (luckyNumber === num) {
      gameOver = true;
      player1Btn.setAttribute("disabled", "disabled");
      player2Btn.setAttribute("disabled", "disabled");
      message.insertAdjacentHTML("beforeend",'<div class="alert alert-warning alert-dismissible fade show" role="alert"><strong>' + playerName + ' won</strong><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
    }
  }

  function initialStage(){
    p1 = 0;
    p2 = 0;
    turnP1 = true;
    turnP2 = true;
    gameOver = true;
    luckyNumber = 13;
    luckyNumberValue.textContent = luckyNumber;
    player1Display.textContent = p1;
    player2Display.textContent = p2;
    player1Btn.removeAttribute("disabled");
    player2Btn.removeAttribute("disabled");
    luckyNumberInput.value = "";
  }

})();
