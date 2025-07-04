// Load hero section into the page
fetch("components/hero.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("hero-container").innerHTML = data;
  });
