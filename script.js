// First Chart
// Get the salary input element
const salaryInput = document.getElementById('Salary');

// Get the cashInChart canvas element
const cashInChart = document.getElementById('cashInChart');

// Initialize the chart with an initial data
const chart = new Chart(cashInChart, {
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

let netMonthlySalary;

// Function to update the chart data and display net monthly salary
function updateChart(salary) {
    netMonthlySalary = calculateNetSalary(salary);
  chart.data.datasets[0].data = [netMonthlySalary, null, null]; // Set netMonthlySalary value in Cash In column
  chart.update();

  // Display net monthly salary and salary amount in the span elements
  const salaryAmountDisplay = document.getElementById('salaryAmount');
  const netMonthlySalaryDisplay = document.getElementById('netMonthlySalaryDisplay');
  salaryAmountDisplay.textContent = salary.toFixed(2);
  netMonthlySalaryDisplay.textContent = netMonthlySalary.toFixed(2);
}

// Event listener for the salary input change
salaryInput.addEventListener('input', function () {
  const salary = parseFloat(salaryInput.value);
  if (!isNaN(salary)) {
    updateChart(salary);
  }
});

// Second Chart
// Get the input fields and chart canvas
const costShelterBillsInput = document.getElementById('cost_sh_bills');
const costTravelInput = document.getElementById('cost_travel');
const costGroceriesInput = document.getElementById('cost_groceries');
const costOtherInput = document.getElementById('cost_other');
const cashFlowChartCanvas = document.getElementById('cashFlowChart');

// Set the initial data for the chart
const initialChartData = {
  labels: ['Cash In', 'Cash Out', 'Cash Left'],
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderWidth: 1
    },
  ]
};

// Create the chart
const cashFlowChart = new Chart(cashFlowChartCanvas, {
    type: 'bar',
    data: initialChartData,
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

let cashleft;

// Function to update the chart with the total costs and net monthly salary
function updateCashFlowChart() {
    const totalCosts =
      Number(costShelterBillsInput.value) +
      Number(costTravelInput.value) +
      Number(costGroceriesInput.value) +
      Number(costOtherInput.value);
    
    cashleft = netMonthlySalary - totalCosts
      // Update the chart data
    cashFlowChart.data.datasets[0].data = [netMonthlySalary, totalCosts, cashleft];
    cashFlowChart.update();
  
    // Update the total costs display
    document.getElementById('totalCosts').textContent = totalCosts.toFixed(2);
    // Update the cash left display
    document.getElementById('cashLeftDisplay1').textContent = cashleft.toFixed(2);
    document.getElementById('cashLeftDisplay2').textContent = cashleft.toFixed(2);
  }

// Add event listeners to the input fields
costShelterBillsInput.addEventListener('input', updateCashFlowChart);
costTravelInput.addEventListener('input', updateCashFlowChart);
costGroceriesInput.addEventListener('input', updateCashFlowChart);
costOtherInput.addEventListener('input', updateCashFlowChart);

// Initial chart updates
const initialSalary = parseFloat(salaryInput.value);
if (!isNaN(initialSalary)) {
  updateChart(initialSalary);
}
updateCashFlowChart();

// Third Chart
// Get the input fields and chart canvas
let amtSavingsInput = document.getElementById('amt_Savings');
let yieldSavingsInput = document.getElementById('yield_Savings');
let amtVanguardInput = document.getElementById('amt_Vanguard');
let yieldVanguardInput = document.getElementById('yield_Vanguard');

// Get the cashInChart canvas element
const moneyMapChartElement = document.getElementById('moneyMapChart');

// Set the initial data for the chart
const chart3 = {
  labels: ['1', '2', '3', '4', '5'],
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderWidth: 1
    }
  ]
};

// Create the chart
const moneyMapChart = new Chart(moneyMapChartElement, {
  type: 'bar',
  data: chart3,
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

// Function to calculate and update the chart
function updateChart() {
  let amtSavings = parseFloat(amtSavingsInput.value);
  let yieldSavings = parseFloat(yieldSavingsInput.value);
  let amtVanguard = parseFloat(amtVanguardInput.value);
  let yieldVanguard = parseFloat(yieldVanguardInput.value);

  // Convert monthly savings to yearly savings
  amtSavings *= 12;
  amtVanguard *= 12;

  const years = 5; // Set the desired number of years

  const capitals = calculateCapitalGrowth(amtSavings, yieldSavings, amtVanguard, yieldVanguard, years);

  // Update the chart data
  moneyMapChart.data.datasets[0].data = capitals;
  moneyMapChart.update();
}

// Add event listeners to input fields
amtSavingsInput.addEventListener('input', updateChart);
yieldSavingsInput.addEventListener('input', updateChart);
amtVanguardInput.addEventListener('input', updateChart);
yieldVanguardInput.addEventListener('input', updateChart);