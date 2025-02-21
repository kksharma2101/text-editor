import express from "express";
import {
  createDoc,
  fetchDoc,
  updateDoc,
} from "../controllers/document.controller.js";

const route = express.Router();

route.post("/docs", createDoc);

route.get("/docs/:id", fetchDoc);

route.put("/docs/:id", updateDoc);

export default route