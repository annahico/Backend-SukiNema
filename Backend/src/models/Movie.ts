import {
  Association, DataTypes, HasManyAddAssociationMixin, HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin,
  HasManySetAssociationsMixin, HasManyAddAssociationsMixin, HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, Model, InferAttributes,
  InferCreationAttributes, CreationOptional
} from 'sequelize'
import sequelize from '../utils/connectDB.js'
import Showing from './Showing.js'

class Movie extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>> {
  declare id: CreationOptional<number>
  declare favorite: boolean | null
  declare apiID: number
  declare title: string
  declare overview: string
  declare release: string
  declare trailer: string | null
  declare backdrop: string | null
  declare poster: string | null

  // Association methods
  declare getShowings: HasManyGetAssociationsMixin<Showing>
  declare addShowing: HasManyAddAssociationMixin<Showing, number>
  declare addShowings: HasManyAddAssociationsMixin<Showing, number>
  declare setShowings: HasManySetAssociationsMixin<Showing, number>
  declare removeShowing: HasManyRemoveAssociationMixin<Showing, number>
  declare removeShowings: HasManyRemoveAssociationsMixin<Showing, number>
  declare hasShowing: HasManyHasAssociationMixin<Showing, number>
  declare hasShowings: HasManyHasAssociationsMixin<Showing, number>
  declare countShowings: HasManyCountAssociationsMixin
  declare createShowing: HasManyCreateAssociationMixin<Showing, 'movieId'>
}

Movie.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  apiID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  overview: {
    type: DataTypes.TEXT('long'),
    allowNull: false
  },
  release: {
    type: DataTypes.STRING,
    allowNull: false
  },
  trailer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  backdrop: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  timestamps: false
})

Movie.hasMany(Showing, { foreignKey: 'movieId' })
Showing.belongsTo(Movie, { foreignKey: 'movieId' })

export default Movie