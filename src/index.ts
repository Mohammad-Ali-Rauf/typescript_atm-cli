import inquirer from 'inquirer';

interface ansType {
  userId: string;
  userPin: number;
  accountType: string;
  transactionType: string;
  transactionAmount: number;
}

const answers: ansType = await inquirer.prompt([
  {
    type: 'input',
    name: 'userId',
    message: 'Please Enter your ID: ',
  },
  {
    type: 'password',
    name: 'userPin',
    message: 'Please Enter your PIN: ',
  },
  {
    type: 'list',
    name: 'accountType',
    choices: ['Current', 'Savings', 'Business'],
    message: 'Select your Account Type: ',
  },
  {
    type: 'list',
    name: 'transactionType',
    choices: ['Fast Cash', 'Bill Payments', 'Withdrawal', 'Bank Transfer'],
    message: 'Select your Transaction Type: ',
    when(answers) {
      return answers.accountType;
    },
  },
  {
    type: 'list',
    name: 'transactionAmount',
    choices: [1000, 5000, 10000, 20000],
    message: 'Select your Transaction Amount: ',
    when(answers) {
      return answers.transactionType == 'Fast Cash';
    },
  },
  {
    type: 'number',
    name: 'transactionAmount',
    message: 'Enter your Transaction Amount: ',
    when(answers) {
      return (
        answers.transactionType == 'Withdrawal' ||
        'Bank Transfer' ||
        'Bill Payments'
      );
    },
  },
]);

const Balance = Math.floor(Math.random() * 50000);

if (answers.userId && answers.userPin) {
  if (answers.transactionAmount > Balance) {
    console.log("You have'nt enough balance.");
  }

  if (answers.transactionAmount <= Balance) {
    console.log('Success!');
    const remainingBalance = Balance - answers.transactionAmount;
    console.log('Your Current balance after transaction is ', remainingBalance);
  }
}
