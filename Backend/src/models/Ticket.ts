import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';
import sequelize from '../utils/connectDB.js';
import Showing from './Showing.js';

class Ticket extends Model<InferAttributes<Ticket>, InferCreationAttributes<Ticket>> {
  declare id: CreationOptional<number>;
  declare seat: string;
  declare showingId: ForeignKey<Showing['id']>;
}

Ticket.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  seat: {
    type: DataTypes.STRING,
    allowNull: false
  },
  showingId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false
});

export default Ticket;
