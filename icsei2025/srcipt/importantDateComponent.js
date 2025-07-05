fetch("/icsei2025/components/importantDateComponent.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("importantDateComponent-container").innerHTML = data;
  });
