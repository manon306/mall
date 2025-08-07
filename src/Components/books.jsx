import React, { useEffect, useState } from "react";
import Card from "./card.jsx";
import Skeleton from "@mui/material/Skeleton";
import CardContent from "@mui/material/CardContent";
import { Card as MUICard } from "@mui/material";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urls = [
      "https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=self+improvement&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=history&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=children+books&maxResults=20",
      "https://www.googleapis.com/books/v1/volumes?q=free+ebooks&filter=free-ebooks&maxResults=20"
    ];

    setLoading(true);
    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(results => {
        const allBooks = results.flatMap(result => result.items || []);
        setBooks(allBooks);
      })
      .catch(error => console.error("Error fetching books:", error))
      .finally(() => setLoading(false));
  }, []);

  const getBooksByCategory = () => {
    switch (category) {
      case "programming":
        return books.filter(book => book.volumeInfo.categories?.includes("Programming"));
      case "self-improvement":
        return books.filter(book => book.volumeInfo.categories?.includes("Self-Improvement"));
      case "history":
        return books.filter(book => book.volumeInfo.categories?.includes("History"));
      case "free":
        return books.filter(book => book.saleInfo.saleability === "FREE");
      case "child":
        return books.filter(book => book.volumeInfo.categories?.includes("Juvenile Fiction"));
      case "All":
        return books;
      default:
        return [];
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Books Library</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <MUICard key={`skeleton-${index}`} style={{ width: 300 }}>
                <Skeleton variant="rectangular" width={300} height={180} />
                <CardContent>
                  <Skeleton width="80%" />
                  <Skeleton width="60%" />
                </CardContent>
              </MUICard>
            ))
          : getBooksByCategory().map((book, index) => {
              const title = book.volumeInfo.title || "No title";
              const image =
                book.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/150";
              const description = book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Unknown author";

              const price = Math.random() * 20 + 5;
              const oldprice = Math.random() * 30 + 10;

              return (
                <Card
                  key={`${book.id}-${index}`}
                  title={title}
                  image={image}
                  description={description}
                  price={price}
                  oldprice={oldprice}
                />
              );
            })}
      </div>
    </div>
  );
}
