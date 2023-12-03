import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRouter from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: "content-type",
  })
);
app.use("/books", bookRouter);

app.get("/", (request, response) => {
  console.log("Request is: " + request);
  return response.status(234).send("yesss");
});

mongoose
  .connect(
    "mongodb+srv://root:root@book-store-mern.ks3vcev.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log("App is listening to : " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
