import express from "express";
import { ensureAuthenticated } from "../middleware/auth.middleware.js";
import {createCategoryRoute, getCategoryRoute, deleteCategoryRoute} from '../controller/category.controller.js'

const router = express.Router();

router.get('/categories', ensureAuthenticated, getCategoryRoute);
router.get('/categories/:id', ensureAuthenticated, ); //pending
router.post('/categories', ensureAuthenticated, createCategoryRoute);
router.delete('/categories/:id', ensureAuthenticated, deleteCategoryRoute)

export default router;