let processCounter = 1; // Initialize a counter for unique IDs

function addProcess(buttonElement) {
  const newProcess = document.createElement("div");
  newProcess.id = "supplier" + processCounter++; // Assign a unique ID
  newProcess.classList.add("tab");
  newProcess.innerHTML = `
    <label for="processName">Process Name ${processCounter}:</label>
    <input type="text" id="processName" name="processName" required>
    <br>
    <label for="cycleTime">Cycle Time:</label>
    <input type="text" id="cycleTime" name="cycleTime" required>
    <br>
    <label for="avaibleTime">Avaible Time:</label>
    <input type="text" id="avaibleTime" name="avaibleTime" required>
    <br>
    <label for="upTime">Up Time:</label>
    <input type="text" id="upTime" name="upTime" required>
    <br>
    <label for="scrapRate">Scrap Rate:</label>
    <input type="text" id="scrapRate" name="scrapRate" required>
    <br>
    <button id="addProcessButton">Add another Process</button>
  `;

  const parentElement = buttonElement.parentNode; // Get the parent "tab" element
  parentElement.parentNode.insertBefore(newProcess, parentElement.nextSibling); // Insert after parent
}

// Initial button for first supplier
const initialButton = document.getElementById("addProcessButton");
initialButton.addEventListener("click", function() {
  addProcess(this); // Call the addProcess function for the initial button
});
