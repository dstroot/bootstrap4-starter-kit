// 'use strict';
//
// /**
//  * Route Dependencies
//  */
//
// var router    = require('express').Router();
//
// /**
//  * Main Route
//  */
//
// router.get('/', function (req, res, next) {
//   res.render('status/status', {
//     url: req.url
//   });
// });
//
// module.exports = router;
//


'use strict';

/**
 * Route Dependencies
 */

var router    = require('express').Router();

/**
 * Main Route
 */

// Define Chart Colors
var chart1 = '#4f4f4f';
var chart1Lighter = '#717171';
var chart2 = '#00afff';
var chart2Lighter = '#45c5ff';
var chart3 = '#007ab2';
var chart3Lighter = '#00a9f7';
var chart4 = '#ef8200';
var chart4Lighter = '#ffa335';
var chart5 = '#e8480c';
var chart5Lighter = '#f57444';
var chart6 = '#00325b';
var chart6Lighter = '#0058a0';
var chart7 = '#4a09b2';
var chart7Lighter = '#650df3';
var chart8 = '#7f4500';
var chart8Lighter = '#c46a00';
var chart9 = '#14cc3a';
var chart9Lighter = '#39ec5e';
var chart10 = '#b26b00';
var chart10Lighter = '#f79400';

/**
 * Return Data
 */

// Simulate Return Data
var returns = [
  {
    'returnDescription': 'Federal Income Tax',
    'amountExpected': 6345.00,
    'amountReceived': 6345.00
  },
  {
    'returnDescription': 'California State Income Tax',
    'amountExpected': 1203.00,
    'amountReceived': 1203.00
  }
];

// Get Return Totals
var totalAmountExpected = 0;
var totalAmountReceived = 0;

for (var i = 0, len = returns.length; i < len; i++) {
  totalAmountExpected = totalAmountExpected + returns[i].amountExpected;
  totalAmountReceived = totalAmountReceived + returns[i].amountReceived;
}

/**
 * Fee Data
 */

// Simulate Fee Data
var fees = [
  {
    'value': 175.00,
    'color': chart2,
    'highlight': chart2Lighter,
    'label': 'Amount paid to tax preparer'
  },
  {
    'label': 'Transmitter fee',
    'color': chart3,
    'highlight': chart3Lighter,
    'value': 13.95
  },
  {
    'label': 'Disbursement fee',
    'color': chart4,
    'highlight': chart4Lighter,
    'value': 7.00
  },
  {
    'label': 'Bank Deposit Product fee - Federal',
    'color': chart5,
    'highlight': chart5Lighter,
    'value': 34.95
  },
  {
    'label': 'Bank Deposit Product fee - State',
    'color': chart6,
    'highlight': chart6Lighter,
    'value': 10.00
  }
];

// Get Fee Totals
var totalFees = 0;
var refund = 0;

for (var i = 0, len = fees.length; i < len; i++) {
  totalFees = totalFees + fees[i].value;
}

if (totalAmountReceived > 0) {
  refund = totalAmountReceived - totalFees;
} else {
  refund = totalAmountExpected - totalFees;
}

// array.unshift method adds new items to the beginning of an array
fees.unshift({
  'value': refund,
  'color': chart9,
  'highlight': chart9Lighter,
  'label': 'Refund Payment Due'
});

/**
 * Disbursement Data
 */

// Simulate Disbursement Data
var disbursments = [
  {
    'date': new Date(),
    'method': 'Walmart Direct2Cash',
    'amount': 7307.10
  }
];

// Get Disbursement Totals
var totalAmountDisbursed = 0;

for (var i = 0, len = disbursments.length; i < len; i++) {
  totalAmountDisbursed = totalAmountDisbursed + disbursments[i].amount;
}

router.get('/', function (req, res, next) {
  // if (req.session.account) {
  res.render('status/status', {
    url: req.url,

    returns: returns,
    totalAmountExpected: totalAmountExpected,
    totalAmountReceived: totalAmountReceived,

    fees: fees,
    totalFees: totalFees,
    refund: refund,
    chartFees: JSON.stringify(fees),

    disbursements: disbursments,
    totalAmountDisbursed: totalAmountDisbursed
  });
  // } else {
  //   req.flash('warning', 'Please Enter Your Information');
  //   return res.redirect('/');
  // }
});

module.exports = router;
