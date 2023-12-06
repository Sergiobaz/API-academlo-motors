import { Sequelize } from "sequelize";
import { envs } from "../enviorments/enviorments.js";

const sequelize = new Sequelize(envs.DB_URI, {
    logging: false
})

export async function authenticated() {
    try {
        await sequelize.authenticate();
        console.log("Connection success 😎");
    } catch (error) {
        throw new Error("Error al autenticar: ", error)
    }
}

export async function synchonize() {
    try {
        await sequelize.sync();
        console.log("Synchonize success 👌");
    } catch (error) {
        throw new Error ( "Error al sincronizar: ", error)
    }
}

export default sequelize