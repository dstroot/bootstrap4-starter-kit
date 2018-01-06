/**
 * Route Dependencies
 */

const router = require('express').Router();

/**
 * Main Route
 */

// Simulate Return Data
const returns = [
  {
    returnDescription: 'Federal Income Tax',
    amountExpected: 6345.0,
    amountReceived: 6345.0
  },
  {
    returnDescription: 'California State Income Tax',
    amountExpected: 1203.0,
    amountReceived: 1203.0
  }
];

// Get Return Totals
let totalAmountExpected = 0;
let totalAmountReceived = 0;

for (let i = 0, len = returns.length; i < len; i++) {
  totalAmountExpected += returns[i].amountExpected;
  totalAmountReceived += returns[i].amountReceived;
}

// Simulate Fee Data
const fees = [
  {
    value: 175.0,
    label: 'Amount paid to tax preparer'
  },
  {
    value: 13.95,
    label: 'Transmitter fee'
  },
  {
    value: 7.0,
    label: 'Disbursement fee'
  },
  {
    value: 34.95,
    label: 'Bank Deposit Product fee - Federal'
  },
  {
    value: 10.0,
    label: 'Bank Deposit Product fee - State'
  }
];

// Get Fee Totals
let totalFees = 0;
let refund = 0;

for (let i = 0, len = fees.length; i < len; i++) {
  totalFees += fees[i].value;
}

if (totalAmountReceived > 0) {
  refund = totalAmountReceived - totalFees;
} else {
  refund = totalAmountExpected - totalFees;
}

// array.unshift method adds new items to the beginning of an array
fees.unshift({
  value: refund,
  label: 'Refund Payment Due'
});

/**
 * Disbursement Data
 */

// Simulate Disbursement Data
const disbursements = [
  {
    date: new Date(),
    method: 'Walmart Direct2Cash',
    amount: 7307.1
  }
];

// Get Disbursement Totals
let totalAmountDisbursed = 0;

for (let i = 0, len = disbursements.length; i < len; i++) {
  totalAmountDisbursed += disbursements[i].amount;
}

router.get('/', (req, res) => {
  // if (req.session.account) {
  res.render('status/status', {
    url: req.url,

    returns,
    totalAmountExpected,
    totalAmountReceived,

    fees,
    totalFees,
    refund,
    // chartFees: JSON.stringify(fees),

    chartFees: [175, 45, 35, 5, 2],

    disbursements,
    totalAmountDisbursed
  });
  // } else {
  //   req.flash('warning', 'Please Enter Your Information');
  //   return res.redirect('/');
  // }
});

module.exports = router;
