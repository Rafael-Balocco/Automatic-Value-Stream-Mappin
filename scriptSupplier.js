let supplierCount = 1; // Initialize a counter for unique IDs

function addSupplier(buttonElement) {
    // Hide previously generated buttons
    const existingButtons = document.querySelectorAll(".addSupplierButton");
    existingButtons.forEach(button => {
        button.style.display = "none"; // Hide the button
    });

    const newSupplier = document.createElement("div");
    newSupplier.classList.add("tab");
    newSupplier.innerHTML = `
        <label for="enterpriseName">Supplier Name ${supplierCount}:</label>
        <input type="text" id="enterpriseName-${supplierCount}" name="enterpriseName" required>
        <br>
        <label for="creatorName">What it Supplies:</label>
        <input type="text" id="creatorName-${supplierCount}" name="creatorName" required>
        <br>
        <button class="addSupplierButton" onclick="addSupplier(this)">Add another Supplier</button>
    `;

    const formElement = document.getElementById("supplierForm"); // Get the form element
    formElement.appendChild(newSupplier); // Append the new supplier inside the form

    supplierCount++; // Increment the supplier counter
}

// Initial button for first supplier
const initialButton = document.getElementById("addSupplierButton");
initialButton.addEventListener("click", function() {
    addSupplier(this); // Call the addSupplier function for the initial button
});
