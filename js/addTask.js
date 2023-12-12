document.addEventListener("DOMContentLoaded", () => {
  const inputForm = document.getElementById("inputForm");
  const ulItems = document.getElementById("ulItems");
  const allBtn = document.getElementById("allId");
  const activeBtn = document.getElementById("activeId");
  const completedBtn = document.getElementById("completedId");
  const itemCount = document.getElementById("itemCount");

  let items = [];

  inputForm.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newItem = {
        id: Date.now(),
        text: inputForm.value,
        completed: false,
      };
      items.push(newItem);
      renderItems();
      inputForm.value = "";
    }
  });

  function deleteItem(id) {
    items = items.filter((item) => item.id !== id);
    renderItems();
  }

  function toggleComplete(id) {
    items = items.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });
    renderItems();
  }

  function renderItems() {
    ulItems.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add(
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
        "space-x-4"
      );
      li.draggable = "true";

      const divLi = document.createElement("div");
      divLi.classList.add("flex", "items-center", "space-x-4");

      const drag = document.createElement("img");
      drag.src = "./public/images/drag.png";
      drag.classList.add("h-5", "w-5", "hidden", "hover:block");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.style.marginRight = "10px";
      checkbox.style.marginLeft = "10px";
      checkbox.classList.add(
        "rounded-full",
        "w-5",
        "h-5",
        "border-gray-200",
        "dark:border:gray-500",
        "dark:text-gray-600"
      );
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", () => toggleComplete(item.id));

      const paragraph = document.createElement("p");
      paragraph.style.marginTop = "0.25rem";
      paragraph.classList.add(
        "p",
        "cursor-pointer",
        "hover:text-gray-900",
        "dark:hover:text-gray-200",
        "break-all"
      );
      paragraph.textContent = item.text;
      paragraph.style.textDecoration = item.completed ? "line-through" : "none";
      paragraph.style.color = item.completed ? "gray" : "";

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("flex", "w-6", "h-6", "shrink-0");
      const iconDelete = document.createElement("img");
      iconDelete.src = "./public/images/icon-cross.svg";
      deleteBtn.appendChild(iconDelete);
      deleteBtn.addEventListener("click", () => deleteItem(item.id));

      divLi.appendChild(drag);
      divLi.appendChild(checkbox);
      divLi.appendChild(paragraph);

      li.appendChild(divLi);
      li.appendChild(deleteBtn);

      li.addEventListener("mouseover", () => {
        drag.classList.remove("hidden"); // Show the icon on hover
      });

      li.addEventListener("mouseout", () => {
        drag.classList.add("hidden"); // Hide the icon when not hovered
      });

      ulItems.appendChild(li);
    });
    updateItemCount();
  }

  function updateItemCount() {
    const count = items.filter((item) => !item.completed).length;
    itemCount.textContent = `${count} item${count !== 1 ? "s" : ""} left`;
  }

  // supprimer des items Completed
  const clearAllBtn = document.getElementById("clearAllBtn");
  clearAllBtn.addEventListener("click", () => {
    items = items.filter((item) => !item.completed);
    renderItems();
    updateItemCount();
  });

  // le fitre des taches
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

  function renderFilteredItems(filteredItems) {
    ulItems.innerHTML = "";
    filteredItems.forEach((item) => {
      const li = document.createElement("li");
      li.classList.add(
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
        "space-x-4"
      );
      li.draggable = "true";

      const divLi = document.createElement("div");
      divLi.classList.add("flex", "items-center", "space-x-4");

      const drag = document.createElement("img");
      drag.src = "./public/images/drag.png";
      drag.classList.add("h-5", "w-5", "hidden", "hover:block");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.style.marginRight = "10px";
      checkbox.style.marginLeft = "10px";
      checkbox.classList.add(
        "rounded-full",
        "w-5",
        "h-5",
        "border-gray-200",
        "dark:border:gray-500",
        "dark:text-gray-600"
      );
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", () => toggleComplete(item.id));

      const paragraph = document.createElement("p");
      paragraph.style.marginTop = "0.25rem";
      // paragraph.style.overflowWrap = "break-word";
      paragraph.style.wordBreak = "break-all";
      paragraph.classList.add(
        "p",
        "cursor-pointer",
        "hover:text-gray-900",
        "dark:hover:text-gray-200"
      );
      paragraph.textContent = item.text;
      paragraph.style.textDecoration = item.completed ? "line-through" : "none";
      paragraph.style.color = item.completed ? "gray" : "";

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("flex", "w-6", "h-6", "shrink-0");
      const iconDelete = document.createElement("img");
      iconDelete.src = "./public/images/icon-cross.svg";
      deleteBtn.appendChild(iconDelete);
      deleteBtn.addEventListener("click", () => deleteItem(item.id));

      divLi.appendChild(drag);
      divLi.appendChild(checkbox);
      divLi.appendChild(paragraph);

      li.appendChild(divLi);
      li.appendChild(deleteBtn);

      li.addEventListener("mouseover", () => {
        drag.classList.remove("hidden"); // Show the icon on hover
      });

      li.addEventListener("mouseout", () => {
        drag.classList.add("hidden"); // Hide the icon when not hovered
      });

      ulItems.appendChild(li);
    });
  }

  [allBtn, activeBtn, completedBtn].forEach((btn) =>
    btn.addEventListener("click", () => {
      const filterType = btn.id.slice(0, -2);
      filterItems(filterType);
      setActiveButton(btn.id);
    })
  );

  function setActiveButton(btnId) {
    [allBtn, activeBtn, completedBtn].forEach((btn) => {
      if (btn.id === btnId) {
        btn.classList.add("active", "text-gray-600", "dark:text-gray-300");
        btn.style.textUnderlineOffset = "6px";
        btn.style.textDecoration = "underline";
      } else {
        btn.classList.remove("active", "text-gray-600", "dark:text-gray-300");
        btn.style.textDecoration = "none";
      }
    });
  }

  // Initialisation
  filterItems("all");
});
