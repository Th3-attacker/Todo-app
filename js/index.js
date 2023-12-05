function applyMode(isDarkMode) {
    const sunIcon = document.getElementById("sunIcon");
    const moonIcon = document.getElementById("moonIcon");
    const contain = document.getElementById("contain");
    const inputForm = document.getElementById("inputForm");
    const itemsList = document.getElementById("itemsList");
    const listeItems = document.querySelectorAll("li");
    const paragraphsListItems = document.querySelectorAll("li p");
    const paragraphsDiv = document.querySelectorAll("div p a");
    const mobileFooter = document.getElementById("mobile-footer");
  
    if (isDarkMode) {
      moonIcon.classList.add("hidden");
      moonIcon.classList.remove("block");
      sunIcon.classList.remove("hidden");
      sunIcon.classList.add("block");
  
      contain.classList.remove("bg-gray-900");
      contain.classList.add("bg-white");
  
      let isMobile = window.innerWidth <= 768;
      const backgroundImage = isMobile ? "url('./public/images/bg-mobile-light.jpg')" : "url('./public/images/bg-desktop-light.jpg')";
      contain.style.backgroundImage = backgroundImage;
  
      inputForm.classList.remove("bg-gray-700", "text-gray-200");
  
      itemsList.classList.remove("bg-gray-700", "text-gray-300");
      itemsList.classList.add("bg-white", "text-gray-600");
  
      listeItems.forEach((item) => {
        item.classList.remove("border-gray-600");
        item.classList.add("border-gray-200");
      });
  
      paragraphsListItems.forEach((paragraph) => {
        paragraph.classList.remove("hover:text-gray-100");
        paragraph.classList.add("hover:text-gray-900");
      });
  
      paragraphsDiv.forEach((paragraph) => {
        paragraph.classList.remove("hover:text-gray-100");
        paragraph.classList.add("hover:text-gray-900");
      });
  
      mobileFooter.classList.remove("bg-gray-700", "text-gray-300");
      mobileFooter.classList.add("bg-white", "text-gray-600");
    } else {
      sunIcon.classList.add("hidden");
      sunIcon.classList.remove("block");
      moonIcon.classList.remove("hidden");
      moonIcon.classList.add("block");
  
      contain.classList.remove("bg-white");
      contain.classList.add("bg-gray-900");
  
      let isMobile = window.innerWidth <= 768;
      const backgroundImage = isMobile ? "url('./public/images/bg-mobile-dark.jpg')" : "url('./public/images/bg-desktop-dark.jpg')";
      contain.style.backgroundImage = backgroundImage;
  
      inputForm.classList.add("bg-gray-700", "text-gray-200");
  
      itemsList.classList.remove("bg-white", "text-gray-600");
      itemsList.classList.add("bg-gray-700", "text-gray-300");
  
      listeItems.forEach((item) => {
        item.classList.remove("border-gray-200");
        item.classList.add("border-gray-600");
      });
  
      paragraphsListItems.forEach((paragraph) => {
        paragraph.classList.remove("hover:text-gray-900");
        paragraph.classList.add("hover:text-gray-100");
      });
  
      paragraphsDiv.forEach((paragraph) => {
        paragraph.classList.remove("hover:text-gray-900");
        paragraph.classList.add("hover:text-gray-100");
      });
  
      mobileFooter.classList.remove("bg-white", "text-gray-600");
      mobileFooter.classList.add("bg-gray-700", "text-gray-300");
    }
  }
  
  const sunIcon = document.getElementById("sunIcon");
  sunIcon.addEventListener("click", () => applyMode(false));
  
  const moonIcon = document.getElementById("moonIcon");
  moonIcon.addEventListener("click", () => applyMode(true));
  
  //   check box for input
  const checkbox = document.getElementById("checkbox");
  checkbox.addEventListener("click", function () {
  const icon = document.querySelector(".icon");
  const checkIcon = document.querySelector(".checkbox-checked");
  
  icon.classList.toggle("opacity-0");
  checkIcon.classList.toggle("opacity-100");
  });