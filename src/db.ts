import {Sequelize} from 'sequelize';

// FIX: may read from configuration
const db = process.env.DB_INITDB;
const dbUser = process.env.DB_USERNAME;
const dbPass = process.env.DB_PASSWORD;
const dbPort = process.env.DB_PORT;
const dbHost = process.env.DB_HOST;

const connectionString = `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${db}`;

const sequelize = new Sequelize(connectionString);

export default sequelize;
