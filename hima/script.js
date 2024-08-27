// JavaScript objects to store budgets, expenditures, and savings
let budgets = {};
let expenditures = { rent: {}, food: {}, electricity: {}, other: {} };
let savings = {};
let users = {}; // Object to store registered usernames and passwords
let loggedInUser = null;

// Show login page
function showLogin() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'flex';
}

// Show registration page
function showRegister() {
    document.getElementById('welcome').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'flex';
}

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (users[username] && users[username] === password) {
        loggedInUser = username;
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'flex';
        updateSummary();
    } else {
        alert('Invalid username or password.');
    }
});

// Handle registration form submission
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    
    if (users[username]) {
        alert('Username already exists.');
        return;
    }
    
    users[username] = password;
    alert('Registration successful. You can now log in.');
    showLogin();
});

// Handle budget form submission
document.getElementById('budgetForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const month = document.getElementById('month').value;
    const amount = parseFloat(document.getElementById('budgetAmount').value);
    
    if (amount <= 0) {
        alert('Budget amount must be greater than zero.');
        return;
    }
    
    budgets[month] = amount;
    document.getElementById('budgetForm').reset();
    updateSummary();
});

// Handle expenditure form submission
document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const month = document.getElementById('expenseMonth').value;
    const category = document.getElementById('expenseCategory').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    
    if (amount <= 0) {
        alert('Expenditure amount must be greater than zero.');
        return;
    }
    
    if (!expenditures[category][month]) {
        expenditures[category][month] = 0;
    }
    
    expenditures[category][month] += amount;
    document.getElementById('expenseForm').reset();
    updateSummary();
});

// Handle savings form submission
document.getElementById('savingsForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const month = document.getElementById('savingsMonth').value;
    const amount = parseFloat(document.getElementById('savingsAmount').value);
    
    if (amount <= 0) {
        alert('Savings amount must be greater than zero.');
        return;
    }
    
    savings[month] = (savings[month] || 0) + amount;
    document.getElementById('savingsForm').reset();
    updateSummary();
});

// Update summary to show budgets, expenditures, and savings
function updateSummary() {
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = '';

    const allMonths = new Set([...Object.keys(budgets), ...Object.keys(expenditures.rent), ...Object.keys(expenditures.food), ...Object.keys(expenditures.electricity), ...Object.keys(expenditures.other), ...Object.keys(savings)]);

    allMonths.forEach(month => {
        const budgetAmount = budgets[month] || 0;
        const rentAmount = expenditures.rent[month] || 0;
        const foodAmount = expenditures.food[month] || 0;
        const electricityAmount = expenditures.electricity[month] || 0;
        const otherAmount = expenditures.other[month] || 0;
        const totalExpenditure = rentAmount + foodAmount + electricityAmount + otherAmount;
        const savingsAmount = savings[month] || 0;
        const balance = budgetAmount - totalExpenditure;
        
        summaryDiv.innerHTML += `
            <div>
                <strong>${month}</strong><br>
                Budget: $${budgetAmount.toFixed(2)}<br>
                Rent Expenditures: $${rentAmount.toFixed(2)}<br>
                Food Expenditures: $${foodAmount.toFixed(2)}<br>
                Electricity Expenditures: $${electricityAmount.toFixed(2)}<br>
                Other Expenditures: $${otherAmount.toFixed(2)}<br>
                Total Expenditures: $${totalExpenditure.toFixed(2)}<br>
                Savings: $${savingsAmount.toFixed(2)}<br>
                Balance: $${balance.toFixed(2)}<br>
            </div>
            <hr>
        `;
    });
}
