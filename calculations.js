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