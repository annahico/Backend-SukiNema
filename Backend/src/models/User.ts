import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, InferAttributes,
  InferCreationAttributes, CreationOptional
} from 'sequelize'
import sequelize from '../utils/connectDB.js'
import Order from './Order.js'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare email: string
  declare firstname: string
  declare lastname: string
  declare password: string

  // Association methods
  declare getOrders: HasManyGetAssociationsMixin<Order>
  declare addOrder: HasManyAddAssociationMixin<Order, number>
  declare addOrders: HasManyAddAssociationsMixin<Order, number>
  declare setOrders: HasManySetAssociationsMixin<Order, number>
  declare removeOrder: HasManyRemoveAssociationMixin<Order, number>
  declare removeOrders: HasManyRemoveAssociationsMixin<Order, number>
  declare hasOrder: HasManyHasAssociationMixin<Order, number>
  declare hasOrders: HasManyHasAssociationsMixin<Order, number>
  declare countOrders: HasManyCountAssociationsMixin
  declare createOrder: HasManyCreateAssociationMixin<Order, 'userId'>
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false
})

User.hasMany(Order, { foreignKey: 'userId' })
Order.belongsTo(User, { foreignKey: 'userId' })

export default User