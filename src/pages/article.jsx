import React, { useEffect, useState } from "react";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // جلب الكتب من Google Books API
  useEffect(() => {
    const urls = [
      "https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=self+improvement&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=history&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=children+books&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=free+ebooks&filter=free-ebooks&maxResults=20"
    ];

    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(results => {
        const allBooks = results.flatMap(result => result.items || []);

        // استبعاد كتاب Ebony
        const cleanBooks = allBooks.filter(
          (book) => book.volumeInfo.title?.toLowerCase() !== "ebony"
        );

        setBooks(cleanBooks);
      })
      .catch(error => console.error("Error fetching books:", error));
  }, []);

  // فلترة الكتب بناءً على البحث (العنوان + المؤلفين)
  const filteredBooks = search.trim()
  ? books.filter((book) => {
      const title = book.volumeInfo.title?.toLowerCase() || "";
      const authors = (book.volumeInfo.authors || []).join(" ").toLowerCase();

      // استبعاد الكتاب اللي اسمه "Ebony"
      if (title.includes("ebony")) {
        return false;
      }

      return (
        title.includes(search.toLowerCase()) ||
        authors.includes(search.toLowerCase())
      );
    })
  : books.filter((book) => !book.volumeInfo.title?.toLowerCase().includes("ebony"));

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Books Library</h1>

      {/* مربع البحث */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search by book title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-1/2 shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* عرض الكتب */}
      <div className="space-y-12">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div
              key={book.id}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* صورة الكتاب */}
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/150"
                }
                alt={book.volumeInfo.title}
                className="w-40 h-60 object-cover rounded-lg shadow-lg"
              />

              {/* تفاصيل الكتاب */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {book.volumeInfo.title}
                </h2>
                <p className="text-gray-600 italic mb-2">
                  {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {book.volumeInfo.description
                    ? book.volumeInfo.description.substring(0, 200) + "..."
                    : "No description available."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">
            {search ? "No books found for this search." : "Start typing to search for a book..."}
          </p>
        )}
      </div>
    </div>
  );
}
