import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, InferAttributes,
  InferCreationAttributes, CreationOptional, ForeignKey
} from 'sequelize'
import sequelize from '../utils/connectDB.js'
import TicketHistory from './TicketHistory.js'
import User from './User.js'

class Order extends Model<InferAttributes<Order>, InferCreationAttributes<Order>> {
  declare id: CreationOptional<number>
  declare date: string
  declare userId: ForeignKey<User['id']>

  // Association methods
  declare getTicketHistories: HasManyGetAssociationsMixin<TicketHistory>
  declare addTicketHistory: HasManyAddAssociationMixin<TicketHistory, number>
  declare addTicketHistories: HasManyAddAssociationsMixin<TicketHistory, number>
  declare setTicketHistories: HasManySetAssociationsMixin<TicketHistory, number>
  declare removeTicketHistory: HasManyRemoveAssociationMixin<TicketHistory, number>
  declare removeTicketHistories: HasManyRemoveAssociationsMixin<TicketHistory, number>
  declare hasTicketHistory: HasManyHasAssociationMixin<TicketHistory, number>
  declare hasTicketHistories: HasManyHasAssociationsMixin<TicketHistory, number>
  declare countTicketHistories: HasManyCountAssociationsMixin
  declare createTicketHistory: HasManyCreateAssociationMixin<TicketHistory, 'orderId'>
}

Order.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false
})

Order.hasMany(TicketHistory, { foreignKey: 'orderId' })
TicketHistory.belongsTo(Order, { foreignKey: 'orderId' })

export default Order