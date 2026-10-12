import express from 'express';
import { 
  getRecurring, 
  createRecurring, 
  updateRecurring, 
  deleteRecurring 
} from '../controllers/recurringController.js';

const router = express.Router();

router.get('/', getRecurring);
router.post('/', createRecurring);
router.put('/:id', updateRecurring);
router.delete('/:id', deleteRecurring);

export default router;
