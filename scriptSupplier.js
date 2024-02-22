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
    <label for="enterpriseName">Supplier Name ${supplierCount}:</label>
    <input type="text" id="enterpriseName-${supplierCount}" name="enterpriseName" required>
    <br>
    <label for="creatorName">What it Supplies:</label>
    <input type="text" id="creatorName-${supplierCount}" name="creatorName" required>
    <br>
    <button class="addSupplierButton" onclick="addSupplier(this)">Add another Supplier</button>
  `;

  const parentElement = buttonElement.parentNode; // Get the parent "tab" element
  parentElement.parentNode.insertBefore(newProcess, parentElement.nextSibling); // Insert after parent
}

// Initial button for first supplier
const initialButton = document.getElementById("addSupplierButton");
initialButton.addEventListener("click", function() {
  addSupplier(this); // Call the addSupplier function for the initial button
});
