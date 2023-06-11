import express from "express";
import questionRoutes from "./QuestionRoutes.js";
import answerRoutes from "./AnswerRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to Aikyam");
});

router.use("/questions", questionRoutes);
router.use("/answers", answerRoutes);

export default router;
