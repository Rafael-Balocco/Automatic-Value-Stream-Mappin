let processCounter = 1; // Inicializa um contador para IDs únicos

function addProcess(buttonElement) {
    const existingButtons = document.querySelectorAll(".addProcessButton");
    existingButtons.forEach(button => {
        button.style.display = "none"; // Esconde o botão
    });

    const newProcess = document.createElement("div");
    newProcess.id = "process" + processCounter++;
    newProcess.classList.add("process");
    newProcess.innerHTML = `
        <br>

        <label for="processName">Process Name ${processCounter}:</label>
        <input type="text" class="processName" name="processName" required>
        <br>
        <br>
        <label for="cycleTime">Cycle Time (minutes):</label>
        <input type="number" class="cycleTime" name="cycleTime" required>
        <br>
        <br>
        <label for="availableTime">Available Time (minutes):</label>
        <input type="number" class="availableTime" name="availableTime" required>
        <br>
        <br>
        <label for="upTime">Up Time (minutes):</label>
        <input type="number" class="upTime" name="upTime" required>
        <br>
        <br>
        <label for="scrapRate">Scrap Rate (%):</label>
        <input type="number" class="scrapRate" name="scrapRate" min="0" max="100" step="0.01" required>
        <br>
        <br>
        <button class="addProcessButton" onclick="addProcess(this)">Add another Process</button>
    `;

    const parentElement = buttonElement.parentNode; // Obtém o elemento pai "form"
    parentElement.insertBefore(newProcess, buttonElement); // Insere antes do botão
}

// Botão inicial para o primeiro processo
const initialButton = document.getElementById("addProcessButton");
initialButton.addEventListener("click", function() {
    addProcess(this); // Chama a função addProcess para o botão inicial
});
