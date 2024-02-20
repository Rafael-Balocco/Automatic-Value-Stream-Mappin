const addProcessButton = document.getElementById("addProcessButton");

addProcessButton.addEventListener("click", function() {
    const newProcess = document.createElement("div");
    newProcess.classList.add("tab");
    newProcess.innerHTML = `
        <label for="enterpriseName">Supplier Name:</label>
        <input type="text" id="enterpriseName" name="enterpriseName" required>
        <br>
        <label for="creatorName">What it Supplies:</label>
        <input type="text" id="creatorName" name="creatorName" required>
        <br>
        <button id="addProcessButton">Add another Supplier</button>
    `;

    const parentElement = document.querySelector(".tab:last-child"); // Get the last existing process section
    parentElement.parentNode.insertBefore(newProcess, parentElement.nextSibling); // Insert the new section after the last one
  });