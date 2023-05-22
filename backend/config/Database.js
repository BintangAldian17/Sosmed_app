import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.PASSWORD_DB, {
    host: process.env.HOST,
    dialect: "mysql",
    port: process.env.PORT
})

export default db