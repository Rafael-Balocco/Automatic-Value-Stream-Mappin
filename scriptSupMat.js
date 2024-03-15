let supplierMatCount = 1; // Initialize a counter for unique IDs

function addMatSupplier(buttonElement) {
  const existingButtons = document.querySelectorAll(".addMatSupplierButton");
  existingButtons.forEach(button => {
    button.style.display = "none"; // Hide the button
  });

  if(supplierMatCount > 1){
    const existingRemoveButtons = document.querySelectorAll(".removeMatSupplierButton");
    existingRemoveButtons.forEach(button => {
        button.style.display = "none"; // Esconde o botão
    });
  }

  const newMatSupplier = document.createElement("div");
  newMatSupplier.id = "matSup" + supplierMatCount; // Assign a unique ID
  supplierMatCount++;
  newMatSupplier.classList.add("matSup");
  newMatSupplier.innerHTML = `
  <h3>Supplier Number ${supplierMatCount}</h3>
  <br>
  <label for="ModeSup">Transport Mode:</label>
      <select name="ModeSup">
        <option value="none">Select an option</option>
        <option value="Airplane">Airplane</option>
        <option value="Bike">Bike</option>
        <option value="Car">Car</option>
        <option value="Multi">Multi Modal</option>
        <option value="Ship">Ship</option>
        <option value="Train">Train</option>
        <option value="Truck">Truck</option>
      </select>
      <br>
      <br>
      <label for="enterpriseName">Shift Period:</label>
      <input type="text" class="enterpriseMatFlow" name="enterpriseMatFlow" required>
      <br>
      <label for="quantityShift">Quantity per Shift:</label>
      <input type="number" class="quantityShift" name="quantityShift" required>
  <br>
  <button type="button" class="removeMatSupplierButton"> Remove Supplier</button>
  <button type="button" class="addMatSupplierButton" onclick="addMatSupplier(this)">Add Another Supplier</button>
  `;

  const formElement = document.getElementById("MatForm"); // Obtém o elemento do formulário
  formElement.appendChild(newMatSupplier); // Anexa o novo fornecedor dentro do formulário

  const removeButton = newMatSupplier.querySelector(".removeMatSupplierButton");
  removeButton.addEventListener("click", function() {
      if(supplierMatCount==2) {
          const supplierMatToRemove = this.parentNode;
          supplierMatToRemove.remove();
          supplierMatCount--;
          const existingButtons = document.querySelectorAll(".addMatSupplierButton");
          existingButtons.forEach(button => {
            button.style.display = "inline"; // mostra o botão
          });
      }
      if(supplierMatCount>2){
          const supplierMatToRemove = this.parentNode;
          const previousMatSupplier = supplierMatToRemove.previousSibling;
          const removeButtonDisplay = previousMatSupplier.querySelector(".removeMatSupplierButton");
          removeButtonDisplay.style.display = "inline";
          const addButton = previousMatSupplier.querySelector(".addMatSupplierButton");
          addButton.style.display = "inline"; // Mostra o botão "Adicionar Fornecedor" para o fornecedor anterior
          supplierMatToRemove.remove();
          supplierMatCount--;
      }    
  });
}

// Initial button for first supplier
const initialButton = document.getElementById("addMatSupplierButton");
initialButton.addEventListener("click", function() {
  addMatSupplier(this); // Call the addMatSupplier function for the initial button
});
