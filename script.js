let day = 1;
let gdp = 100;
let inflation = 2;
let unemployment = 5;
let inequality = 20;
let count = 0;

const factions = {
  Peasants: { color: "#2ecc71" },
  Merchants: { color: "#3498db" },
  Nobles: { color: "#e74c3c" },
  Bankers: { color: "#f1c40f" },
};

let prompts = [
  {
    text: "A merchant guild proposes lower taxes to boost trade.",
    yes: () => {
      gdp += 8;
      inflation += 3;
      unemployment -= 0;
      inequality += 3;
    },
    no: () => {
      gdp -= 4;
      inflation -= 1;
      unemployment -= 0;
      inequality -= 1;
    },
    faction: "Merchants",
  },
  {
    text: "Peasants request increased spending on public services and infrastructure.",
    yes: () => {
      gdp += 10;
      inflation += 5;
      unemployment -= 5;
      inequality -= 4;
    },
    no: () => {
      gdp -= 5;
      inflation -= 2;
      unemployment += 2;
      inequality += 2;
    },
    faction: "Peasants",
  },
  {
    text: "Central bank wants to buy bonds to lower interest rates.",
    yes: () => {
      gdp += 7;
      inflation += 5;
      unemployment -= 3;
      inequality -= 0;
    },
    no: () => {
      gdp -= 3;
      inflation -= 2;
      unemployment += 1;
      inequality += 0;
    },
    faction: "Bankers",
  },
  {
    text: "Introduce a progressive wealth tax?",
    yes: () => {
      inequality -= 8;
      gdp -= 5;
    },
    no: () => {
      inequality += 4;
      gdp += 2;
    },
    faction: "Nobles",
  },
  {
    text: "The peasants demand a minimum wage.",
    yes: () => {
      gdp -= 10;
      inflation += 5;
      unemployment += 5;
      inequality -= 7;
    },
    no: () => {
      gdp += 5;
      inflation -= 2;
      unemployment -= 2;
      inequality += 3;
    },
    faction: "Peasants",
  },
  {
    text: "The merchants demand a lower minimum working age.",
    yes: () => {
      gdp += 7;
      inflation -= 2;
      unemployment -= 2;
      inequality += 7;
    },
    no: () => {
      gdp -= 3;
      inflation += 1;
      unemployment += 1;
      inequality -= 3;
    },
    faction: "Merchants",
  },
  {
    text: "The nobles propose investing in the military.",
    yes: () => {
      gdp += 4;
      inflation += 3;
      unemployment -= 3;
      inequality += 0;
    },
    no: () => {
      gdp -= 2;
      inflation += 1;
      unemployment += 1;
      inequality += 0;
    },
    faction: "Nobles",
  },
  {
    text: "The bankers want to print more money",
    yes: () => {
      gdp += 3;
      inflation += 10;
      unemployment -= 3;
      inequality -= 2;
    },
    no: () => {
      gdp -= 1;
      inflation -= 5;
      unemployment += 1;
      inequality += 1;
    },
    faction: "Bankers",
  },
  {
    text: "The bankers want a lowered federal funds rate.",
    yes: () => {
      gdp += 5;
      inflation -= 5;
      unemployment -= 3;
      inequality += 0;
    },
    no: () => {
      gdp -= 2;
      inflation += 2;
      unemployment += 1;
      inequality += 0;
    },
    faction: "Bankers",
  }
];

function updateStats() {
  gdp = Math.max(0, gdp);
  inflation = Math.max(0, inflation);
  unemployment = Math.max(0, unemployment);
  inequality = Math.max(0, inequality);

  document.getElementById("day").textContent = day;
  document.getElementById("gdp").textContent = gdp;
  document.getElementById("inflation").textContent = inflation;
  document.getElementById("unemployment").textContent = unemployment;
  document.getElementById("inequality").textContent = inequality;
}

function spawnDots(factionName) {
  const container = document.getElementById("dots-area");

  const dot = document.createElement("div");
  dot.className = "dot";

  dot.style.backgroundColor = factions[factionName].color;
  dot.title = factionName;
  dot.style.right = "20px";
  dot.style.top = `${70 + Math.random() * 20}px`;

  container.innerHTML = ""; // clear previous dot
  container.appendChild(dot);
}

