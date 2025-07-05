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