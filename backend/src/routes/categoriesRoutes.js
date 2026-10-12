import express from 'express';
import { getCategories, updateCategory } from '../controllers/categoriesController.js';

const router = express.Router();

router.get('/', getCategories);
router.put('/:id', updateCategory);

export default router;
