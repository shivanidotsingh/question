const colorCombos = [
  { bg: "#228DC8", text: "#FC7ED7" },
  { bg: "#FBA332", text: "#FA6128" },
  { bg: "#FA6128", text: "#0B690C" },
  
  { bg: "#CBA0AA", text: "#FAE397" },
  { bg: "#B6CAC0", text: "#C02A1B" },  
  { bg: "#F9F7E8", text: "#62BFAD" },
  { bg: "#6C5B7B", text: "#C06C84" },
  { bg: "#355C7D", text: "#F67280" },
  { bg: "#F3C9DD", text: "#72AEC5" },
  { bg: "#119DA4", text: "#FFC857" },
  { bg: "#20AD65", text: "#FEC8BE" },
  { bg: "#9C9CDD", text: "#CAE9BF" },
  { bg: "#B2B2B2", text: "#E9FF27" },
  { bg: "#8AA9C6", text: "#D1BDFF" },
  { bg: "#393E41", text: "#E94F37" }
];
const buttonPhrases = [
  "Nah, give me another question",
  "Hmm, ok hit me with one more",
  "Nope, not the vibe. Try again",
  "Got anything else?",
  "Spin the wheel again",
  "Give me a better one",
  "Try me again",
  "I want a different one"
];
let remainingPrompts = [...prompts];
function generatePrompt() {
    if (remainingPrompts.length === 0) {
    remainingPrompts = [...prompts];
  }
  const randomIndex = Math.floor(Math.random() * remainingPrompts.length);  
  const randomPrompt = remainingPrompts.splice(randomIndex, 1)[0];
  document.getElementById("prompt").innerText = randomPrompt.text;
  const color = colorCombos[Math.floor(Math.random() * colorCombos.length)];
  document.body.style.backgroundColor = color.bg;
  document.body.style.color = color.text;
  const button = document.querySelector("button");
  button.style.color = color.text;
  button.innerText = buttonPhrases[Math.floor(Math.random() * buttonPhrases.length)];
}

let remainingIcebreakers = [];
function generateIcebreaker() {
  if (remainingIcebreakers.length === 0) {
    remainingIcebreakers = [...icebreakers];
  }
  const randomIndex = Math.floor(Math.random() * remainingIcebreakers.length);
  const item = remainingIcebreakers.splice(randomIndex, 1)[0];
  const color = colorCombos[Math.floor(Math.random() * colorCombos.length)];

  document.body.style.backgroundColor = color.bg;
  document.body.style.color = color.text;
  document.getElementById("question").innerText = item.q;
  document.getElementById("meta").innerText = item.date + " — " + item.contributor;
  document.getElementById("context").innerText = item.context;

  const button = document.querySelector("#mainView button");
  button.style.color = color.text;
  button.innerText = buttonPhrases[Math.floor(Math.random() * buttonPhrases.length)];
}

let gridOpen = false;
function toggleGrid() {
  gridOpen = !gridOpen;
  document.getElementById("gridView").style.display = gridOpen ? "block" : "none";
  document.getElementById("mainView").style.display = gridOpen ? "none" : "block";
  document.getElementById("toggleBtn").textContent = gridOpen ? "×" : "#";
  document.querySelector(".source-link").style.color = gridOpen ? "black" : "inherit";
  if (gridOpen) buildGrid();
}

function buildGrid() {
  const grid = document.getElementById("wordGrid");
  grid.innerHTML = "";
  icebreakers.forEach((item, i) => {
    const color = colorCombos[i % colorCombos.length];
    const card = document.createElement("div");
    card.className = "word-card";
    card.style.backgroundColor = color.bg;
    card.style.color = color.text;
    card.innerHTML = '<div class="card-word">' + item.q + '</div><div class="card-definition">' + item.date + ' — ' + item.contributor + '</div>';
    card.onclick = () => {
      const c = color;
      document.body.style.backgroundColor = c.bg;
      document.body.style.color = c.text;
      document.getElementById("question").innerText = item.q;
      document.getElementById("meta").innerText = item.date + " — " + item.contributor;
      document.getElementById("context").innerText = item.context;
      toggleGrid();
    };
    grid.appendChild(card);
  });
}
