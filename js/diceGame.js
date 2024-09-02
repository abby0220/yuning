document.addEventListener("DOMContentLoaded", () => {
  const playerButton = document.getElementById("playerButton");
  const dealerButton = document.getElementById("dealerButton");
  const messageLabel = document.getElementById("message");
  const resultMessage = document.getElementById("resultMessage");

  const playerDice = [
      document.getElementById("playerDice1"),
      document.getElementById("playerDice2"),
      document.getElementById("playerDice3"),
      document.getElementById("playerDice4")
  ];

  const diceImages = ["dice1.png", "dice2.png", "dice3.png", "dice4.png", "dice5.png", "dice6.png"];

  function rollDice() {
      return Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  }

  function displayDice(dice, elements) {
      dice.forEach((value, index) => {
          elements[index].src = `js/Dice/dice${value}.png`;
      });
  }

  function calculateScore(dice) {
      // 自定义的计分逻辑
      const score = dice.reduce((a, b) => a + b, 0);
      return score;
  }

  function determineWinner(playerScore, dealerScore) {
      if (playerScore > dealerScore) {
          return "客家贏了！";
      } else if (playerScore < dealerScore) {
          return "莊家贏了！";
      } else {
          return "打成平手！";
      }
  }

  playerButton.addEventListener("click", () => {
      const playerDiceValues = rollDice();
      displayDice(playerDiceValues, playerDice);
      const playerScore = calculateScore(playerDiceValues);
      messageLabel.textContent = `客家擲出了 ${playerScore} 分`;
      playerButton.disabled = true;
      dealerButton.disabled = false;
  });

  dealerButton.addEventListener("click", () => {
      const dealerDiceValues = rollDice();
      displayDice(dealerDiceValues, playerDice);
      const dealerScore = calculateScore(dealerDiceValues);
      const playerScore = parseInt(messageLabel.textContent.match(/\d+/)[0], 10);
      messageLabel.textContent = `莊家擲出了 ${dealerScore} 分`;
      const winnerMessage = determineWinner(playerScore, dealerScore);
      resultMessage.textContent = winnerMessage;
      playerButton.disabled = false;
      dealerButton.disabled = true;
  });
});
