import express from 'express';
import { 
  getSplits, 
  createSplit, 
  updateSplit, 
  deleteSplit 
} from '../controllers/splitsController.js';

const router = express.Router();

router.get('/', getSplits);
router.post('/', createSplit);
router.put('/:id', updateSplit);
router.delete('/:id', deleteSplit);

export default router;
