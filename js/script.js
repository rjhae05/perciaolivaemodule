let activeLabel = null;
let dragClone = null;

// Enable dragging (mouse + touch)
document.querySelectorAll(".label-item").forEach(label => {

  label.addEventListener("mousedown", startDrag);
  label.addEventListener("touchstart", startDrag, { passive: false });

});

// Start dragging
function startDrag(e) {
  e.preventDefault();

  activeLabel = this;

  dragClone = this.cloneNode(true);
  dragClone.classList.add("dragging");
  document.body.appendChild(dragClone);

  moveClone(e);

  document.addEventListener("mousemove", moveClone);
  document.addEventListener("touchmove", moveClone, { passive: false });

  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
}

function moveClone(e) {
  let x, y;

  if (e.touches) {
    x = e.touches[0].clientX;
    y = e.touches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }

  dragClone.style.left = x + "px";
  dragClone.style.top = y + "px";
}

// When dropped
function endDrag(e) {

  let x, y;

  if (e.changedTouches) {
    x = e.changedTouches[0].clientX;
    y = e.changedTouches[0].clientY;
  } else {
    x = e.clientX;
    y = e.clientY;
  }

  const targets = document.querySelectorAll(".drop-target");
  let dropped = false;

  targets.forEach(target => {
    const rect = target.getBoundingClientRect();

    if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {

      if (target.dataset.accept === activeLabel.dataset.name) {
        target.textContent = activeLabel.textContent.trim();
        target.classList.add("correct");
        activeLabel.style.display = "none";
      } else {
        target.classList.add("wrong");
        setTimeout(() => target.classList.remove("wrong"), 600);
      }

      dropped = true;
    }
  });

  dragClone.remove();
  dragClone = null;
  activeLabel = null;

  document.removeEventListener("mousemove", moveClone);
  document.removeEventListener("touchmove", moveClone);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchend", endDrag);
}

// Reset
document.getElementById("resetBtn").addEventListener("click", () => {

  document.querySelectorAll(".label-item").forEach(l => {
    l.style.display = "flex";
  });

  document.querySelectorAll(".drop-target").forEach(t => {
    t.classList.remove("correct", "wrong");
    t.textContent = "Drop " + t.dataset.accept;
  });

});
