import express from "express";
import { getAllItems, getItemById } from "../controllers/items.js";

const router = express.Router();

router.get("/items", getAllItems);
router.get("/items/:id", getItemById);

export default router;
