import { NextApiRequest, NextApiResponse } from "next";
import { AppDataSource } from "../../../ormconfig";
import { Loan } from "../../entities/Loan";
import { User } from "../../entities/User";
import { Book } from "../../entities/Book";

AppDataSource.initialize();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const loanRepository = AppDataSource.getRepository(Loan);

  if (req.method === "GET") {
    const loans = await loanRepository.find({ relations: ["user", "book"] });
    res.status(200).json(loans);
  }

  if (req.method === "POST") {
    const { userId, bookId, loanDate, returnDate } = req.body;
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: userId },
    });
    const book = await AppDataSource.getRepository(Book).findOne({
      where: { id: bookId },
    });

    if (!user || !book) {
      return res.status(400).json({ message: "User or Book not found" });
    }

    const newLoan = loanRepository.create({ user, book, loanDate, returnDate });
    await loanRepository.save(newLoan);
    res.status(201).json(newLoan);
  }
}
