import express from 'express'
import {getMe, userLogin, userSignup} from '../controller/user.controller.js'
import {authMiddleware, ensureAuthenticated } from '../middleware/auth.middleware.js'
const router = express.Router();


router.post('/register', userSignup)
router.post('/login', userLogin)
router.get('/me', authMiddleware, getMe )


export default router