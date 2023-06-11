import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  answer: String,
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
});

const AnswerModel = mongoose.model("Answers", AnswerSchema);

export default AnswerModel;
