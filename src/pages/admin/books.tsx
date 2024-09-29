import { Book } from '@/entities/Book';
import { useState, useEffect } from 'react';

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const addBook = async () => {
    const res = await fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, year, stock }),
    });
    const newBook = await res.json();
    setBooks([...books, newBook]);
  };

  return (
    <div>
      <h1>Manage Books</h1>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(parseInt(e.target.value))} />
      <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(parseInt(e.target.value))} />
      <button onClick={addBook}>Add Book</button>

      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} - {book.author}</li>
        ))}
      </ul>
    </div>
  );
}
