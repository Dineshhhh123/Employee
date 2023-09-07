export async function salaryCal(ctc:number) {
    try {
      const basicSalary = ctc * (35/100);
      const actualHRA = ctc * (12/100);
      const specialAllowance = ctc * (43/100);
      const incomeTax = ctc - (basicSalary+actualHRA+specialAllowance)
      const salary = {
        basicSalary,
        actualHRA,
        specialAllowance,
        incomeTax
      }
      return salary
    

    } catch (error) {
      throw error;
    }
  }

  