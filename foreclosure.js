'use strict';
var steve;
var stevesLoan;
var month = 0;
var monthsUntilEvicted;

function loan() {
  var account = {
    borrowed: 550000,
    balance: 286000,
    monthlyPayment: 1700,
    defaulted: 0,
    defaultsToForeclose: 5,
    foreclosed: false
  };

  function missPayment() {
    account.defaulted = account.defaulted + 1;
    if (account.defaulted >= account.defaultsToForeclose) {
      account.foreclosed = true;
    }
  }

  return {
    getBalance: function() {
      return account.balance;
    },
    receivePayment: function(amount) {
      if (amount < account.monthlyPayment) {
        missPayment();
      }
      account.balance = account.balance - amount;
    },
    getMonthlyPayment: function() {
      return account.monthlyPayment;
    },
    isForeclosed: function() {
      return account.foreclosed;
    }
  };
}

function borrower(loan) {
  var account = {
    monthlyIncome: 1350,
    funds: 2800,
    loan: loan.getMonthlyPayment()
  };
  return {
    getFunds: function() {
      return account.funds;
    },
    makePayment: function() {

      if(account.funds > account.loan) {
        account.funds = account.funds - account.loan;
        loan.receivePayment(account.loan);
      }
      else {
        loan.receivePayment(account.funds);
        account.funds = 0;
      }
    },
    payDay: function() {
      account.funds = account.funds + account.monthlyIncome;
    }
  };
}

//forward in time
stevesLoan = loan();
steve = borrower(stevesLoan);
while(stevesLoan.isForeclosed() === false) {
  steve.payDay();
  steve.makePayment();
  month++;
}

monthsUntilEvicted = month;