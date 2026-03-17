const circle = document.querySelector('.circle');
const arrow = document.querySelector('.arrow');

if (circle && arrow) {
  circle.addEventListener('mouseover', function () {
    arrow.classList.add('active');
  });

  circle.addEventListener('mouseout', function () {
    arrow.classList.remove('active');
  });
}