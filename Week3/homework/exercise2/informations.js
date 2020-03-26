const accounts = [
  {
    account_number: 101,
    balance: 1400
  },
  {
    account_number: 102,
    balance: 2600
  },
  {
    account_number: 103,
    balance: 400
  },
  {
    account_number: 104,
    balance: 3800
  }
];

const changes = [
  {
    change_number: 11,
    account_number: 101,
    amount: 400,
    changed_date: "2020-02-15",
    remark: "y"
  },
  {
    change_number: 12,
    account_number: 102,
    amount: 600,
    changed_date: "2020-02-16",
    remark: "n"
  },
  {
    change_number: 13,
    account_number: 103,
    amount: 100,
    changed_date: "2020-02-17",
    remark: "y"
  },
  {
    change_number: 14,
    account_number: 104,
    amount: 200,
    changed_date: "2020-02-26",
    remark: "n"
  }
];

module.exports = { accounts, changes };
