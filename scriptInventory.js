let inventoryCount = 1; // Initialize a counter for unique IDs

function addInventory(buttonElement) {
  // Hide previously generated buttons
  const existingButtons = document.querySelectorAll(".addInventoryButton");
  existingButtons.forEach(button => {
    button.style.display = "none"; // Hide the button
  });

  const newProcess = document.createElement("div");
  newProcess.id = "inventory" + inventoryCount++; // Assign a unique ID
  newProcess.classList.add("tab");
  newProcess.innerHTML = `
    <label for="Related Process">Process ${inventoryCount} Inventory Number:</label>
    <input type="text" id="processInvenNumber-${inventoryCount}" name="processNumber" required>
    <br>
    <label for="quantity">Quantity:</label>
    <input type="text" id="inventoryQuantity-${inventoryCount}" name="inventoryQuantity" required>
    <br>
    <button class="addInventoryButton" onclick="addInventory(this)">Add Another Inventory</button>
  `;

  const parentElement = buttonElement.parentNode; // Get the parent "tab" element
  parentElement.parentNode.insertBefore(newProcess, parentElement.nextSibling); // Insert after parent
}

// Initial button for first inventory
const initialButton = document.getElementById("addInventoryButton");
initialButton.addEventListener("click", function() {
  addInventory(this); // Call the addInventory function for the initial button
});
