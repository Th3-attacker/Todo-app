const sortable = new Sortable(document.getElementById("ulItems"));

// Event listener for when an item is chosen (dragged)
sortable.option("onChoose", function (evt) {
  evt.item.style.backgroundColor = "#bae6fd"; // color for the dark Mode
});

// Event listener for when an item is unchosen (dropped)
sortable.option("onUnchoose", function (evt) {
  evt.item.style.backgroundColor = ""; // Reset background color when item is dropped
});
