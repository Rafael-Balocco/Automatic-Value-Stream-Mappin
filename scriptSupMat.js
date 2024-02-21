let supplierCount = 1; // Initialize a counter for unique IDs

function addSupplier(buttonElement) {
  // Hide previously generated buttons
  const existingButtons = document.querySelectorAll(".addSupplierButton");
  existingButtons.forEach(button => {
    button.style.display = "none"; // Hide the button
  });

  const newProcess = document.createElement("div");
  newProcess.id = "supplier" + supplierCount++; // Assign a unique ID
  newProcess.classList.add("tab");
  newProcess.innerHTML = `
  <label for="enterpriseName">Supplier Number ${supplierCount} (Same in Supplier Tab):</label>
  <input type="text" id="enterpriseName" name="enterpriseName" required>
  <br>
  <label for="period">Period (Specify the Unit):</label>
  <input type="text" id="period" name="period" required>
  <br>
  <label for="transportMode">Transport Mode:</label>
  <form method="post">
    <select name="Mode">
        <option value="Airplane">Airplane</option>
        <option value="Bike">Bike</option>
        <option value="Car">Car</option>
        <option value="Multi">Multi Modal</option>
        <option value="Ship">Ship</option>
        <option value="Train">Train</option>
        <option value="Truck">Truck</option>
    </select>
  </form>
  <br>
  <button class="addSupplierButton" onclick="addSupplier(this)">Add Another Supplier</button>
  `;

  const parentElement = buttonElement.parentNode; // Get the parent "tab" element
  parentElement.parentNode.insertBefore(newProcess, parentElement.nextSibling); // Insert after parent
}

// Initial button for first supplier
const initialButton = document.getElementById("addSupplierButton");
initialButton.addEventListener("click", function() {
  addSupplier(this); // Call the addSupplier function for the initial button
});
