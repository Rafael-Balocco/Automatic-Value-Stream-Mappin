let inventoryCount = 1; // Initialize a counter for unique IDs

function addInventory(buttonElement) {
  const existingButtons = document.querySelectorAll(".addInventoryButton");
  existingButtons.forEach(button => {
    button.style.display = "none"; // Hide the button
  });

  const newInventory = document.createElement("div");
  newInventory.id = "inventory" + inventoryCount++; // Assign a unique ID
  newInventory.classList.add("inventory");
  newInventory.innerHTML = `
    <br>
    <label for="relatedProcess">Process ${inventoryCount} Inventory:</label>
    <input type="number" class="processINumber" name="processINumber" required>
    <br>
    <br>
    <label for="quantity">Quantity:</label>
    <input type="number" class="inventoryQuantity" name="inventoryQuantity" required>
    <br>
    <br>
    <button class="addInventoryButton" onclick="addInventory(this)">Add Another Inventory</button>
  `;

  const formElement = document.getElementById("inventoryForm"); // Get the form element
  formElement.appendChild(newInventory); // Append the new supplier inside the form

}

// Initial button for first inventory
const initialButton = document.getElementById("addInventoryButton");
initialButton.addEventListener("click", function() {
  addInventory(this); // Call the addInventory function for the initial button
});
