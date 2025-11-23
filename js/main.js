let draggedLabel = null;
let correctCount = 0;
const totalParts = 5;

const labels = document.querySelectorAll(".label");
const targets = document.querySelectorAll(".drop-target");

const volcanoImg = document.getElementById("volcanoImg");
const explosionImg = document.getElementById("explosionImg");

const sCorrect = document.getElementById("sound-correct");
const sWrong = document.getElementById("sound-wrong");

const resetBtn = document.getElementById("resetBtn");

// DRAG EVENTS
labels.forEach(label => {
  label.addEventListener("dragstart", (e) => {
    draggedLabel = e.target;
    setTimeout(() => e.target.classList.add("hide-while-drag"), 10);
  });

  label.addEventListener("dragend", (e) => {
    e.target.classList.remove("hide-while-drag");
  });
});

targets.forEach(target => {
  target.addEventListener("dragover", (e) => e.preventDefault());

  target.addEventListener("drop", function (e) {
    const correctName = this.dataset.accept;
    const draggedName = draggedLabel.dataset.name;

    if (correctName === draggedName) {
      this.classList.add("correct");
      this.textContent = draggedLabel.textContent.trim();
      draggedLabel.style.display = "none";
      sCorrect.play();

      correctCount++;
      if (correctCount === totalParts) triggerExplosion();

    } else {
      this.classList.add("wrong");
      sWrong.play();
      setTimeout(() => this.classList.remove("wrong"), 500);
    }
  });
});

// EXPLOSION FUNCTION
function triggerExplosion() {

  // hide labels & targets
  labels.forEach(l => l.style.display = "none");
  targets.forEach(t => t.style.display = "none");

  // volcano shake
  volcanoImg.classList.add("volcano-shake");

  // switch to explosion GIF
  setTimeout(() => {
    volcanoImg.style.opacity = "0";
    explosionImg.style.opacity = "1";
  }, 900);
}

// RESET FUNCTION
resetBtn.addEventListener("click", resetActivity);

function resetActivity() {

  correctCount = 0;

  // Reset labels
  labels.forEach(label => {
    label.style.display = "block";
  });

  // Reset targets with placeholder text
  targets.forEach(target => {
    const acceptName = target.dataset.accept;
    target.textContent = defaultPlaceholders[acceptName];
    target.classList.remove("correct", "wrong");
    target.style.display = "block";
  });

  // Reset images
  volcanoImg.style.opacity = "1";
  explosionImg.style.opacity = "0";
  volcanoImg.classList.remove("volcano-shake");

  // Scroll to top so user sees starting screen
  window.scrollTo({ top: 0, behavior: "smooth" });
}


const defaultPlaceholders = {
  crater: "Drop crater",
  ash: "Drop ash",
  vent: "Drop vent",
  magma: "Drop magma",
  lava: "Drop lava"
};