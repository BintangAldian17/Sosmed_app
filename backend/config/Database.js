import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config({ path: "./.env" })

const db = new Sequelize("posts_db", "root", process.env.PASSWORD_DB, {
    host: "localhost",
    dialect: "mysql"
})

export default db