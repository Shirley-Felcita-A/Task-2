// Show or hide the employee form
function toggleEmployeeForm() {
    const form = document.getElementById("employee-form");
    form.style.display = form.style.display === "none" ? "block" : "none";
}

// Add employee (via API call)
document.getElementById("add-employee-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const firstName = document.getElementById("first_name").value;
    const lastName = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const position = document.getElementById("position").value;
    const salary = document.getElementById("salary").value;

    const newEmployee = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        position: position,
        salary: salary
    };

    fetch('http://127.0.0.1:5000/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
    }).then(response => response.json())
      .then(data => {
          employees.push(data);
          displayEmployees();
          toggleEmployeeForm();
      });
});

// Display employees in table
function displayEmployees() {
    const tableBody = document.getElementById("employee-table").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    employees.forEach(employee => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${employee.first_name} ${employee.last_name}</td>
            <td>${employee.email}</td>
            <td>${employee.position}</td>
            <td>${employee.salary}</td>
            <td>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>
        `;
    });
}

// Delete employee (via API call)
function deleteEmployee(id) {
    fetch(`http://127.0.0.1:5000/employees/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
      .then(data => {
          employees = employees.filter(employee => employee.id !== id);
          displayEmployees();
      });
}

// Login validation
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;

    // Simple login check
    if (username === "admin" && password === "admin123" && email === "admin@example.com" && phone === "123-456-7890" && role === "admin") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("employee-container").style.display = "block";
        fetchEmployees();
    } else {
        alert("Invalid credentials. Please try again.");
    }
});

// Fetch employees from backend
function fetchEmployees() {
    fetch('http://127.0.0.1:5000/employees')
        .then(response => response.json())
        .then(data => {
            employees = data;
            displayEmployees();
        });
}
