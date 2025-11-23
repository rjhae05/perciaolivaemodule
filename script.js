// Accordion toggle
const accordionHeaders = document.querySelectorAll(".accordion-header");

accordionHeaders.forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;
    item.classList.toggle("active");
  });
});

// Collapse all
document.getElementById("collapseAll").addEventListener("click", () => {
  document.querySelectorAll(".accordion-item").forEach(item => {
    item.classList.remove("active");
  });
});

// Mark as done toggle
document.querySelectorAll(".done-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("completed");
    btn.textContent = btn.classList.contains("completed") ? "Done ✓" : "Mark as done";
  });
});
