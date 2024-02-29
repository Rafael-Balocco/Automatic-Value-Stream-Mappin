let inventoryCount = 1; // Initialize a counter for unique IDs

function addInventory(buttonElement) {
  const existingButtons = document.querySelectorAll(".addInventoryButton");
  existingButtons.forEach(button => {
    button.style.display = "none"; // Hide the button
  });

  if(inventoryCount > 1){
    const existingRemoveButtons = document.querySelectorAll(".removeInventoryButton");
    existingRemoveButtons.forEach(button => {
        button.style.display = "none"; // Esconde o botão
    });
  }

  const newInventory = document.createElement("div");
  newInventory.id = "inventory" + inventoryCount; // Assign a unique ID
  inventoryCount++;
  newInventory.classList.add("inventory");
  newInventory.innerHTML = `
    <br>
    <label for="relatedProcess">Process ${inventoryCount} Inventory:</label>
    <input type="number" class="processINumber" name="processINumber" required>
    <br><br>
    <button type = "button" class="removeInventoryButton">Remove Inventory</button> 
    <button type = "button" class="addInventoryButton" onclick="addInventory(this)">Add Another Inventory</button>
  `;

  const formElement = document.getElementById("inventoryForm"); // Get the form element
  formElement.appendChild(newInventory); // Append the new supplier inside the form

  const removeButton = newInventory.querySelector(".removeInventoryButton");
  removeButton.addEventListener("click", function() {
      if(inventoryCount==2) {
          const inventoryToRemove = this.parentNode;
          inventoryToRemove.remove();
          inventoryCount--;
          const existingButtons = document.querySelectorAll(".addInventoryButton");
          existingButtons.forEach(button => {
              button.style.display = "inline"; // mostra o botão
          });
      }
      if(inventoryCount>2){
          const inventoryToRemove = this.parentNode;
          const previousInventory = inventoryToRemove.previousSibling;
          const removeButtonDisplay = previousInventory.querySelector(".removeInventoryButton");
          removeButtonDisplay.style.display = "inline";
          const addButton = previousInventory.querySelector(".addInventoryButton");
          addButton.style.display = "inline"; // Mostra o botão "Adicionar Fornecedor" para o fornecedor anterior
          inventoryToRemove.remove();
          inventoryCount--;
      }    
  });
}

// Initial button for first inventory
const initialButton = document.getElementById("addInventoryButton");
initialButton.addEventListener("click", function() {
  addInventory(this); // Call the addInventory function for the initial button
});
