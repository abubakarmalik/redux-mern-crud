const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/EmployeeController');

router.get('/', EmployeeController.home);
router.post('/add', EmployeeController.addEmployee);
router.put('/edit/:id', EmployeeController.editEmployee);
router.delete('/delete/:id', EmployeeController.deleteEmployee);

module.exports = router;
