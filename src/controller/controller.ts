import { Request, Response } from 'express';
import multer from 'multer';
import { processExcelFile } from '../helpers/processExcelFile';
import { insertOrUpdateEmployees } from '../helpers/insertOrUpdateEmployees';
import Employee from '../models/employeeSchema';
import { salaryCal } from '../helpers/salaryCal';
import ExcelJS from 'exceljs';


// Initialize multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage }).array('files', 5);



class EmployeeController {

  uploadExcelFiles = async (req: Request, res: Response) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'File upload failed.' });
      }
  
      const files = req.files as Express.Multer.File[];
  
      try {
        for (const file of files) {  
          const employeesData = await processExcelFile(file.buffer);
  
          if (!employeesData) {
            throw new Error('Error processing Excel file.');
          }
  
          await insertOrUpdateEmployees(employeesData);
        }
  
        res.status(200).json({ message: 'File(s) uploaded and processed successfully.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing files.' });
      }
    });
  };
  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { name, age, gender, uniqueId, role, ctc} = req.body;
      const salcal =await  salaryCal(ctc)
      const newEmployee = await Employee.create({
        name, 
        age, 
        gender, 
        uniqueId, 
        role, 
        ctc, 
        basicSalary:salcal.basicSalary, 
        actualHRA:salcal.actualHRA, 
        specialAllowance:salcal.specialAllowance, 
        incomeTax:salcal.incomeTax});
      res.status(201).json(newEmployee);
    } catch (error) {
      console.error('Error creating employee:', error);
      res.status(500).json({ message: 'Error creating employee.' });
    }
  }

  async getEmployees(req: Request, res: Response): Promise<void> {
    const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string, 10) : 10;
    const sortBy = req.query.sortBy as string | undefined;
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';

    try {
      const employees = await Employee.findAndCountAll({
        offset: (page - 1) * pageSize,
        limit: pageSize,
        order: sortBy ? [[sortBy, sortOrder]] : undefined,
      });
      res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching employees.' });
    }
  }
   download = async (req: Request, res: Response): Promise<void> => {
    try {
      const objs = await Employee.findAll({});
      const tutorials = objs.map((obj) => ({
        name: obj.name,
        age: obj.age,
        gender: obj.gender,
        uniqueId: obj.uniqueId,
        role: obj.role,
        ctc: obj.ctc,

      }));
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Product');
  
      worksheet.columns = [
        // Define your columns here
        { header: 'name', key: 'name', width: 25 },
        { header: 'age', key: 'age', width: 25 },
        { header: 'gender', key: 'gender', width: 25 },
        { header: 'uniqueId', key: 'uniqueId', width: 25 },
        { header: 'role', key: 'role', width: 25 },
        { header: 'ctc', key: 'ctc', width: 25 },
      ];
  
      worksheet.addRows(tutorials);
  
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=tutorials.xlsx'
      );
  
      await workbook.xlsx.write(res);
      res.status(200).end();
    } catch (error) {
      console.error('Error while generating Excel:', error);
      res.status(500).json({ message: 'Error generating Excel.' });
    }
  };
  
  
  
  

  async updateEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const updatedData: Partial<Employee> = req.body;
      const employee = await Employee.findByPk(employeeId);

      if (!employee) {
        res.status(404).json({ message: 'Employee not found.' });
        return;
      }

      await employee.update(updatedData);
      res.status(200).json(employee);
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Error updating employee.' });
    }
  }

  async deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employeeId = parseInt(req.params.id, 10);
      const employee = await Employee.findByPk(employeeId);

      if (!employee) {
        res.status(404).json({ message: 'Employee not found.' });
        return;
      }

      await employee.destroy();
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ message: 'Error deleting employee.' });
    }
  }

   
}

export default EmployeeController;



