// First Chart
let netMonthlySalary;
let cashleft;
const salaryInput = document.getElementById('Salary');
const cashInChart = document.getElementById('cashInChart');
const chart = new Chart(cashInChart, { // "Cashin" chart
  type: 'bar',
  data: {
    labels: ['Cash In', 'Cash Out', 'Cash Left'],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    scales: {
      y: {
        type: 'linear', // Set the scale type to 'linear'
        beginAtZero: true,
      }
    }
  }
});
const costShelterBillsInput = document.getElementById('cost_sh_bills');
const costTravelInput = document.getElementById('cost_travel');
const costGroceriesInput = document.getElementById('cost_groceries');
const costOtherInput = document.getElementById('cost_other');
const cashFlowChartCanvas = document.getElementById('cashFlowChart');
const cashFlowChart = new Chart(cashFlowChartCanvas, { // Cashflow chart
  type: 'bar',
  data: {
    labels: ['Cash In', 'Cash Out', 'Cash Left'], 
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1
      },
    ]
  },
  options: {
    responsive: false,
    scales: {
      y: {
        type: 'linear', // Set the scale type to 'linear'
        beginAtZero: true,
      }
    }
  }
});

function updateChart(salary) { // Logic to update casinin chart with data
  netMonthlySalary = calculateNetSalary(salary);
  chart.data.datasets[0].data = [netMonthlySalary, null, null]; // Set netMonthlySalary value in Cash In column
  chart.update();

  const salaryAmountDisplay = document.getElementById('salaryAmount'); // Update text with numbers
  const netMonthlySalaryDisplay = document.getElementById('netMonthlySalaryDisplay');
  salaryAmountDisplay.textContent = salary.toFixed(2);
  netMonthlySalaryDisplay.textContent = netMonthlySalary.toFixed(2);
}
salaryInput.addEventListener('input', function () { // Update chart after salary value changes
  const salary = parseFloat(salaryInput.value);
  if (!isNaN(salary)) {
    updateChart(salary);
  }
});

// Second Chart

function updateCashFlowChart() {  // Logic to update cashflow chart with data
    const totalCosts =
      Number(costShelterBillsInput.value) +
      Number(costTravelInput.value) +
      Number(costGroceriesInput.value) +
      Number(costOtherInput.value);
    
    cashleft = netMonthlySalary - totalCosts
    cashFlowChart.data.datasets[0].data = [netMonthlySalary, totalCosts, cashleft];
    cashFlowChart.update();
  
    document.getElementById('totalCosts').textContent = totalCosts.toFixed(2); // Update text with numbers
    document.getElementById('cashLeftDisplay1').textContent = cashleft.toFixed(2);
    document.getElementById('cashLeftDisplay2').textContent = cashleft.toFixed(2);
  }
costShelterBillsInput.addEventListener('input', updateCashFlowChart); // Update chart after value changes
costTravelInput.addEventListener('input', updateCashFlowChart);
costGroceriesInput.addEventListener('input', updateCashFlowChart);
costOtherInput.addEventListener('input', updateCashFlowChart);
const initialSalary = parseFloat(salaryInput.value);
if (!isNaN(initialSalary)) {
  updateChart(initialSalary);
}
updateCashFlowChart();

// Third Chart
const amtSavingsInput = document.getElementById('amount_Savings');
const yieldSavingsInput = document.getElementById('yield_Savings');
const amtVanguardInput = document.getElementById('amt_Vanguard');
const yieldVanguardInput = document.getElementById('yield_Vanguard');
const moneyMapChartElement = document.getElementById('moneyMapChart');
let amtSavings;
let yieldSavings;
let amtVanguard;
let yieldVanguard;


function updateMoneyMapChart() { // Logic to calculate and update the chart
  amtSavings = amtSavingsInput.value;
  yieldSavings = yieldSavingsInput.value;
  amtVanguard = amtVanguardInput.value;
  yieldVanguard = yieldVanguardInput.value;
  amtSavings *=12;
  amtVanguard *=12;
  const years = 5;
  let capital_amounts = calculateCapitalGrowth(amtSavings, yieldSavings, amtVanguard, yieldVanguard, years);
  moneyMapChart.data.datasets[0].data = capital_amounts;
  moneyMapChart.update();
}

amtSavingsInput.addEventListener('input', updateMoneyMapChart); // Update chart after value changes
yieldSavingsInput.addEventListener('input', updateMoneyMapChart);
amtVanguardInput.addEventListener('input', updateMoneyMapChart);
yieldVanguardInput.addEventListener('input', updateMoneyMapChart);

const moneyMapChart = new Chart(moneyMapChartElement, { // Moneymap chart
  type: 'bar',
  data: {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderWidth: 1
      }
    ]
  },
  options: {
    responsive: false,
    scales: {
      y: {
        type: 'linear', // Set the scale type to 'linear'
        beginAtZero: true
      }
    }
  }
});

function calculateNetSalary(annualGrossSalary) {
  // Calculate income tax
  const personalAllowance = 12570;
  const basicRateThreshold = 50270;
  const basicRate = 0.2;
  const higherRate = 0.4;

  let taxableIncome = annualGrossSalary - personalAllowance;
  let incomeTax = 0;

  if (taxableIncome > 0) {
    if (taxableIncome <= basicRateThreshold) {
      incomeTax = taxableIncome * basicRate;
    } else {
      const basicTax = basicRateThreshold * basicRate;
      const additionalTax = (taxableIncome - basicRateThreshold) * higherRate;
      incomeTax = basicTax + additionalTax;
    }
  }

  // Deduct employees' Class 1 National Insurance contributions (NICs)
  const nicsLowerThreshold = 6396;
  const nicsRate = 0.12;
  let nics = 0;

  if (annualGrossSalary > nicsLowerThreshold) {
    nics = (annualGrossSalary - nicsLowerThreshold) * nicsRate;
  }

  // Convert income tax and NICs to monthly figures
  const monthlyIncomeTax = incomeTax / 12;
  const monthlyNICs = nics / 12;

  // Calculate net annual salary
  const netAnnualSalary = annualGrossSalary - incomeTax - nics;

  // Convert to net monthly salary
  const netMonthlySalary = netAnnualSalary / 12;

  // Output income tax and NICs figures as monthly amounts
  //console.log("Income Tax (Monthly): £", monthlyIncomeTax.toFixed(2));
  //console.log("NICs (Monthly): £", monthlyNICs.toFixed(2));

  return netMonthlySalary;
}

function calculateCapitalGrowth(atmSavings, yieldSavings, amtVanguard, yieldVanguard, years) {
  const savingsAmounts = [];
  const vanguardAmounts = [];
  const capitals = [];

  let capital = atmSavings + amtVanguard;

  for (let year = 1; year <= years; year++) {
    const savingsAfterYear = atmSavings * (1 + yieldSavings / 100);
    const vanguardAfterYear = amtVanguard * (1 + yieldVanguard / 100);
    savingsAmounts.push(savingsAfterYear.toFixed(2));
    vanguardAmounts.push(vanguardAfterYear.toFixed(2));
    capital = savingsAfterYear + vanguardAfterYear;
    capitals.push(capital.toFixed(2));
    atmSavings = savingsAfterYear;
    amtVanguard = vanguardAfterYear;
  }

  return capitals;
}