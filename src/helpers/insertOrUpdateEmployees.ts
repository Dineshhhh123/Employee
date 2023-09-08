import Employee from '../models/employeeSchema';
import { salaryCal } from './salaryCal';



export async function insertOrUpdateEmployees(employeesData: any) {
    try {
      for (const data of employeesData) {
        const existingEmployee = await Employee.findOne({
          where: { uniqueId: data.uniqueId },
        });
        const sal =await  salaryCal(data.ctc)
        
        const mergedObject = { ...data, ...sal };
        
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