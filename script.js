// 1) ROUTER: show the section whose data-view matches the URL hash (#/, #/login, #/signup)
const views = document.querySelectorAll("[data-view]");
function route() {
  const path = location.hash.slice(1) || "/";
  views.forEach(v => (v.hidden = v.dataset.view !== path));
  if (![...views].some(v => v.dataset.view === path)) views[0].hidden = false; // unknown hash -> home
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();

// 2) LANDING PAGE: "Get Started" sends the typed email to the sign up view
document.querySelectorAll(".email-row").forEach(form =>
  form.addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("s-email").value = form.querySelector("input").value.trim();
    location.hash = "#/signup";
  })
);

// 3) FORM VALIDATION (front end only, no backend)
document.querySelectorAll("form[data-auth]").forEach(form =>
  form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll("input[data-rule]").forEach(input => {
      const v = input.value.trim();
      const bad = input.dataset.rule === "email" ? !/^\S+@\S+\.\S+$/.test(v) : v.length < 6;
      input.classList.toggle("bad", bad);
      input.parentElement.nextElementSibling.classList.toggle("on", bad); // error <p> after the field
      if (bad) ok = false;
    });
    if (ok) alert(form.dataset.auth === "login" ? "Logged in (demo only)" : "Account created (demo only)");
  })
);
