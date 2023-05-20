import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import sequelize from "../../db";

export class TodoModel extends Model<
  InferAttributes<TodoModel>,
  InferCreationAttributes<TodoModel>
> {
  declare id: CreationOptional<number>;
  declare creationDate: string;
  declare lastUpdatedAt: string;
  declare title: string;
  declare description: string;
  declare uniqueID: string;
}

TodoModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    uniqueID: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    creationDate: DataTypes.STRING,
    lastUpdatedAt: DataTypes.STRING,
  },
  { sequelize }
);
