let supplierMatCount = 1; // Initialize a counter for unique IDs

function addMatSupplier(buttonElement) {
  // Hide previously generated buttons
  const existingButtons = document.querySelectorAll(".addMatSupplierButton");
  existingButtons.forEach(button => {
    button.style.display = "none"; // Hide the button
  });

  const newMatSupplier = document.createElement("div");
  newMatSupplier.id = "supplier" + supplierMatCount++; // Assign a unique ID
  newMatSupplier.classList.add("matSup");
  newMatSupplier.innerHTML = `
  <label for="transportMode">Transport Mode:</label>
    <form method="post">
      <select name="Mode">
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
    </form>
  <br>
  <button class="addMatSupplierButton" onclick="addMatSupplier(this)">Add Another Supplier</button>
  `;

  const parentElement = buttonElement.parentNode; // Get the parent "tab" element
  parentElement.insertBefore(newMatSupplier, buttonElement); // Insere antes do botão
}

// Initial button for first supplier
const initialButton = document.getElementById("addMatSupplierButton");
initialButton.addEventListener("click", function() {
  addMatSupplier(this); // Call the addMatSupplier function for the initial button
});
