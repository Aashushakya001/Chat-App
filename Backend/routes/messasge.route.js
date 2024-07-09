import express from 'express'
import {getMessage, sendMessage} from '../controllers/sendmessage.controller.js'
import protecRoute from '../middelware/protectRoute.js'
const router=express.Router()


router.get('/:id',protecRoute,getMessage)


router.post('/send/:id',protecRoute,sendMessage)

export default router