import express from 'express';
import { getInvestmentReport } from '../controllers/aiController.js';

const router = express.Router();
router.post('/analyse',getInvestmentReport);
export default router;
