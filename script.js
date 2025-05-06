let day = 1;
let gdp = 100;
let cpi = 2;
let unemployment = 5;
let inequality = 30;
let mps = 0.2;
let count = 0

const factions = {
    "Peasants": { color: "#2ecc71" },
    "Merchants": { color: "#3498db" },
    "Nobles": { color: "#e74c3c" },
    "Bankers": { color: "#f1c40f" }
  };

  

let prompts = [
  {
    text: "A merchant guild proposes lower taxes to boost trade. Approve?",
    yes: () => { gdp += 10; inequality += 5; },
    no: () => { gdp -= 5; inequality += 2; },
    faction: "Merchants"
  },
  {
    text: "Peasants request increased spending on public jobs.",
    yes: () => { unemployment -= 1; gdp += 5; },
    no: () => { unemployment += 1; inequality += 2; },
    faction: "Peasants"
  },
  {
    text: "Central bank wants to buy bonds to lower interest rates.",
    yes: () => { gdp += 7; cpi += 1; },
    no: () => { gdp -= 3; },
    faction: "Bankers"
  },
  {
    text: "Introduce a progressive wealth tax?",
    yes: () => { inequality -= 5; gdp -= 3; },
    no: () => { inequality += 3; },
    faction: "Nobles"
  },
  {
    text: "Allow inflation to rise to stimulate spending?",
    yes: () => { gdp += 8; cpi += 2; },
    no: () => { gdp -= 2; },
    faction: "Nobles"
  },
  {
    text: "The peasants demand a minimum wage.",
    yes: () => { gdp -= 5; cpi -= 2; unemployment+=1; inequality-=5;},
    no: () => { gdp += 2; inequality +=3;},
    faction: "Peasants"
  },
  {
    text: "The merchants want lower taxes.",
    yes: () => { gdp += 3; cpi += 2; unemployment-=1; inequality+=3;},
    no: () => { gdp -= 2;},
    faction: "Merchants"
  },
  {
    text: "The merchants want lower taxes.",
    yes: () => { gdp += 3; cpi += 2; unemployment-=1; inequality+=3;},
    no: () => { gdp -= 2;},
    faction: "Merchants"
  },
];

// const prompts = [

//     {
//       text: "The nobles propose investing in the military.",
//       faction: "Nobles"
//     },
//     {
//       text: "The bankers suggest printing more money.",
//       faction: "Bankers"
//     }
//   ];
  

function updateStats() {
  gdp = Math.max(0, gdp);
  cpi = Math.max(0, cpi);
  unemployment = Math.max(0, unemployment);
  inequality = Math.max(0, inequality);

  document.getElementById('day').textContent = day;
  document.getElementById('gdp').textContent = gdp;
  document.getElementById('cpi').textContent = cpi;
  document.getElementById('unemployment').textContent = unemployment;
  document.getElementById('inequality').textContent = inequality;
  document.getElementById('multiplier').textContent = (1 / mps).toFixed(1);
}

function spawnDots(factionName) {
    const container = document.getElementById("dots-area");
  
    const dot = document.createElement("div");
    dot.className = "dot";
  
    dot.style.backgroundColor = factions[factionName].color;
    dot.title = factionName;
    dot.style.right = "20px";
    dot.style.top = `${70 + Math.random() * 20}px`;
  
    container.innerHTML = ''; // clear previous dot
    container.appendChild(dot);
  }
  


function nextPrompt() {
    if (day > 10) return endGame();
    let prompt = prompts[Math.floor(Math.random() * prompts.length)];
    currentPrompt = prompt;
    document.getElementById('prompt').textContent = prompt.text;
    spawnDots(prompt.faction); 
  }

  
function endGame() {
  document.querySelector('.prompt-box').innerHTML = `
    <h2>Game Over</h2>
    <p>Final GDP: ${gdp}</p>
    <p>CPI: ${cpi}</p>
    <p>Unemployment: ${unemployment}%</p>
    <p>Inequality: ${inequality}%</p>
    <p>Money Multiplier: ${(1 / mps).toFixed(1)}</p>
    <p>Your reign has ended. How will history will judge you?</p>
  `;

  if(inequality > 50){
    // 🔥 Social Uprising
  }
  else if(unemployment+cpi > 15){
    // 💀 Stagflation Nightmare
  }
  else if(gdp > 200){
    //     ⭐ Booming Paradise
  }
  else{
    // ⚖️ Balanced Growth

  }

}

let currentPrompt;



document.getElementById("yesBtn").addEventListener("click", () => {
  currentPrompt.yes();
  count++;
  updateStats();
  nextPrompt();
  if(count >= 3){
    day++;
    count = 0;
  }
});

document.getElementById("noBtn").addEventListener("click", () => {
  currentPrompt.no();
  count++;
  updateStats();
  nextPrompt();
  if(count >= 3){
    day++;
    count = 0;
  }
});



updateStats();
nextPrompt();
