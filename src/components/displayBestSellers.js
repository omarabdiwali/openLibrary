import React, { useState, useEffect } from 'react';
import { SimpleGrid, Spinner } from '@chakra-ui/react';
import Books from './displayBooks';

export default function BestSellers() {
  const apiKey = process.env.REACT_APP_NYT_API_KEY;
  const [books, setBooks] = useState();
  const [size, setSize] = useState(window.innerWidth > 800 ? 4 : window.innerWidth > 500 ? 2 : 1);

  window.addEventListener('resize', () => {
    window.innerWidth > 800 ? setSize(4) : window.innerWidth > 500 ? setSize(2) : setSize(1);
  })

  useEffect(() => {
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}`;
    fetch(url).then(resp => resp.json()).then(data => setBooks(data.results.books)).catch(err => console.error(err));
  }, [apiKey])

  return (
    <div>
      {!books ? (
        <center>
          <Spinner />
        </center>
      ) : (
        <SimpleGrid columns={size}>
          {books.map((book, i) => {
            return <Books book={book} type={'nyt'} key={i} />;
          })}
        </SimpleGrid>
      )}
    </div>
  )
}