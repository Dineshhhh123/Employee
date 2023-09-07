import Employee from '../models/employeeSchema';



export async function insertOrUpdateEmployees(employeesData: any) {
    try {
      for (const data of employeesData) {
        const existingEmployee = await Employee.findOne({
          where: { uniqueId: data.uniqueId },
        });
  
        if (existingEmployee) {
  
          await existingEmployee.update(data);
        } else {
          await Employee.create(data);
        }
      }
    } catch (error) {
      throw error;
    }
  }