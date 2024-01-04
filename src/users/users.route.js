import express from "express"
import { findAllUsers, findOneUser, createUser, updateUser, deleteUser,login } from "./users.controller.js"
import { protect, protectAccountOwner, validExistUser } from "./users.middleware.js"



export const router = express.Router()

router.post("/login", login)

router.route("/")
.get(protect ,findAllUsers)
.post(createUser)

router.use(protect)

router.route("/:id")
.get(findOneUser)
.patch(validExistUser,protectAccountOwner,updateUser)
.delete(validExistUser,protectAccountOwner,deleteUser)