function nextPrompt() {
  if (day > 10) return endGame();
  let prompt = prompts[Math.floor(Math.random() * prompts.length)];
  currentPrompt = prompt;
  document.getElementById("prompt").textContent = prompt.text;
  spawnDots(prompt.faction);
}

const letsSeeBtn = document.getElementById("letsSeeBtn");
const endingScreen = document.getElementById("endingScreen");
const endingText = document.getElementById("endingText");
endingScreen.style.pointerEvents = "auto";

letsSeeBtn.addEventListener("click", () => {
  const allAudios = document.querySelectorAll("audio");
  allAudios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0; 
  });

  const sound = document.getElementById("endingSound");
  sound.play();

  const chosen = window.endingResult || {
    text: "Ending ???: Mysterious fate awaits...",
    color: "#34495e",
  };

  document.body.style.backgroundColor = chosen.color;
  endingText.textContent = chosen.text;
  document.querySelector(".game-container").style.display = "none";
  endingScreen.style.display = "flex";
});

function endGame() {
  document.querySelector(".prompt-box").innerHTML = `
      <h2>Game Over</h2>
      <p>Final GDP: ${gdp}</p>
      <p>Inflation (%): ${inflation}</p>
      <p>Unemployment: ${unemployment}%</p>
      <p>Inequality: ${inequality}%</p>
      <p>Your reign has ended. How will history judge you?</p>
    `;

  document.querySelector(".ending-trigger").style.display = "block";

  // Store ending based on final stats
  if (inequality > 40) {
    // Social Uprising
    window.endingResult = {
      text: "Ending D: High inequality lead to revolutions and chaos consumed the kingdom.",
      color: "#8e44ad",
    };
  } else if (unemployment + inflation > 30 || gdp < 40) {
    // Stagflation 
    window.endingResult = {
      text: "Ending B: Frustrated with the macroeconomic failures of your reign, the people overthrew your kingdom.",
      color: "#c0392b",
    };
  } else if (gdp > 200) {
    // Paradise
    window.endingResult = {
      text: "Ending A: Your policies led to a golden age and your name will go among the greats in history.",
      color: "#2c3e50",
    };
  } else {
    // Balanced Growth
    window.endingResult = {
      text: "Ending C: You restored balance and harmony to the kingdom.",
      color: "#27ae60",
    };
  }
}

let currentPrompt;

let c = 0;

document.getElementById("yesBtn").addEventListener("click", () => {
  if (c >= 1) currentPrompt.yes();
  c = 1;
  count++;
  updateStats();
  updateStatStyles()
  nextPrompt();
  if (count >= 3) {
    day++;
    count = 0;
  }
});

document.getElementById("noBtn").addEventListener("click", () => {
  if (c >= 1) currentPrompt.no();
  c = 1;
  count++;
  updateStats();
  updateStatStyles()
  nextPrompt();
  if (count >= 3) {
    day++;
    count = 0;
  }
});

updateStats();


function updateStatStyles() {
  const gdp = parseFloat(document.getElementById("gdp").textContent);
  const inflation = parseFloat(document.getElementById("inflation").textContent);
  const unemployment = parseFloat(document.getElementById("unemployment").textContent);
  const inequality = parseFloat(document.getElementById("inequality").textContent);

  const gdpElem = document.getElementById("gdp");
  const inflationElem = document.getElementById("inflation");
  const unemploymentElem = document.getElementById("unemployment");
  const inequalityElem = document.getElementById("inequality");

  gdpElem.classList.remove("stat-alert");
  inflationElem.classList.remove("stat-alert");
  unemploymentElem.classList.remove("stat-alert");
  inequalityElem.classList.remove("stat-alert");

  if (gdp < 30) gdpElem.classList.add("stat-alert");
  if (inflation > 10) inflationElem.classList.add("stat-alert");
  if (unemployment > 10) unemploymentElem.classList.add("stat-alert");
  if (inequality > 30) inequalityElem.classList.add("stat-alert");
}
