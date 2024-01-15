// From step 1 to step 2
const container1 = document.getElementById('container1');
  const container2 = document.getElementById('container2');
  const nextButton = document.getElementById('nextButton');

  nextButton.addEventListener('click', function() {
    container1.style.display = 'none';
    container2.style.display = 'block';
  });

// From step 2 to step 3
  const container3 = document.getElementById('container3');
  const nextButton2 = document.getElementById('nextButton2');

  nextButton2.addEventListener('click', function() {
    container2.style.display = 'none';
    container3.style.display = 'block';
  });