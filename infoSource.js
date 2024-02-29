let infoCount = 1;

function myFunction() {
  var val = document.getElementById("options-in-menu-" +  infoCount).value;
  document.getElementById("customer&MRP-"+infoCount).style.display="none";
  document.getElementById("supplier&MRP-"+infoCount).style.display="none";
  document.getElementById("process&MRP-"+infoCount).style.display="none";
  document.getElementById(val).style.display="block";
}

function addInfo(buttonElement) {
  // Hide previously generated buttons
  const existingButtons = document.querySelectorAll(".addInfoButton");
  existingButtons.forEach(button => {
    button.style.display = "none"; // Hide the button
  });

  if(infoCount >1){
    const existingRemoveButtons = document.querySelectorAll(".removeInfoButton");
    existingRemoveButtons.forEach(button => {
        button.style.display = "none"; // Esconde o botão
    });
  }

  const newInfoFlow = document.createElement("div");
  newInfoFlow.id = "info" + infoCount;
  infoCount++;
  newInfoFlow.classList.add("infoFlow");
  newInfoFlow.innerHTML = `
    <label for="infoType">Connection ${infoCount}</label>
    <select id="options-in-menu-${infoCount}">
      <option value="none">Select an option</option>
      <option value="customer&MRP-${infoCount}">Between Customer and Production Control</option>
      <option value="supplier&MRP-${infoCount}">Between Supplier and Production Control</option>
      <option value="process&MRP-${infoCount}">Between Process and Production Control</option>
    </select>
    <br>

    <div id="customer&MRP-${infoCount}" style="display: none;">
    <br>
    <h3>Flow Between Customer and Production Control</h3>
    <br>
    <label for="infoType">Type of Information:</label>
    <form method="post">
      <select name="Mode">
        <option value="none">Select an option</option>
        <option value="eletronic">Eletronic (Email, Message ...)</option>
        <option value="physical">Physical (Document, Told ...)</option>
      </select>
      <br>
    </form>
    
    <br>
    <br>

    <label for="period">Period (Specify the Unit):</label>
    <input type="text" class = "period" name="period" required>
    <br>
    <label for="content">Information Content:</label>
    <input type="text" class="content" name="period" required>
    <br>
    <label for="receive">Who receive the Information:</label>
    <form method="post">
      <select name="receive">
        <option value="none">Select an option</option>
        <option value="eletronic">Production Control</option>
        <option value="physical">Customer</option>
      </select>
    </form>

    <br>
    
    </div>

    <div id="supplier&MRP-${infoCount}" style="display: none;">
    <br>
    <h3>Flow Between Supplier and Production Control</h3>
    <br>
    <label for="infoType">Type of Information:</label>
    <form method="post">
      <select name="Mode">
        <option value="none">Select an option</option>
        <option value="eletronic">Eletronic (Email, Message ...)</option>
        <option value="physical">Physical (Document, Told ...)</option>
      </select>
    </form>

    <br>

    <label for="period">Period (Specify the Unit):</label>
    <input type="text" class="period" name="period" required>
    <br>
    <label for="content">Information Content:</label>
    <input type="text" class="content" name="period" required>
    <br>
    <label for="receive">Who receive the Information:</label>
    <form method="post">
      <select name="receive">
        <option value="none">Select an option</option>
        <option value="eletronic">Production Control</option>
        <option value="physical">Supplier</option>
      </select>
    </form>
    <br>

    <label for="supName">Supplier Number (Same in Supplier Tab):</label>
    <input type="number" class="supName" name="supName" required> 

    
    </div>

    <div id="process&MRP-${infoCount}" style="display: none;">
    <br>
    <h3>Flow Between Process and Production Control</h3>
    <br>
    <label for="infoType">Type of Information:</label>
    <form method="post">
      <select name="Mode">
        <option value="none">Select an option</option>
        <option value="eletronic">Eletronic (Email, Message ...)</option>
        <option value="physical">Physical (Document, Told ...)</option>
      </select>
    </form>

    <br>

    <label for="period">Period (Specify the Unit):</label>
    <input type="text" class="period" name="period" required>
    <br>
    <label for="content">Information Content:</label>
    <input type="text" class="content" name="content" required>
    <br>
    <label for="receive">Who receive the Information:</label>
    <form method="post">
      <select name="receive">
        <option value="none">Select an option</option>
        <option value="eletronic">Production Control</option>
        <option value="physical">Process</option>
      </select>
    </form>
    <br>
    <label for="processNumber">Process Number:</label>
    <input type="number" class="processNumber" name="processNumber" required>
    </div>
    <br>
    <button type="button" class="removeInfoButton">Remove Information</button>
    <button type = "button" class="addInfoButton" onclick="addInfo(this)">Add Another Information</button>
    <script src="scriptSupplier.js"></script>
  `;

  newInfoFlow.querySelector(`[id="options-in-menu-${infoCount}"]`).addEventListener("change", myFunction);

  const formElement = document.getElementById("infoForm"); // Obtém o elemento do formulário
  formElement.appendChild(newInfoFlow); // Anexa o novo fornecedor dentro do formulário

  const removeButton = newInfoFlow.querySelector(".removeInfoButton");
  removeButton.addEventListener("click", function() {
        
        if(infoCount==2) {
            const infoToRemove = this.parentNode;
            infoToRemove.remove();
            infoCount--;
            const existingButtons = document.querySelectorAll(".addInfoButton");
            existingButtons.forEach(button => {
                button.style.display = "inline"; // mostra o botão
            });
        }

        if(infoCount>2){
            const infoToRemove = this.parentNode;
            const previousInfo = infoToRemove.previousSibling;
            const removeButtonDisplay = previousInfo.querySelector(".removeInfoButton");
            removeButtonDisplay.style.display = "inline";
            const addButton = previousInfo.querySelector(".addInfoButton");
            addButton.style.display = "inline"; // Mostra o botão "Adicionar Fornecedor" para o fornecedor anterior
            infoToRemove.remove();
            infoCount--;
        }    
    });

}

// Initial button for first supplier
const initialButton = document.getElementById("addInfoButton");
initialButton.addEventListener("click", function() {
  addInfo(this); // Call the addInfo function for the initial button
});