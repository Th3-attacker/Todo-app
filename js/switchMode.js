document.addEventListener("DOMContentLoaded", function () {
  const html = document.querySelector("html");
  const sunIcon = document.getElementById("sun-icon");
  const moonIcon = document.getElementById("moon-icon");

  const savedMode = localStorage.getItem("isDarkMode");

  let isDarkMode = savedMode === "true";

  const toggleDarkMode = () => {
    isDarkMode = !isDarkMode;
    html.classList.toggle("dark", isDarkMode);
    localStorage.setItem("isDarkMode", isDarkMode);
  };

  sunIcon.addEventListener("click", toggleDarkMode);
  moonIcon.addEventListener("click", toggleDarkMode);

  if (isDarkMode) {
    html.classList.add("dark");
  }
  
});
