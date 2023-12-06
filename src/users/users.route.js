import express from "express"
import { findAllUsers, findOneUser, createUser, updateUser, deleteUser } from "./users.controller.js"



export const router = express.Router()

router.route("/")
.get(findAllUsers)
.post(createUser)

router.route("/:id")
.get(findOneUser)
.patch(updateUser)
.delete(deleteUser)

