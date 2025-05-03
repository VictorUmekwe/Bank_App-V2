import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getAllTransactions,
  getUserTransactions,
  makeTransfer,
} from "../controllers/transactionsController.js.js";

const router = express.Router();
router.use(protect);
router.post("/transfer", makeTransfer);
router.get("/", adminOnly, getAllTransactions);
router.get("/:id", getUserTransactions);

export { router as transactionsRoute };

