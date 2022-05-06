import { prisma } from "./prisma";
import express from "express";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
import { PrismaClient } from "@prisma/client";
import { PrismaFeedbacksRepositories } from "./repositories/prisma/prisma-feedbacks-repositories";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const prismaFeedbacksRepositories = new PrismaFeedbacksRepositories();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepositories,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
