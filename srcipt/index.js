function showDay(day) {
    // Hide all days
    document.getElementById("table-container-1").style.display = "none";
    document.getElementById("table-container-2").style.display = "none";

    // Show selected day
    document.getElementById("table-container-" + day).style.display =
      "block";

    // Update tab buttons
    const buttons = document.querySelectorAll(".tab-button");
    buttons.forEach((btn) => btn.classList.remove("active"));
    buttons[day - 1].classList.add("active");
  }

//   Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-links-responsive a').forEach(link => {
      link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
      });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
      }
  });