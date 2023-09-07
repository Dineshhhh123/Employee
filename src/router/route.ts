// uploadRouter.ts
import express from 'express';
import EmployeeController from '../controller/controller';
const employeeController = new EmployeeController()

const router = express.Router();

// POST /upload
router.post('/upload', employeeController.uploadExcelFiles);

// Create an employee
router.post('/employees', employeeController.createEmployee);

// Get all employees
router.get('/employees', employeeController.getEmployees);

// Update an employee by ID
router.put('/employees/:id', employeeController.updateEmployee);

// Delete an employee by ID
router.delete('/employees/:id', employeeController.deleteEmployee);

router.get('/employees/download', employeeController.download);


export default router;
