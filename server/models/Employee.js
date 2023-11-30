const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
