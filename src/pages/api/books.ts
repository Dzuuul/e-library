import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "../../../ormconfig";
import { Book } from "../../entities/Book";

AppDataSource.initialize();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bookRepository = AppDataSource.getRepository(Book);

  if (req.method === "GET") {
    const books = await bookRepository.find();
    res.status(200).json(books);
  }

  if (req.method === "POST") {
    const { title, author, year, stock } = req.body;
    const newBook = bookRepository.create({ title, author, year, stock });
    await bookRepository.save(newBook);
    res.status(201).json(newBook);
  }
}
