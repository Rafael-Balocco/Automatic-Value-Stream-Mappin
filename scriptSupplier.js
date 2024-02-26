let supplierCount = 1; // Inicializa um contador para IDs únicos

function addSupplier(buttonElement) {
    // Esconde os botões gerados anteriormente
    const existingButtons = document.querySelectorAll(".addSupplierButton");
    existingButtons.forEach(button => {
        button.style.display = "none"; // Esconde o botão
    });

    const newSupplier = document.createElement("div");
    newSupplier.id = "supplier" + supplierCount++;
    newSupplier.classList.add("supplier");
    newSupplier.innerHTML = `
        <br>
        <label for="enterpriseName">Supplier ${supplierCount} Name:</label>
        <input type="text" class="enterpriseName" name="enterpriseName" required>
        <br>
        <label for="creatorName">What it Supplies:</label>
        <input type="text" class="creatorName" name="creatorName" required>
        <br>
        <button class="removeSupplierButton">Remove Supplier</button>
        <button class="addSupplierButton" onclick="addSupplier(this)">Add another Supplier</button>
    `;

    const formElement = document.getElementById("supplierForm"); // Obtém o elemento do formulário
    formElement.appendChild(newSupplier); // Anexa o novo fornecedor dentro do formulário

    // Adiciona o ouvinte de evento para remover o fornecedor
    const removeButton = newSupplier.querySelector(".removeSupplierButton");
    removeButton.addEventListener("click", function() {
        const supplierToRemove = this.parentNode;
        const previousSupplier = supplierToRemove.previousSibling;
        const addButton = previousSupplier.querySelector(".addSupplierButton");
        addButton.style.display = "block"; // Mostra o botão "Adicionar Fornecedor" para o fornecedor anterior
        supplierToRemove.remove();
        supplierCount--;
    });
}

// Botão inicial para o primeiro fornecedor
const initialButton = document.getElementById("addSupplierButton");
initialButton.addEventListener("click", function() {
    addSupplier(this); // Chama a função addSupplier para o botão inicial
});
