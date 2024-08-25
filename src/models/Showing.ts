import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, ForeignKey,
  Association, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyRemoveAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin
} from 'sequelize'
import sequelize from '../utils/connectDB.js'
import Movie from './Movie.js'
import Ticket from './Ticket.js'

class Showing extends Model<InferAttributes<Showing>, InferCreationAttributes<Showing>> {
  declare id: CreationOptional<number>
  declare date: string
  declare time: string
  declare room: string
  declare apiID: number
  declare movieId: ForeignKey<Movie['id']>

  // Association methods
  declare getTickets: HasManyGetAssociationsMixin<Ticket>
  declare addTicket: HasManyAddAssociationMixin<Ticket, number>
  declare addTickets: HasManyAddAssociationsMixin<Ticket, number>
  declare setTickets: HasManySetAssociationsMixin<Ticket, number>
  declare removeTicket: HasManyRemoveAssociationMixin<Ticket, number>
  declare removeTickets: HasManyRemoveAssociationsMixin<Ticket, number>
  declare hasTicket: HasManyHasAssociationMixin<Ticket, number>
  declare hasTickets: HasManyHasAssociationsMixin<Ticket, number>
  declare countTickets: HasManyCountAssociationsMixin
  declare createTicket: HasManyCreateAssociationMixin<Ticket, 'showingId'>
}

Showing.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  room: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apiID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  sequelize,
  timestamps: false
})

Showing.hasMany(Ticket, { foreignKey: 'showingId' })
Ticket.belongsTo(Showing, { foreignKey: 'showingId' })

export default Showing