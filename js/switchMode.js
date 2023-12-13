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


function showDragIcon(element) {
  var dragIcon = element.querySelector('img');
  if (dragIcon) {
    dragIcon.classList.remove('hidden');
  }
}

// Fonction pour masquer l'icône de drag quand le survol se termine
function hideDragIcon(element) {
  var dragIcon = element.querySelector('img');
  if (dragIcon) {
    dragIcon.classList.add('hidden');
  }
}