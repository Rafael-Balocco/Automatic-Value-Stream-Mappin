function showScenario() {
  var selectedOption = document.querySelector('select[name="Type"]').value;
  var eletronicScenario = document.getElementById("eletronicScenario");
  var physicalScenario = document.getElementById("physicalScenario");
  
  // Hide both scenarios initially
  eletronicScenario.style.display = "none";
  physicalScenario.style.display = "none";
  
  // Show the selected scenario
  if (selectedOption === "Eletronic") {
    eletronicScenario.style.display = "block";
  } else if (selectedOption === "Physical") {
    physicalScenario.style.display = "block";
  }
}
