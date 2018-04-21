// Basic ES5 

// Employee Constructor
function Employee(name, role, startDate, monthlyRate) {
  this.name = name;
  this.role = role;
  this.startDate = startDate;
  this.monthlyRate = monthlyRate;
  this.monthsWorked = 5;
  this.totalBilled = 100;

}


// UI Constructor
function UI() {}

// Add Book to List
UI.prototype.addEmployeeToList = function(employee){
  const list = document.getElementById('employee-list');
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD495kycse4B5wt4jqC2YE0xS6na-MykJ0",
    authDomain: "employee-data-24e72.firebaseapp.com",
    databaseURL: "https://employee-data-24e72.firebaseio.com",
    projectId: "employee-data-24e72",
    storageBucket: "employee-data-24e72.appspot.com",
    messagingSenderId: "790622170585"
  };
firebase.initializeApp(config);
  // Create tr element
  const row = document.createElement('tr');
  // Insert columns
  row.innerHTML = `
    <td>${employee.name}</td>
    <td>${employee.role}</td>
    <td>${employee.startDate}</td>
    <td>${employee.monthlyRate}</td>
    <td>${employee.totalBilled}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add Classes
  div.className = `alert ${className}`;
  // Add text
  div.appendChild(document.createTextNode(message));
  // Get parent
  const container = document.querySelector('.container');
  const form = document.querySelector('#employee-form');
  // Insert alert
  container.insertBefore(div, form);
  // Timeout after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Employee
UI.prototype.deletEmployee = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }

}

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById('employee-name').value = '';
  document.getElementById('role').value = '';
  document.getElementById('start-date').value = '';
  document.getElementById('monthly-rate').value = '';
  
}

// Event listeners for Add Employee
document.getElementById('employee-form').addEventListener('submit', function(e){
  

// Get form values
const name = document.getElementById('employee-name').value,
      role = document.getElementById('role').value,
      startDate = document.getElementById('start-date').value;
      monthlyRate = document.getElementById('monthly-rate').value;
      

// Instantiate book object
const employee = new Employee(name, role, startDate, monthlyRate);

// Instantiate UI
const ui = new UI();

// Validate
if(name === '' || role === '' || startDate === '' || monthlyRate === '') {
  // Error alert
  ui.showAlert('Please fill in all fields', 'error');
} else {
  // Add Book to list
ui.addEmployeeToList(employee);

// Show Success
ui.showAlert('Employee Added!', 'success');

// Clear Fields
ui.clearFields();
}

  e.preventDefault();
});

// Event Delegation - Event Listener for Delete
// Because this is dynamic attach to parent book-list
document.getElementById('employee-list').addEventListener('click', function(e){

  // Instantiate UI
  const ui = new UI();

  ui.deletEmployee(e.target);

  // Show alert
  ui.showAlert('Employee Removed', 'success');

  
  e.preventDefault();

})
