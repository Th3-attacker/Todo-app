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
        "p-4",
        "py-4",
        "lg:py-6",
        "flex",
        "justify-between",
        "items-center",
        "border-b",
        "border-gray-200"
      );
      li.draggable = "true";

      const divLi = document.createElement("div");
      divLi.classList.add("flex", "space-x-4", "items-center");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("rounded-full", "w-5", "h-5");
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", () => toggleComplete(item.id));

      const paragraph = document.createElement("p");
      paragraph.classList.add("p", "cursor-pointer", "hover:text-gray-900");
      paragraph.textContent = item.text;
      paragraph.style.textDecoration = item.completed ? "line-through" : "none";
      paragraph.style.color = item.completed ? "gray" : "";

      const deleteBtn = document.createElement("button");
      const iconDelete = document.createElement("img");
      iconDelete.src = "./public/images/icon-cross.svg";
      deleteBtn.appendChild(iconDelete);
      deleteBtn.addEventListener("click", () => deleteItem(item.id));

      divLi.appendChild(checkbox);
      divLi.appendChild(paragraph);

      li.appendChild(divLi);
      li.appendChild(deleteBtn);

      ulItems.appendChild(li);
    });
    updateItemCount();
  }

  function updateItemCount() {
    const count = items.filter((item) => !item.completed).length;
    itemCount.textContent = `${count} item${count !== 1 ? "s" : ""} left`;
  }

  // supprimer Tout
  const clearAllBtn = document.getElementById("clearAllBtn");
  clearAllBtn.addEventListener("click", () => {
    items = [];
    renderItems();
    setActiveButton("");
    itemCount.textContent = "0 items";
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
        "p-4",
        "py-4",
        "lg:py-6",
        "flex",
        "justify-between",
        "items-center",
        "border-b",
        "border-gray-200"
      );

      const divLi = document.createElement("div");
      divLi.classList.add("flex", "space-x-4", "items-center");

      const label = document.createElement("label");
      label.classList.add(
        "inline-flex",
        "items-center",
        "cursor-pointer",
        "hover:"
      );

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("rounded-full", "w-5", "h-5");
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", () => toggleComplete(item.id));

    //   const span = document.createElement("span");
    //   span.classList.add(
    //     "relative",
    //     "inline-block",
    //     "w-5",
    //     "h-5",
    //     "border",
    //     "border-gray-300",
    //     "transition",
    //     "duration-300",
    //     "ease-in-out"
    //   );

      const paragraph = document.createElement("p");
      paragraph.classList.add("p", "cursor-pointer", "hover:text-gray-900");
      paragraph.textContent = item.text;
      paragraph.style.textDecoration = item.completed ? "line-through" : "none";

      const deleteBtn = document.createElement("button");
      const iconDelete = document.createElement("img");
      iconDelete.src = "./public/images/icon-cross.svg";
      deleteBtn.appendChild(iconDelete);
      deleteBtn.addEventListener("click", () => deleteItem(item.id));

      label.appendChild(checkbox);
    //   label.appendChild(span);

      divLi.appendChild(label);
      divLi.appendChild(paragraph);

      li.appendChild(divLi);
      li.appendChild(deleteBtn);

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
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Initialisation
  filterItems("all");
});

//  drag and drop

// document.addEventListener("DOMContentLoaded", function () {
//   const ulItems = document.getElementById("ulItems");
//   let draggedItem = null;

//   ulItems.addEventListener("dragstart", function (event) {
//     draggedItem = event.target;
//     // Ajouter une classe pour un style visuel (facultatif)
//     event.target.classList.add("dragging");
//   });

//   ulItems.addEventListener("dragover", function (event) {
//     event.preventDefault();
//   });

//   ulItems.addEventListener("dragenter", function (event) {
//     event.preventDefault();
//     if (event.target.tagName === "LI") {
//       event.target.classList.add("dragover");
//     }
//   });

//   ulItems.addEventListener("dragleave", function (event) {
//     if (event.target.tagName === "LI") {
//       event.target.classList.remove("dragover");
//     }
//   });

//   ulItems.addEventListener("drop", function (event) {
//     event.preventDefault();
//     if (event.target.tagName === "LI") {
//       event.target.classList.remove("dragover");
//       ulItems.insertBefore(draggedItem, event.target.nextSibling);
//     }
//     // Supprimer la classe de style visuel (facultatif)
//     ulItems
//       .querySelectorAll("li")
//       .forEach((item) => item.classList.remove("dragging"));
//   });
// });



