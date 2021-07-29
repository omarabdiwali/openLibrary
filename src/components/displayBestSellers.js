import React from 'react';
import { SimpleGrid, Spinner } from '@chakra-ui/react';
import Books from './displayBooks';

export default function BestSellers() {
  const apiKey = process.env.REACT_APP_NYT_API_KEY;
  const [books, setBooks] = React.useState('');

  React.useEffect(() => {
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
        <SimpleGrid columns={window.innerWidth > 800 ? 4 : window.innerWidth > 500 ? 2 : 1}>
          {books.map((book, i) => {
            return <Books book={book} type={'nyt'} key={i} />;
          })}
        </SimpleGrid>
      )}
    </div>
  )
}
