// Load navbar component into the page
fetch("../components/navbar.html")
  .then((res) => res.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;

    // Wait until navbar HTML is inserted, then bind events
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
      // Toggle menu when clicking hamburger
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
      });

      // Close mobile menu when clicking a link
      document.querySelectorAll(".nav-links-responsive a").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          navLinks.classList.remove("active");
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !hamburger.contains(e.target) &&
          !navLinks.contains(e.target) &&
          !e.target.closest(".container-responsive")
        ) {
          hamburger.classList.remove("active");
          navLinks.classList.remove("active");
        }
      });
    }
  });
