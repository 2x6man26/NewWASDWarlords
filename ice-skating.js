const canvas = document.getElementById("iceRink");
const ctx = canvas.getContext("2d");

const skater = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: 0,
  vy: 0,
  radius: 12,
  angle: 0,
  spin: 0,
  trick: null,
  trickTimer: 0
};

skater.color = "#1a6cff";


const friction = 0.995;
const accel = 0.25;
const lift = skater.trick === "jump" ? 6 : 0;

/* ===================== RINK ADS RANDOM GRADIENT ===================== */
const ads = [
  "SKATE CO", "ICE DREAMS", "FROST LABS", "EDGE PRO",
  "BLADE TECH", "SNOWCORE", "POLAR ENERGY", "CRYO",
  "GLIDE MODE", "NORTH STAR", "ICE POP", "WINTER 96",
  "AURORA ICE", "NEON FROST", "CHILL CLUB", "FREEZE",
  "ZERO DEG", "MIDNIGHT ICE", "WHITE NOISE",
  "COOL WAVE", "SUBZERO", "ARCTIC FLOW",
  "ICEVERSE", "GLACIER"
];

const adEls = {
  left: document.querySelector(".ad-left"),
  right: document.querySelector(".ad-right"),
  top: document.querySelector(".ad-top"),
  bottom: document.querySelector(".ad-bottom")
};

// random color gradient generator
function randomGradient() {
  const c1 = `hsl(${Math.floor(Math.random()*360)}, 70%, 50%)`;
  const c2 = `hsl(${Math.floor(Math.random()*360)}, 70%, 50%)`;
  return `linear-gradient(135deg, ${c1}, ${c2})`;
}

// random ad selector
function randomAd(exclude="") {
  let ad;
  do {
    ad = ads[Math.floor(Math.random() * ads.length)];
  } while (ad === exclude);
  return ad;
}

// set random ads + gradients once on page load
Object.values(adEls).forEach(el => {
  if (!el) return;
  el.textContent = randomAd();
  el.style.background = randomGradient();
});


const keys = {};
window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);
document.querySelectorAll(".character-selector button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".character-selector button")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
    skater.color = btn.dataset.color;
  });
});


// ===================== TRICKS =====================
function triggerTrick(name, duration, spinAmount) {
  if (skater.trick) return; // no overlapping tricks
  skater.trick = name;
  skater.trickTimer = duration;
  skater.spin = spinAmount;
}

// ===================== UPDATE =====================
function update() {
  // Movement
  if (keys["ArrowUp"]) skater.vy -= accel;
  if (keys["ArrowDown"]) skater.vy += accel;
  if (keys["ArrowLeft"]) skater.vx -= accel;
  if (keys["ArrowRight"]) skater.vx += accel;

 // Tricks (swapped)
if (keys[" "]) triggerTrick("jump", 30, 0.2);   // Space = jump
if (keys["Shift"]) triggerTrick("spin", 40, 0.4); // Shift = spin
if (keys["z"]) triggerTrick("slide", 50, 0);    // Z = slide


  skater.vx *= friction;
  skater.vy *= friction;

  skater.x += skater.vx;
  skater.y += skater.vy;

  // Arena bounds
  if (skater.x < skater.radius || skater.x > canvas.width - skater.radius)
    skater.vx *= -0.6;
  if (skater.y < skater.radius || skater.y > canvas.height - skater.radius)
    skater.vy *= -0.6;

  // Trick logic
if (skater.trickTimer > 0) {
  if (skater.trick === "spin") {
    skater.angle += skater.spin;
  }
  skater.trickTimer--;
} else {
  skater.trick = null;
  skater.spin = 0;
}

}

// ===================== DRAW =====================
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(skater.x, skater.y);
  ctx.rotate(skater.angle);

  // Jump visual
  const lift = skater.trick === "jump" ? 6 : 0;

  ctx.beginPath();
  ctx.arc(0, -lift, skater.radius, 0, Math.PI * 2);
 ctx.fillStyle = skater.color;

  ctx.fill();

  ctx.restore();

  // Trick text
  if (skater.trick) {
    ctx.fillStyle = "#333";
    ctx.font = "16px Inter, Arial";
    ctx.fillText(
      skater.trick.toUpperCase(),
      skater.x - 24,
      skater.y - 20
    );
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
