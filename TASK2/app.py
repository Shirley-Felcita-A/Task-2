from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Request Sharing for frontend

# In-memory employee data for demonstration (usually you'd use a database)
employees = [
    {
        'id': 1,
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john.doe@example.com',
        'position': 'Software Engineer',
        'salary': 60000
    },
    {
        'id': 2,
        'first_name': 'Jane',
        'last_name': 'Doe',
        'email': 'jane.doe@example.com',
        'position': 'Project Manager',
        'salary': 80000
    }
]

# Hardcoded credentials for login (in a real-world application, you'd use a secure method like JWT or OAuth)
users = [
    {
        'username': 'admin',
        'password': 'admin123',
        'email': 'admin@example.com',
        'phone': '123-456-7890',
        'role': 'admin'
    }
]

# Route for employee management - Get all employees
@app.route('/employees', methods=['GET'])
def get_employees():
    return jsonify(employees)

# Route to add an employee
@app.route('/employees', methods=['POST'])
def add_employee():
    data = request.get_json()

    # Validate the incoming data
    if not data.get('first_name') or not data.get('last_name') or not data.get('email') or not data.get('position') or not data.get('salary'):
        return jsonify({'message': 'Missing required fields'}), 400

    new_employee = {
        'id': len(employees) + 1,
        'first_name': data['first_name'],
        'last_name': data['last_name'],
        'email': data['email'],
        'position': data['position'],
        'salary': data['salary']
    }

    employees.append(new_employee)
    return jsonify(new_employee), 201

# Route to delete an employee by ID
@app.route('/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    employee_to_delete = next((employee for employee in employees if employee['id'] == id), None)

    if employee_to_delete is None:
        return jsonify({'message': 'Employee not found'}), 404

    employees.remove(employee_to_delete)
    return jsonify({'message': 'Employee deleted successfully'}), 200

# Route to validate login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Validate incoming data
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')
    phone = data.get('phone')
    role = data.get('role')

    user = next((user for user in users if user['username'] == username), None)

    if user and user['password'] == password and user['email'] == email and user['phone'] == phone and user['role'] == role:
        return jsonify({'message': 'Login successful', 'status': 'success'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


if __name__ == '__main__':
    app.run(debug=True)
