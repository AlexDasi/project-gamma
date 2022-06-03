// Get the root element
var r = document.querySelector(':root');

// Create a function for getting a variable value
function myFunction_get() {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
}

// Create a function for setting a variable value
function myFunction_set() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--main-color', '--bkg-color');

};


// const btn = document.getElementById('arrow');

// btn.addEventListener('click', function myFunction_set() {

  // const box = document.getElementById('box');

  // box.style.backgroundColor = 'coral';

  // 👇️ optionally change text color
  // box.style.color = 'white';



