const arrow = document.querySelectorAll('.arrow-container');

function getClicked () {
  this.classList.add('active');
}

function offClicked () {
  this.classList.remove('active');
  debugger;
}

div.addEventListener('mouseover', getClicked);
debugger;
div.addEventListener('mouseout', offClicked);




// document.querySelectorAll('.filter').forEach(function(button){
//   button.addEventListener('click', (ev) => {
//     document.querySelector('.active').classList.remove('.active');
//     ev.target.classList.add('.active');
//     showCategorie(products, ev.target);
//   })
// })
