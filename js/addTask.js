document.addEventListener("DOMContentLoaded", function () {
  // declare elements
  const inputForm = document.getElementById("inputForm");
  const ulItems = document.getElementById("ulItems");
  const itemCount = document.getElementById("itemCount");
  const all = document.getElementById("allId");
  const active = document.getElementById("activeId");
  const completed = document.getElementById("completedId");

  // return the number of items
  let items = [];

  // regarde si le item est valide
  const storedItems = localStorage.getItem("items");
  if (storedItems) {
    items = JSON.parse(storedItems);
    renderItems();
  }

  // add items from the input
  inputForm.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputForm.value.trim() === "") {
        alertMessage.classList.remove("hidden");
        setTimeout(() => {
          alertMessage.classList.add("hidden");
        }, 3000);
        return;
      }
      const newItem = {
        id: Date.now(),
        text: inputForm.value,
        completed: false,
      };
      items.push(newItem);
      saveToLocalStorage(); // sauvegarde dans le store
      renderItems();

      inputForm.value = "";
    }
  });

  function deleteItem(id) {
    items = items.filter((item) => item.id !== id);
    saveToLocalStorage(); //sauvgarde apres supression
    renderItems();
  }

  function toggleComplete(id) {
    items = items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    saveToLocalStorage();
    renderItems();
  }

  // function localStorage
  function saveToLocalStorage() {
    localStorage.setItem("items", JSON.stringify(items));
  }
  // add new item from li

  function renderItems(preventDefault) {
    ulItems.innerHTML = "";
    items.forEach((item) => {
      // create a li element
      const li = document.createElement("li");
      li.setAttribute("id","li");
      li.classList.add(
        "relative",
        "single-item",
        "cursor-move",
        "px-4",
        "py-4",
        "lg:py-6",
        "flex",
        "justify-between",
        "items-center",
        "border-b",
        "border-gray-200",
        "dark:border-gray-600",
        "space-x-4"
      );
      li.draggable = "true";
      li.setAttribute("onmouseover", "showDragIcon(this)");
      li.setAttribute("onmouseout", "hideDragIcon(this)");
      // create drag icon
      const imgDragIcon = document.createElement("img");
      imgDragIcon.src = "/public/images/icon-drag.svg";
      imgDragIcon.alt = "Drag Icon";
      imgDragIcon.classList.add(
        "right-1",
        "h-5",
        "w-5",
        "absolute",
        "left-0",
        "hidden"
      );
      // div from checkbox in paragraph
      const divLi = document.createElement("div");
      divLi.classList.add("flex", "items-center", "space-x-4");
      // checkbox form div li
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", () => toggleComplete(item.id));
      checkbox.classList.add(
        "rounded-full",
        "w-5",
        "h-5",
        "bg-transparent",
        "hover:border-blue-500",
        "cursor-pointer",
        "text-blue-300"
      );
      // paragraph element
      const paragraph = document.createElement("p");
      paragraph.classList.add("p", "cursor-pointer", "mt-1", "break-all");
      paragraph.textContent = item.text;
      paragraph.style.textDecoration = item.completed ? "line-through" : "none";
      paragraph.style.color = item.completed ? "gray" : "";
      // create element close
      const svgClose = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgClose.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgClose.setAttribute("width", "18");
      svgClose.setAttribute("height", "18");
      svgClose.classList.add("cursor-pointer", "hover:opacity-70", "shrink-0");
      // path for svg icon
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("fill", "#494C6B");
      path.setAttribute("fill-rule", "evenodd");
      path.setAttribute(
        "d",
        "M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      );
      svgClose.appendChild(path);

      svgClose.addEventListener("click", () => deleteItem(item.id));

      divLi.appendChild(checkbox);
      divLi.appendChild(paragraph);

      li.appendChild(imgDragIcon);
      li.appendChild(divLi);
      li.appendChild(svgClose);
      ulItems.appendChild(li);
    });
    updateItemCount();
  }
  // mis a jour du nombre de items
  function updateItemCount() {
    const count = items.filter((item) => !item.completed).length;
    itemCount.textContent = `${count} item${count !== 1 ? "s" : ""} left`;
  }

  const clearCompleted = document.getElementById("clear-completed");

  clearCompleted.addEventListener("click", () => {
    items = items.filter((item) => !item.completed);
    renderItems();
    updateItemCount();
    toggleClearButton();
    filterItems("all"); // Appliquer le filtre "all" après avoir supprimé les éléments complétés
    setActiveButton("allId");
  });

  function toggleComplete(id) {
    items = items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    saveToLocalStorage();
    renderItems();
    toggleClearButton(); // Met à jour l'état du bouton Clear Completed
  }
  
  // regarde si ya un item completed
  function toggleClearButton() {
    const completedItems = items.some((item) => item.completed); // Check if there are completed items
    if (completedItems) {
      clearCompleted.removeAttribute("disabled"); // Enable the button
    } else {
      clearCompleted.setAttribute("disabled", true); // Disable the button
    }
  }

  // le filtre des taches

  function filterItems(filterType) {
    const filteredItems = items.filter((item) => {
      if (filterType === "all") {
        return true;
      } else if (filterType === "active") {
        return !item.completed;
      } else if (filterType === "completed") {
        return item.completed;
      }
    });

    renderFilteredItems(filteredItems);
  }

  // le tableau apres le filtre
  function renderFilteredItems(filteredItems) {
    ulItems.innerHTML = "";
    filteredItems.forEach((item) => {
      // create a li element
      const li = document.createElement("li");
      li.classList.add(
        "relative",
        "single-item",
        "cursor-move",
        "px-4",
        "py-4",
        "lg:py-6",
        "flex",
        "justify-between",
        "items-center",
        "border-b",
        "border-gray-200",
        "dark:border-gray-600",
        "space-x-4"
      );
      li.draggable = "true";
      li.setAttribute("onmouseover", "showDragIcon(this)");
      li.setAttribute("onmouseout", "hideDragIcon(this)");
      // create drag icon
      const imgDragIcon = document.createElement("img");
      imgDragIcon.src = "/public/images/icon-drag.svg";
      imgDragIcon.alt = "Drag Icon";
      imgDragIcon.classList.add(
        "right-1",
        "h-5",
        "w-5",
        "absolute",
        "left-0",
        "hidden"
      );
      // div from checkbox in paragraph
      const divLi = document.createElement("div");
      divLi.classList.add("flex", "items-center", "space-x-4");
      // checkbox form div li
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", () => toggleComplete(item.id));
      checkbox.classList.add(
        "rounded-full",
        "w-5",
        "h-5",
        "bg-transparent",
        "hover:border-blue-500",
        "cursor-pointer",
        "text-blue-300"
      );
      // paragraph element
      const paragraph = document.createElement("p");
      paragraph.classList.add("p", "cursor-pointer", "mt-1", "break-all");
      paragraph.textContent = item.text;
      paragraph.style.textDecoration = item.completed ? "line-through" : "none";
      paragraph.style.color = item.completed ? "gray" : "";
      // create element close
      const svgClose = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgClose.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgClose.setAttribute("width", "18");
      svgClose.setAttribute("height", "18");
      svgClose.classList.add("cursor-pointer", "hover:opacity-70", "shrink-0");
      // path for svg icon
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("fill", "#494C6B");
      path.setAttribute("fill-rule", "evenodd");
      path.setAttribute(
        "d",
        "M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
      );
      svgClose.appendChild(path);

      svgClose.addEventListener("click", () => deleteItem(item.id));

      divLi.appendChild(checkbox);
      divLi.appendChild(paragraph);

      li.appendChild(imgDragIcon);
      li.appendChild(divLi);
      li.appendChild(svgClose);
      ulItems.appendChild(li);
    });
  }

  [all, active, completed].forEach((btn) =>
    btn.addEventListener("click", () => {
      const filterType = btn.id.slice(0, -2);
      const filteredItems = items.filter((item) => {
        if (filterType === "all") {
          return true;
        } else if (filterType === "active") {
          return !item.completed;
        } else if (filterType === "completed") {
          return item.completed;
        }
      });
      renderFilteredItems(filteredItems); // Met à jour l'interface avec les éléments filtrés
      setActiveButton(btn.id);
    })
  );

  function setActiveButton(btnId) {
    [all, active, completed].forEach((btn) => {
      if (btn.id === btnId) {
        btn.classList.add("active");
        btn.style.textUnderlineOffset = "6px";
        btn.style.textDecoration = "underline";
        btn.style.color = "#2563eb";
      } else {
        btn.classList.remove("active");
        btn.style.textDecoration = "none";
        btn.style.color = "";
      }
    });
  }
  filterItems("all");
});
