import User from "../../users/users.model.js"
import Repair from "../../repairs/repairs.model.js"

export const initModel = () => {
    User.hasMany(Repair),
    Repair.belongsTo(User)
}