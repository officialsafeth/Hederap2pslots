// Constants
const reelIcons = [
  "icon1.png",
  "icon2.png",
  "icon3.png",
  "icon4.png",
  "icon5.png",
]; // Replace with the actual icon image filenames

const numReels = 3;
const numVisibleIcons = 3;
const spinDuration = 2000; // Time in milliseconds

// Get DOM elements
const reelsContainer = document.getElementById("reels");
const spinButton = document.getElementById("spin-button");
const resultText = document.getElementById("result");

// Initialize the slot machine game
function initSlotMachine() {
  createReels();
  addEventListeners();
}

// Create the reels and their icons
function createReels() {
  for (let i = 0; i < numReels; i++) {
    const reel = document.createElement("div");
    reel.classList.add("reel");

    const icons = document.createElement("div");
    icons.classList.add("icons");

    for (let j = 0; j < numVisibleIcons; j++) {
      const icon = document.createElement("img");
      const randomIconIndex = Math.floor(Math.random() * reelIcons.length);
      icon.src = reelIcons[randomIconIndex];
      icons.appendChild(icon);
    }

    reel.appendChild(icons);
    reelsContainer.appendChild(reel);
  }
}

// Add event listeners to the spin button
function addEventListeners() {
  spinButton.addEventListener("click", startSpinning);
}

// Start spinning the reels
function startSpinning() {
  spinButton.disabled = true;

  // Generate random results for each reel
  const results = [];
  for (let i = 0; i < numReels; i++) {
    const randomIconIndex = Math.floor(Math.random() * reelIcons.length);
    results.push(randomIconIndex);
  }

  // Animate the spinning of the reels
  animateReels(results);
}

// Animate the spinning of the reels
function animateReels(results) {
  const reels = document.querySelectorAll(".reel");

  for (let i = 0; i < numReels; i++) {
    const reel = reels[i];
    const icons = reel.querySelector(".icons");
    const resultIndex = results[i];
    const targetPosition = -resultIndex * 100;

    icons.style.transform = `translateY(${targetPosition}%)`;
  }

  // Wait for the spinning animation to finish
  setTimeout(() => {
    endSpinning(results);
  }, spinDuration);
}

// End spinning and display the result
function endSpinning(results) {
  spinButton.disabled = false;

  // Check if the player has won
  const hasWon = checkWin(results);

  // Display the result
  if (hasWon) {
    resultText.textContent = "Congratulations! You won!";
  } else {
    resultText.textContent = "Better luck next time!";
  }
}

// Check if the player has won
function checkWin(results) {
  // Check for a winning combination based on the results
  // Replace with your winning combination logic

  // Example: Check if all results are the same icon
  const firstResult = results[0];
  return results.every((result) => result === firstResult);
}

// Initialize the slot machine game
initSlotMachine();
