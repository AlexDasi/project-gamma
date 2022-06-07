// Get the root element
var r = document.querySelector(':root');

// Function to get the variable
function myFunction_get() {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
}

// Function to change the variable
function myFunction_setDark() {
  r.style.setProperty('--main-color', '--bkg-color');

};

function myFunction_setLight() {
  r.style.setProperty('--bkg-color', '--main-color');

};


// const btn = document.getElementById('arrow');

// btn.addEventListener('click', function myFunction_set() {

  // const box = document.getElementById('box');

  // box.style.backgroundColor = 'coral';

  // 👇️ optionally change text color
  // box.style.color = 'white';



