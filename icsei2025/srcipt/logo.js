fetch("/icsei2025/components/logoComponent.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("logo-container").innerHTML = data;
  });
