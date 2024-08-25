import 'dotenv/config';
import path from 'path';
import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';

// Definir __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Leer el archivo .env desde la ruta especificada
const envPath = path.join(__dirname, '..', '.env');

// Asegurarse de que las variables de entorno están cargadas correctamente
if (process.env.NODE_ENV !== 'production') {
  import('dotenv').then((dotenv) => dotenv.config({ path: envPath }));
}

// Configurar Sequelize con los parámetros desde las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME || 'cinema',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
      min: 10,
      max: 50,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      decimalNumbers: true,
      maxPreparedStatements: 100,
    },
  }
);

// Manejar la conexión y las posibles excepciones
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });

export default sequelize;
