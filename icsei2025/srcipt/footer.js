// Load footer component into the page
fetch("/icsei2025/components/footerComponent.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("footer-container").innerHTML = data;
  });
