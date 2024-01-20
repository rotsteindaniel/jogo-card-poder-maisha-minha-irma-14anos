let vida = 10;
let timer;
let isFrozen = false;
let gameStarted = false;
let teleportInterval;

function changeLevel() {
  const levelSelect = document.getElementById("level");
  const selectedLevel = parseInt(levelSelect.value);
  setTeleportInterval(selectedLevel);
}

function teleportCard() {
  if (gameStarted && !isFrozen) {
    const card = document.getElementById("maishaCard");
    const maxX = window.innerWidth - card.clientWidth;
    const maxY = window.innerHeight - card.clientHeight;

    const newX = Math.floor(Math.random() * maxX);
    const newY = Math.floor(Math.random() * maxY);

    card.style.transform = `translate(${newX}px, ${newY}px)`;
  }
}

function freezeLife() {
  if (gameStarted && vida > 0) {
    vida--;
    updateLife();

    if (vida === 0) {
      endGame(true); // Player wins
    }
  }
}

function updateLife() {
  document.getElementById("vida").innerText = vida;
}

function updateTimer(seconds) {
  const timerElement = document.getElementById("timer");
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerElement.innerText = `Tempo Restante: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function endGame(playerWins) {
  isFrozen = true;
  clearInterval(timer);

  const resultMessage = document.getElementById("result");
  resultMessage.classList.remove("hidden");

  if (playerWins) {
    resultMessage.innerText = "Parabéns! Você venceu!";
  } else {
    resultMessage.innerText = "Você perdeu. Tente novamente!";
  }
}

function setTeleportInterval(level) {
  switch (level) {
    case 1:
      teleportInterval = 2000; // Nível 1 - movimento mais lento
      break;
    case 2:
      teleportInterval = 1500; // Nível 2 - movimento mediano
      break;
    case 3:
      teleportInterval = 1000; // Nível 3 - movimento rápido
      break;
    default:
      teleportInterval = 1500;
  }
}

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    document.getElementById("levelSelection").classList.add("hidden");
    document.getElementById("startButton").classList.add("hidden");
    document.getElementById("timer").classList.remove("hidden");

    const levelSelect = document.getElementById("level");
    const selectedLevel = parseInt(levelSelect.value);
    setTeleportInterval(selectedLevel);

    vida = 10;
    updateLife();
    isFrozen = false;

    // Defina a posição inicial da carta para evitar ultrapassar os limites da tela
    const card = document.getElementById("maishaCard");
    const maxX = window.innerWidth - card.clientWidth;
    const maxY = window.innerHeight - card.clientHeight;
    card.style.transform = `translate(${Math.floor(Math.random() * maxX)}px, ${Math.floor(Math.random() * maxY)}px)`;

    timer = setInterval(() => {
      teleportCard();
      updateTimer(Math.max(0, timerDuration - Math.floor((Date.now() - startTime) / 1000)));
    }, teleportInterval);

    const timerDuration = 60;
    let startTime = Date.now();
    updateTimer(timerDuration);

    // Adicione um temporizador de 1 minuto para o jogo
    setTimeout(() => endGame(false), timerDuration * 1000);
  }
}

// Inicie o jogo com o nível 1 por padrão
setTeleportInterval(1);

// Adicione um evento de inicialização para o teletransporte automático
document.addEventListener("DOMContentLoaded", () => {
  setInterval(() => teleportCard(), teleportInterval);
});

