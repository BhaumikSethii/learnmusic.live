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

document.querySelectorAll('.options').forEach(group => {
  const buttons = group.querySelectorAll('.option');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // remove selection from siblings
      buttons.forEach(b => b.classList.remove('selected'));
      // select clicked one
      btn.classList.add('selected');
    });
  });
});

// ✅ Initialize Supabase (no process.env in the browser)
const SUPABASE_URL = 'https://tncvhgmpqcltlpakgask.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuY3ZoZ21wcWNsdGxwYWtnYXNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MTUxODIsImV4cCI6MjA3MDk5MTE4Mn0.fwXZbvrF5smOgzuMRLAD3bC7b2VKqmyQCgMACJC2VYY';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// (kept) button selections
document.querySelectorAll(".option").forEach(button => {
  button.addEventListener("click", () => {
    const group = button.parentElement;
    group.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
  });
});

// (kept) submit handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("musicForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect answers
    const answers = {};
    document.querySelectorAll(".options").forEach(group => {
      const question = group.getAttribute("data-question");
      const selected = group.querySelector(".selected");
      answers[question] = selected ? selected.innerText : null;
    });

    console.log("Submitting:", answers);

    // Insert into Supabase
    const { data, error } = await supabase
      .from("Responses")
      .insert([answers]);

    if (error) {
      console.error("Supabase error:", error);
      alert("❌ Error: " + error.message);
    } else {
      alert("✅ Thanks! Your response has been recorded 🎶");
      form.reset();
      document.querySelectorAll(".option").forEach(btn => btn.classList.remove("selected"));
    }
  });
});
