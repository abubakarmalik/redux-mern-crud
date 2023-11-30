const Employee = require('../models/Employee');

module.exports.home = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (!employees || employees.length === 0) {
      return res.status(404).json({
        message: 'No Employees found',
      });
    }
    return res.status(200).json({
      message: 'Employees retrieved successfully',
      data: employees,
    });
  } catch (error) {
    console.log('Error retrieving employees:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
module.exports.addEmployee = async (req, res) => {
  try {
    const { name, age, salary } = req.body;
    const employee = new Employee({
      name,
      age,
      salary,
    });
    const saveEmployee = await employee.save();
    res.status(200).json({
      message: 'Employee added successfully',
      data: saveEmployee,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
      data: error.message,
    });
  }
};
module.exports.editEmployee = async (req, res) => {
  try {
    const { name, age, salary } = req.body;
    const employeeID = req.params.id;
    const existingEmployee = await Employee.findById(employeeID);
    if (!existingEmployee) {
      return res.status(404).json({
        message: 'Employee not found',
      });
    }
    existingEmployee.name = name;
    existingEmployee.age = age;
    existingEmployee.salary = salary;

    const updatedEmployee = await existingEmployee.save();

    res.status(200).json({
      message: 'Employee updated successfully',
      data: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    let status = 500;
    let errorMessage = 'Internal server error';
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      status = 400;
      errorMessage = 'Invalid employee ID';
    }
    res.status(status).json({
      message: errorMessage,
      data: error.message,
    });
  }
};
module.exports.deleteEmployee = async (req, res) => {
  try {
    const employeeID = req.params.id;

    const existingEmployee = await Employee.findById(employeeID);
    if (!existingEmployee) {
      return res.status(404).json({
        message: 'Employee not found',
      });
    }
    // await existingEmployee.remove();
    await Employee.deleteOne({ _id: employeeID });

    return res.status(200).json({
      message: 'Employee deleted successfully',
      data: existingEmployee,
    });
  } catch (error) {
    let status = 500;
    let errorMessage = 'Internal server error';

    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      status = 400;
      errorMessage = 'Invalid employee ID';
    }
    res.status(status).json({
      message: errorMessage,
      data: error.message,
    });
  }
};
