const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
const cashin_nextButton = document.getElementById('cashin_nextButton');

cashin_nextButton.addEventListener('click', function() {
  const salaryValue = parseInt(salaryInput.value);
  let ageInput = parseInt(document.getElementById('Age').value);
  let industryInput = document.getElementById('Industry').value;
  var formData = {
    salary: salaryValue,
    income_after_tax: netMonthlySalary,
  };
  var formData2 = {
    age: ageInput,
    industry: industryInput
  };

  localStorage.setItem('IncomeData', JSON.stringify(formData));
  localStorage.setItem('UserProfileData', JSON.stringify(formData2));

  container1.style.display = 'none';
  container2.style.display = 'block';
});

const container3 = document.getElementById('container3');
const cashout_nextButton = document.getElementById('cashout_nextButton');

  cashout_nextButton.addEventListener('click', function() {
    container2.style.display = 'none';
    container3.style.display = 'block';
  });

const assets_nextButton = document.getElementById('assets_nextButton');
