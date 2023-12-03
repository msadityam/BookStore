import express from "express";
import { Book } from "../models/bookModel.js";

const bookRouter = express.Router();
bookRouter.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    response.status(201).send(book);
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

bookRouter.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (e) {
    console.log(e.message);
    response.status(500).send(e.message);
  }
});

bookRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (e) {
    console.log(e.message);
    response.status(500).send(e.message);
  }
});

bookRouter.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    response.status(200).send({ message: "Book updated successfully" });
  } catch (e) {
    console.log(e.message);
    response.status(500).send({ message: e.message });
  }
});

bookRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(204);
  } catch (e) {
    response.status(500).send({ message: e.message });
  }
});

export default bookRouter;
