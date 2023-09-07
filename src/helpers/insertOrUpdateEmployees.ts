import Employee from '../models/employeeSchema';
import { salaryCal } from './salaryCal';



export async function insertOrUpdateEmployees(employeesData: any) {
    try {
      for (const data of employeesData) {
        const existingEmployee = await Employee.findOne({
          where: { uniqueId: data.uniqueId },
        });
        const sal = salaryCal(data.ctc)
        const obj = {
          basicSalary:(await sal).basicSalary,
          actualHRA:(await sal).actualHRA,
          specialAllowance:(await sal).specialAllowance,
          incomeTax:(await sal).incomeTax
        }
        const mergedObject = { ...data, ...obj };
        
        if (existingEmployee) {
          await existingEmployee.update(mergedObject);
        } else { 
          await Employee.create(mergedObject);
        }
      }
    } catch (error) {
      throw error;
    }
  }