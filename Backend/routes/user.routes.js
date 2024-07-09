import express from 'express'

import protecRoute from '../middelware/protectRoute.js';

import {getAllUsers} from '../controllers/user.controler.js'

const router=express.Router();

router.get('/',protecRoute,getAllUsers)

export default router;