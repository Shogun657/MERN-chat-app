import express from "express"
import isLoggedIn from "../middleware/isLoggedIn.js"
import {getUsers} from "../controllers/user.controllers.js"

const router = express.Router()

router.get('/',isLoggedIn, getUsers)

export default router