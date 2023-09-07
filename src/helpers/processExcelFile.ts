import ExcelJS from 'exceljs';


export async function processExcelFile(buffer: Buffer) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
  
    const employeesData: { name: ExcelJS.CellValue; age: ExcelJS.CellValue; gender: ExcelJS.CellValue; uniqueId: ExcelJS.CellValue; role: ExcelJS.CellValue; basicSalary: ExcelJS.CellValue; actualHRA: ExcelJS.CellValue; specialAllowance: ExcelJS.CellValue; incomeTax: ExcelJS.CellValue; }[] = [];
  
    const worksheet = workbook.getWorksheet(1); // Assuming the data is in the first worksheet
  
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        // Skip the header row
        const employee = {
          name: row.getCell(1).value,
          age: row.getCell(2).value,
          gender: row.getCell(3).value,
          uniqueId: row.getCell(4).value,
          role: row.getCell(5).value,
          ctc: row.getCell(6).value,
          basicSalary: row.getCell(7).value,
          actualHRA: row.getCell(8).value,
          specialAllowance: row.getCell(9).value,
          incomeTax: row.getCell(10).value,
        };
        employeesData.push(employee);
      }
    });
  
    return employeesData;
  }