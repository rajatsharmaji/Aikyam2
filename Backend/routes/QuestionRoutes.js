import express from "express";
import QuestionModel from "../models/QuestionModel.js";

const router = express.Router();

// Add a question
router.post("/", async (req, res) => {
  try {
    await QuestionModel.create({
      questionName: req.body.questionName,
      questionUrl: req.body.questionUrl,
      user: req.body.user,
    })
      .then(() => {
        res.status(201).send({
          status: true,
          message: "Question added successfully",
        });
      })
      .catch((err) => {
        res.status(400).send({
          status: "false",
          message: "Question could not be added",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error adding question",
    });
  }
});

// Get a question with its answers
router.get("/", async (req, res) => {
  try {
    await QuestionModel.aggregate([
      {
        $lookup: {
          from: "answers",
          localField: "_id",
          foreignField: "questionId",
          as: "allAnswers",
        },
      },
    ])
      .exec()
      .then((doc) => {
        res.status(200).send(doc);
      })
      .catch((error) => {
        res.status(500).send({
          status: false,
          message: "Unable to get the question details",
        });
      });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Error getting question details",
    });
  }
});

export default router;
