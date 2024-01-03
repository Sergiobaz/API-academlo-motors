import { DataTypes, ENUM } from "sequelize";
import sequelize from "../config/database/database.js";


const Repair = sequelize.define('repairs', {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "name"
        
    },
    motorsNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("pending","completed","cancelled"),
        defaultValue: 'pending',
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER
    }

})

export default Repair