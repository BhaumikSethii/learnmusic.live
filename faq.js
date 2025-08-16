document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    const ans = item.querySelector(".faq-answer");

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      // Close all (accordion style)
      items.forEach((i) => {
        i.classList.remove("active");
        i.querySelector(".faq-answer").style.maxHeight = null;
      });

      // Open the clicked one
      if (!isOpen) {
        item.classList.add("active");
        ans.style.maxHeight = ans.scrollHeight + "px"; // expands to content height
      }
    });
  });
});


