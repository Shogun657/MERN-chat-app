import express from"express"

import { sendMessage, getMessages } from "../controllers/message.controllers.js";
import isLoggedIn from "../middleware/isLoggedIn.js";


const router = express.Router()

router.get("/:id", isLoggedIn,getMessages)
router.post("/send/:id", isLoggedIn,sendMessage)


export default router;