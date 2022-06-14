document.querySelector('.circle').addEventListener("mouseover", function () {
  document.querySelector('.arrow').classList.add('active')
}) 

document.querySelector('.circle').addEventListener("mouseout", function () {
  document.querySelector('.arrow').classList.remove('active')
}) 