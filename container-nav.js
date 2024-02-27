// Container 1

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

// Container 2

const container3 = document.getElementById('container3');
const cashout_nextButton = document.getElementById('cashout_nextButton');

cashout_nextButton.addEventListener('click', function() {

  let cost_sh_billsInput = document.getElementById('cost_sh_bills').value;
  let cost_travelInput = document.getElementById('cost_travel').value;
  let cost_groceriesInput = document.getElementById('cost_groceries').value;
  let cost_otherInput = document.getElementById('cost_other').value;

  var formData = {
    cost_sh_bills: cost_sh_billsInput,
    cost_travel: cost_travelInput,
    cost_groceries: cost_groceriesInput,
    cost_other: cost_otherInput,
  };
  
  localStorage.setItem('ExpensesData', JSON.stringify(formData));

  container2.style.display = 'none';
  container3.style.display = 'block';

});

// Container 3

const assets_nextButton = document.getElementById('assets_nextButton');

assets_nextButton.addEventListener('click', function(){

  let amtSavings = document.getElementById('amount_Savings').value;
  let yieldSavings = document.getElementById('yield_Savings').value;
  let amtVanguard = document.getElementById('amt_Vanguard').value;
  let yieldVanguard = document.getElementById('yield_Vanguard').value;

  var formData = {
    savings_amt: amtSavings,
    savings_rate: yieldSavings,
    etf_amt: amtVanguard,
    etf_rate: yieldVanguard
  };

  localStorage.setItem('SavingsInvestmentsData', JSON.stringify(formData));
  window.location.href = 'signup.html';

});