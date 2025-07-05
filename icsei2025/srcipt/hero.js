// Load hero section into the page
fetch("/icsei2025/hero.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("hero-container").innerHTML = data;
  });
