function myFunction() {
  var val = document.getElementById("options-in-menu").value;
  document.getElementById("customer&MRP").style.display="none";
  document.getElementById("supplier&MRP").style.display="none";
  document.getElementById("process&MRP").style.display="none";
  document.getElementById(val).style.display="block";
}
