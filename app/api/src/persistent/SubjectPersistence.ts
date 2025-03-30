import { SubjectType } from "@repo/app-commons/types/types";
import mongoose from "mongoose";

const subject = new mongoose.Schema(
  {
    type: { type: String, required: true },
    code: { type: String, required: true },
    department: { type: String, required: true },
    category: { type: String, required: true },
  },
  { _id: false },
);

const Subject = mongoose.model<SubjectType>("Subject", subject, "subjects");
export default Subject;