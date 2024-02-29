let processCounter = 1; // Inicializa um contador para IDs únicos

function addProcess(buttonElement) {
    const existingButtons = document.querySelectorAll(".addProcessButton");
    existingButtons.forEach(button => {
        button.style.display = "none"; // Esconde o botão
    });

    if(processCounter > 1){
        const existingRemoveButtons = document.querySelectorAll(".removeProcessButton");
        existingRemoveButtons.forEach(button =>{
            button.style.display ="none";
        })
    }


    const newProcess = document.createElement("div");
    newProcess.id = "process" + processCounter;
    processCounter++;
    newProcess.classList.add("process"); // Adiciona a classe "process"
    newProcess.innerHTML = `
        <br>
        <label for="processName">Process ${processCounter} Name:</label>
        <input type="text" class="processName" name="processName" required>
        <br>
        <br>
        <label for="cycleTime">Cycle Time (Seconds):</label>
        <input type="number" class="cycleTime" name="cycleTime" required>
        <br>
        <br>
        <label for="availableTime">Available Time (Seconds):</label>
        <input type="number" class="availableTime" name="availableTime" >
        <br>
        <br>
        <label for="upTime">Up Time (%):</label>
        <input type="number" class="upTime" name="upTime" >
        <br>
        <br>
        <label for="scrapRate">Scrap Rate (%):</label>
        <input type="number" class="scrapRate" name="scrapRate" min="0" max="100" step="0.01">
        <br>
        <br>
        <button type="button" class="removeProcessButton">Remove Process</button>
        <button type = "button" class="addProcessButton" onclick="addProcess(this)">Add another Process</button>
    `;

    const formElement = document.getElementById("processForm"); // Obtém o elemento do formulário
    formElement.appendChild(newProcess); // Anexa o novo fornecedor dentro do formulário

    const removeButton = newProcess.querySelector(".removeProcessButton");
    removeButton.addEventListener("click", function() {
        if(processCounter==2) {
            const processToRemove = this.parentNode;
            processToRemove.remove();
            processCounter--;
            const existingButtons = document.querySelectorAll(".addProcessButton");
            existingButtons.forEach(button => {
                button.style.display = "inline"; // mostra o botão
            });
        }
        if(processCounter>2){
            const processToRemove = this.parentNode;
            const previousProcess = processToRemove.previousSibling;
            const removeButtonDisplay = previousProcess.querySelector(".removeProcessButton");
            removeButtonDisplay.style.display = "inline";
            const addButton = previousProcess.querySelector(".addProcessButton");
            addButton.style.display = "inline"; // Mostra o botão "Adicionar Fornecedor" para o fornecedor anterior
            processToRemove.remove();
            processCounter--;
        }    
    });

}

// Botão inicial para o primeiro processo
const initialButton = document.getElementById("addProcessButton");
initialButton.addEventListener("click", function() {
    addProcess(this); // Chama a função addProcess para o botão inicial
});
