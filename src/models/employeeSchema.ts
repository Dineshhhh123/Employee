import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Employee extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public gender!: string;
  public uniqueId!: string;
  public role!: string;
  public ctc!: string;
  public basicSalary!: number;
  public actualHRA!: number;
  public specialAllowance!: number;
  public incomeTax!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Employee.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uniqueId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure uniqueness of uniqueId
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ctc: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    basicSalary: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    actualHRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialAllowance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    incomeTax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'employees',

  }
);

export default Employee;
