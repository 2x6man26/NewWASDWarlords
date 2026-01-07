let balance = 100;
const symbols = ["🍒","🍋","🔔","💎","7️⃣"];

// Sound effect for winning
const winSound = new Audio('Assets/Audio/Casino.mp3');

function updateBalance() {
  document.getElementById("balance").textContent = balance;
}

/* SLOTS */
function playSlots() {
  if (balance < 5) return;
  balance -= 5;
  const r1 = symbols[Math.floor(Math.random()*symbols.length)];
  const r2 = symbols[Math.floor(Math.random()*symbols.length)];
  const r3 = symbols[Math.floor(Math.random()*symbols.length)];
  document.getElementById("slots").textContent = `${r1} ${r2} ${r3}`;
  if (r1 === r2 && r2 === r3) {
    balance += 25;
    winSound.play(); // play win sound
  }
  updateBalance();
}

/* COIN */
function playCoin(choice) {
  if (balance < 10) return;
  balance -= 10;
  const result = Math.random() < 0.5 ? "heads" : "tails";
  document.getElementById("coinResult").textContent = "Result: " + result;
  if (choice === result) {
    balance += 20;
    winSound.play(); // play win sound
  }
  updateBalance();
}

/* DICE */
function playDice() {
  if (balance < 10) return;
  balance -= 10;
  const roll = Math.floor(Math.random()*6) + 1;
  document.getElementById("diceResult").textContent = "You rolled: " + roll;
  if (roll >= 5) {
    balance += 20;
    winSound.play(); // play win sound
  }
  updateBalance();
}

/* COMMON CARDS */
const suits = ["♠","♥","♦","♣"];
const ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
function newDeck() {
  const d = [];
  for (const s of suits) for (const r of ranks) d.push({r,s});
  return d.sort(() => Math.random() - 0.5);
}
function cardStr(c){ return c.r + c.s; }
function handStr(h){ return h.map(cardStr).join(" "); }
function cardValueBJ(c){
  if (["J","Q","K"].includes(c.r)) return 10;
  if (c.r === "A") return 11;
  return parseInt(c.r);
}
function handValueBJ(hand){
  let total = hand.reduce((a,c)=>a+cardValueBJ(c),0);
  let aces = hand.filter(c=>c.r==="A").length;
  while (total>21 && aces){ total-=10; aces--; }
  return total;
}

/* BLACKJACK */
let bjDeck=[], bjPlayer=[], bjDealer=[], bjActive=false;
function bjDeal(){
  if (balance < 10) return;
  balance -= 10; updateBalance();
  bjDeck = newDeck();
  bjPlayer = [bjDeck.pop(), bjDeck.pop()];
  bjDealer = [bjDeck.pop(), bjDeck.pop()];
  bjActive = true;
  document.getElementById("bjResult").textContent = "";
  renderBJ();
}
function bjHit(){
  if (!bjActive) return;
  bjPlayer.push(bjDeck.pop());
  if (handValueBJ(bjPlayer) > 21) endBJ("Bust! Dealer wins.");
  renderBJ();
}
function bjStand(){
  if (!bjActive) return;
  while (handValueBJ(bjDealer) < 17) bjDealer.push(bjDeck.pop());
  const p = handValueBJ(bjPlayer), d = handValueBJ(bjDealer);
  if (d>21 || p>d) { 
    balance += 20; 
    winSound.play(); // play win sound
    endBJ("You win!"); 
  }
  else if (p===d) { 
    balance += 10; 
    winSound.play(); // play win sound for tie
    endBJ("Push."); 
  }
  else endBJ("Dealer wins.");
  updateBalance();
}
function endBJ(msg){ bjActive=false; document.getElementById("bjResult").textContent = msg; renderBJ(); }
function renderBJ(){
  document.getElementById("bjPlayer").textContent = "Player: " + handStr(bjPlayer) + " ("+handValueBJ(bjPlayer)+")";
  document.getElementById("bjDealer").textContent = "Dealer: " + (bjActive ? cardStr(bjDealer[0])+" ??" : handStr(bjDealer)+" ("+handValueBJ(bjDealer)+")");
}

/* POKER (5-CARD DRAW, AUTO-HOLD) */
let pDeck=[], pHand=[];
function pokerDeal(){
  if (balance < 10) return;
  balance -= 10; updateBalance();
  pDeck = newDeck();
  pHand = [pDeck.pop(),pDeck.pop(),pDeck.pop(),pDeck.pop(),pDeck.pop()];
  document.getElementById("pokerResult").textContent = "";
  renderPoker();
}
function pokerDraw(){
  if (pHand.length!==5) return;
  const freq = {};
  pHand.forEach(c=>freq[c.r]=(freq[c.r]||0)+1);
  pHand = pHand.map(c => freq[c.r] >= 2 ? c : pDeck.pop());
  const payout = evaluatePoker(pHand);
  if (payout>0) {
    balance += payout;
    winSound.play(); // play win sound
  }
  updateBalance();
  document.getElementById("pokerResult").textContent = payout>0 ? "Win: $"+payout : "No win.";
  renderPoker();
}
function renderPoker(){
  document.getElementById("pokerHand").textContent = "Hand: " + handStr(pHand);
}
function evaluatePoker(hand){
  const rs = hand.map(c=>c.r);
  const ss = hand.map(c=>c.s);
  const counts = {};
  rs.forEach(r=>counts[r]=(counts[r]||0)+1);
  const vals = Object.values(counts).sort((a,b)=>b-a);
  const isFlush = ss.every(s=>s===ss[0]);
  const order = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  const idx = rs.map(r=>order.indexOf(r)).sort((a,b)=>a-b);
  const isStraight = idx.every((v,i,a)=> i===0 || v===a[i-1]+1) || JSON.stringify(idx)==JSON.stringify([0,9,10,11,12]);
  if (isStraight && isFlush) return 100;
  if (vals[0]===4) return 80;
  if (vals[0]===3 && vals[1]===2) return 60;
  if (isFlush) return 40;
  if (isStraight) return 40;
  if (vals[0]===3) return 30;
  if (vals[0]===2 && vals[1]===2) return 20;
  if (vals[0]===2) return 10;
  return 0;
}
